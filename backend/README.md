# 云端 AI 采集

GitHub Pages 托管公开黄页，独立 Node.js 后端执行采集与模型调用。后端不依赖 Railway 的 SDK，可部署在 Render、Railway 或能运行 Docker 的服务器上。

管理员在黄页中登录后，可以选来源、填主题、查看进度、停止任务、读取历史和导出 Markdown。每次任务在服务器后台运行，关闭网页不取消任务。服务器重启会中断未完成任务，保留已写入的结果，并标记为中断；不会自动重新调用模型。当前使用单个进程和持久磁盘，不能启动多个副本共享同一目录。

## 数据与权限

- 公开仓库与 Pages 只包含程序、导航目录和公开周报，不包含采集正文、任务历史、管理密码或模型密钥。
- 所有采集接口（包括设置、来源列表、历史、导出）都要求管理员会话。会话两小时到期，退出或服务器重启后需重新登录。
- 模型密钥和可选 GitHub Token 使用 AES-256-GCM 加密后保存。加密密钥由服务器环境变量提供；更换或丢失它会导致已有密钥无法解密。
- 采集正文和历史以私有文件保存，不额外加密。限制云服务项目与磁盘备份的访问权限；导出的 Markdown 也包含采集内容。
- 默认只允许 `https://auuv.github.io` 跨站连接。其他人即使知道后端地址，也需要管理密码；CORS 不替代管理员认证。
- 不默认迁移原本机的模型密钥和历史。上线后在黄页的模型设置中重新填写。
- 保留 robots.txt、证书校验、访问间隔、内网地址拦截和公开仓库检查。部署上线不会使所有来源都可读取，也不会绕过登录或付费墙。

## 环境变量

| 名称 | 用途 |
| --- | --- |
| `COLLECTION_ADMIN_PASSWORD` | 必填，16–256 字符的独立管理密码。在云平台的私密变量中设置。 |
| `STORAGE_ENCRYPTION_KEY` | 必填，32 个随机字节的 Base64 编码；创建一次后稳定保留，随私密备份保存。 |
| `ALLOWED_ORIGINS` | 默认 `https://auuv.github.io`；多来源用逗号分隔，不含末尾斜杠或路径。 |
| `COLLECTION_DATA_DIR` | 默认 `/data/collection`，必须位于持久磁盘中。 |
| `PORT` | 默认 `8080`，支持托管平台注入的端口。 |

可在可信终端执行 `openssl rand -base64 32` 创建加密密钥，将结果直接填入平台私密变量。不要把它提交到 Git、粘贴到公开日志或放在前端配置中。模型 API Key 在管理员登录后的设置页填写，不能用管理密码代替。

## Render

根目录 `render.yaml` 为带 1 GB 持久磁盘的单实例 Docker Web Service。该模板使用付费计算实例与磁盘，**创建前在 Render 确认当前估价**，模型调用另计。免费 Web Service 会休眠且不能挂载持久磁盘，不适合这个保存设置和历史的版本。参见 [免费限制](https://render.com/docs/free)、[持久磁盘](https://render.com/docs/disks)和[价格](https://render.com/pricing)。

1. 登录 Render 并关联 GitHub 仓库 `auuv/academic-navigation`，使用 Blueprint 导入 `render.yaml`。代码合并前测试时，改为相应功能分支，不能部署还没有这些文件的旧 `main`。
2. 设置模板要求的两个私密变量，检查 `/data` 磁盘、区域、实例价格，再创建。不要把真实变量写回 YAML。
3. 取得 Render 分配的 HTTPS 地址，访问 `/healthz`，应返回 `ok: true` 和 `authRequired: true`；未登录访问 `/api/collection/jobs` 应为 401。
4. 按下文接入 Pages，然后在网页中登录、设置模型，并做一次小规模采集验证。

默认关闭自动部署，防止更新或发布周报时重启正在运行的采集任务。升级后端前先等任务完成，再在 Render 手动部署。模板也限定后端相关文件路径，避免将来启用自动部署后，每次周报数据提交都触发后端更新。

## 已有服务器 / Docker

安装 Docker Compose 后，在仓库目录创建仅自己可读的 `.env.collection`（已被 Git 忽略）：

```dotenv
COLLECTION_ADMIN_PASSWORD=替换为独立的长密码
STORAGE_ENCRYPTION_KEY=替换为生成的Base64密钥
ALLOWED_ORIGINS=https://auuv.github.io
```

然后启动：

```sh
chmod 600 .env.collection
docker compose --env-file .env.collection up -d --build
```

`compose.yaml` 使用命名卷保存 `/data`，只将 API 暴露到服务器的 `127.0.0.1:8080`。在同机通过 Caddy 或 Nginx 配置带有效证书的 HTTPS 域名，反向代理到这个端口，再按下文接入 Pages。允许服务器向公开来源和模型 API 发起 HTTPS 请求。只有本机端口尚不能让 GitHub Pages 连接。

更新前等运行中的任务结束，再拉取代码并重新执行启动命令。普通重建不会清空命名卷；不要使用 `docker compose down -v`，它会删除持久卷。备份时同时保存私有卷和加密密钥，并在其他位置实际验证恢复。

没有 Docker 也可以使用 Node.js 24：设置同样的环境变量，执行 `npm ci --omit=dev --ignore-scripts` 与 `npm run start:collection`，使用服务管理器守护，并配置持久目录与 HTTPS 反向代理。

## 接入 GitHub Pages

后端通过验证后，在仓库 **Settings → Secrets and variables → Actions → Variables** 新增 `COLLECTION_API_BASE_URL`，值只填写后端 HTTPS 来源，例如 `https://collection.example.org`，不含 `/api`、密钥或查询参数。此地址会公开，是普通配置，不是密钥。

运行“更新周报并发布网站”工作流以重新构建 Pages。公开黄页中的“AI 采集”会连接该地址。没有配置地址时只显示尚未配置，不会向未知服务发送密码。模型密钥和管理密码不能放进这个仓库变量。

上线验收：公开导航与周报正常；未登录看不到历史或导出；登录后可保存模型设置、抓取、查看进度、停止任务和导出；完成任务后重启服务，再登录仍能读取历史。

## 本地验证

`npm test` 覆盖管理员鉴权、来源隔离、密钥加密与恢复、抓取、取消、历史与导出、登录限流，以及网页登录和退出时的数据清理。测试使用临时目录与模拟来源，不读取原本机配置，不调用收费模型。

浏览器预览可在 `npm run build` 后通过 `COLLECTION_PREVIEW_API` 注入测试后端地址；生产构建只接受 HTTPS 来源。`ALLOW_INSECURE_DEVELOPMENT=1` 仅用于本机测试时允许 HTTP 网页来源，不能在公网部署中启用。
