import http from "node:http";
import https from "node:https";
import dns from "node:dns/promises";
import { BlockList, isIP } from "node:net";
import { gunzipSync, inflateSync, brotliDecompressSync } from "node:zlib";

const blocked4 = new BlockList();
const blocked6 = new BlockList();
for (const [ip, prefix] of [["0.0.0.0", 8], ["10.0.0.0", 8], ["100.64.0.0", 10], ["127.0.0.0", 8], ["169.254.0.0", 16], ["172.16.0.0", 12], ["192.168.0.0", 16], ["192.0.0.0", 24], ["192.0.2.0", 24], ["198.18.0.0", 15], ["198.51.100.0", 24], ["203.0.113.0", 24], ["224.0.0.0", 3]]) blocked4.addSubnet(ip, prefix, "ipv4");
for (const [ip, prefix] of [["::", 96], ["::ffff:0:0", 96], ["64:ff9b::", 96], ["100::", 64], ["2001::", 32], ["2001:db8::", 32], ["2002::", 16], ["fc00::", 7], ["fe80::", 10], ["ff00::", 8]]) blocked6.addSubnet(ip, prefix, "ipv6");
blocked6.addAddress("::1", "ipv6");

export function publicAddress(address) {
  const family = isIP(address);
  return family === 4 ? !blocked4.check(address, "ipv4") : family === 6 && /^[23][0-9a-f]{3}:/i.test(address) && !blocked6.check(address, "ipv6");
}

export function publicUrl(input, base) {
  let url;
  try { url = new URL(input, base); } catch { throw new Error("网址无效"); }
  if (!["http:", "https:"].includes(url.protocol) || url.username || url.password || (url.port && !["80", "443"].includes(url.port))) throw new Error("仅支持公共 HTTP / HTTPS 网站");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (!host.includes(".") && !isIP(host) || /(^|\.)(localhost|local|internal|test|invalid)$/.test(host) || isIP(host) && !publicAddress(host)) throw new Error("不允许访问本机或内网地址");
  url.hash = "";
  return url;
}

export function validResolvedAddresses(url, addresses, virtualDnsHosts = []) {
  if (!addresses.length) return false;
  if (addresses.every(({ address }) => publicAddress(address))) return true;
  // Some TUN proxies synthesize RFC 2544 addresses. Only server-approved HTTPS
  // publisher/API hostnames may use that transport; certificate validation stays on.
  const virtual = ({ address, family }) => family === 4 && /^198\.(18|19)\./.test(address);
  return url.protocol === "https:" && virtualDnsHosts.includes(url.hostname) && addresses.every(virtual);
}

export async function requestPublic(input, { method = "GET", headers = {}, body, signal, maxBytes = 3 * 1024 * 1024, timeout = 12000, redirects = 4, beforeRequest, virtualDnsHosts = [] } = {}) {
  const deadline = AbortSignal.timeout(timeout);
  const combined = signal ? AbortSignal.any([signal, deadline]) : deadline;
  let url = publicUrl(input);
  for (let hop = 0; hop <= redirects; hop++) {
    combined.throwIfAborted();
    if (beforeRequest) await beforeRequest(url.href);
    combined.throwIfAborted();
    const host = url.hostname.replace(/^\[|\]$/g, "");
    const addresses = isIP(host) ? [{ address: host, family: isIP(host) }] : await Promise.race([
      dns.lookup(host, { all: true }),
      new Promise((_, reject) => combined.addEventListener("abort", () => reject(combined.reason), { once: true }))
    ]);
    if (!validResolvedAddresses(url, addresses, virtualDnsHosts)) throw Object.assign(new Error(`网站解析到了非公共地址（${url.hostname}），已拒绝连接`), { code: "NON_PUBLIC_DNS" });
    const result = await new Promise((resolve, reject) => {
      const client = url.protocol === "https:" ? https : http;
      const req = client.request(url, {
        method, signal: combined, agent: false,
        headers: { "User-Agent": "AcademicNavigatorBot/1.0 (personal research; manual collection)", "Accept-Encoding": "gzip, deflate, br", ...headers },
        // Pin the validated DNS answer so a second lookup cannot switch to a private address.
        lookup(_hostname, options, callback) {
          if (options.all) callback(null, addresses);
          else callback(null, addresses[0].address, addresses[0].family);
        }
      }, (res) => {
        const chunks = [];
        let length = 0;
        res.on("error", reject);
        res.on("data", (chunk) => {
          length += chunk.length;
          if (length > maxBytes) { res.destroy(new Error("响应文件过大")); return; }
          chunks.push(chunk);
        });
        res.on("end", () => {
          try {
            let buffer = Buffer.concat(chunks);
            const options = { maxOutputLength: maxBytes };
            if (res.headers["content-encoding"] === "gzip") buffer = gunzipSync(buffer, options);
            if (res.headers["content-encoding"] === "deflate") buffer = inflateSync(buffer, options);
            if (res.headers["content-encoding"] === "br") buffer = brotliDecompressSync(buffer, options);
            if (buffer.length > maxBytes) throw new Error("响应文件过大");
            const charset = /charset=["']?([^;\s"']+)/i.exec(res.headers["content-type"] || "")?.[1] || "utf-8";
            let text;
            try { text = new TextDecoder(charset).decode(buffer); } catch { text = buffer.toString("utf8"); }
            resolve({ status: res.statusCode, headers: res.headers, text, url: url.href });
          } catch (error) { reject(error); }
        });
      });
      req.on("error", reject);
      if (body) req.write(body);
      req.end();
    });
    if (![301, 302, 303, 307, 308].includes(result.status) || !result.headers.location) return result;
    if (hop === redirects) throw new Error("网站重定向过多");
    const next = publicUrl(result.headers.location, url);
    if (headers.Authorization || headers.authorization || method !== "GET") throw new Error("API 接口重定向已拒绝，请填写最终 API 地址");
    if (url.protocol === "https:" && next.protocol !== "https:") throw new Error("网站重定向到了不安全连接");
    url = next;
  }
}
