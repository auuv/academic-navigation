import { randomBytes, createHash, timingSafeEqual, createCipheriv, createDecipheriv } from "node:crypto";

const digest = (value) => createHash("sha256").update(value).digest();
export function createSecretBox(encodedKey) {
  const key = Buffer.from(encodedKey || "", "base64");
  if (key.length !== 32) throw new Error("STORAGE_ENCRYPTION_KEY 必须是 32 字节的 Base64 密钥");
  return {
    seal(value) {
      if (!value) return "";
      const iv = randomBytes(12), cipher = createCipheriv("aes-256-gcm", key, iv);
      const ciphertext = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
      return ["enc", "v1", iv.toString("base64"), cipher.getAuthTag().toString("base64"), ciphertext.toString("base64")].join(":");
    },
    open(value) {
      if (!value) return "";
      const [prefix, version, nonce, tag, body, extra] = value.split(":");
      if (prefix !== "enc" || version !== "v1" || extra !== undefined) throw new Error("加密配置格式无效");
      const decipher = createDecipheriv("aes-256-gcm", key, Buffer.from(nonce, "base64"));
      decipher.setAuthTag(Buffer.from(tag, "base64"));
      return Buffer.concat([decipher.update(Buffer.from(body, "base64")), decipher.final()]).toString("utf8");
    }
  };
}

export function createAdminAuth({ password, now = () => Date.now(), ttl = 2 * 3600000 }) {
  if (typeof password !== "string" || password.length < 16 || password.length > 256) throw new Error("COLLECTION_ADMIN_PASSWORD 应为 16 至 256 字符");
  const expected = digest(password), sessions = new Map(), attempts = new Map();
  function cleanup() {
    for (const [key, value] of sessions) if (value <= now()) sessions.delete(key);
    for (const [key, value] of attempts) if (value.until <= now()) attempts.delete(key);
  }
  function authorize(header) {
    cleanup();
    const match = /^Bearer ([A-Za-z0-9_-]{43})$/.exec(header || "");
    return Boolean(match && (sessions.get(digest(match[1]).toString("hex")) || 0) > now());
  }
  return {
    authorize,
    login(input, address = "unknown") {
      cleanup();
      if (attempts.size > 1000) throw Object.assign(new Error("登录请求较多，请稍后重试"), { status: 429 });
      let record = attempts.get(address);
      if (!record) { record = { failures: 0, until: now() + 60000 }; attempts.set(address, record); }
      if (record.failures >= 8) throw Object.assign(new Error("登录尝试过多，请一分钟后再试"), { status: 429 });
      if (typeof input !== "string" || input.length > 256 || !timingSafeEqual(digest(input), expected)) {
        record.failures++; throw Object.assign(new Error("管理密码不正确"), { status: 401 });
      }
      if (sessions.size >= 100) throw Object.assign(new Error("会话数量已达上限，请稍后重试"), { status: 429 });
      attempts.delete(address);
      const token = randomBytes(32).toString("base64url"), expiresAt = now() + ttl;
      sessions.set(digest(token).toString("hex"), expiresAt);
      return { token, expiresAt: new Date(expiresAt).toISOString() };
    },
    logout(header) {
      const token = String(header || "").replace(/^Bearer /, "");
      sessions.delete(digest(token).toString("hex"));
    }
  };
}
