# 学术黄页 · GitHub 版

学术期刊、智库、新闻媒体、政府、国际组织、AI 与能源项目导航，以及全球与各地区形势周报。网页公开浏览，无需 ChatGPT 或 GitHub 登录；星标保存在当前浏览器。

网站：<https://auuv.github.io/academic-navigation/> · [全球与地区周报](https://auuv.github.io/academic-navigation/#weekly) · [管理员更新与运行记录](https://github.com/auuv/academic-navigation/actions/workflows/weekly-pages.yml)

## 托管和更新

GitHub Pages 发布 `site/` 生成的静态网页。GitHub Actions 每天北京时间 **00:17、06:17、12:17、18:17** 检查来源并重新发布。定时任务可能延迟；公开仓库连续 60 天没有活动时，GitHub 可能停用定时工作流。

- 网页“刷新周报”读取最近已发布的数据，不启动抓取。
- “管理更新”进入仓库 Actions。拥有写入权限的管理员可点 **Run workflow** 提前触发，完成后回网页刷新。
- `site/data/weekly.json` 保存公开标题、原文链接、发布日期、订阅摘要和来源检查结果；最近八周历史与新条目合并，来源失败不清空已有内容。
- 按既有重要性、地区分类和同一事件合并规则筛选，保留“入选依据”、来源状态与 Markdown 导出。只使用公开元数据，不调用收费模型 API。
- `data/crawl-schedule.json` 保存长访问间隔，工作流串行执行，遵守 robots.txt；不会绕过证书校验、登录、付费墙或访问限制。
- Pages 只发布公开导航、周报和采集界面；个人文献、模型密钥、本机路径、采集记录与本机文件接口不在发布范围。

## 云端 AI 采集

采集功能通过独立的 Node.js 后端运行，黄页提供管理员登录、选来源与主题、任务进度、停止、历史、导出和模型设置。后端需要持久磁盘，模型密钥加密保存，私有采集记录不会上传 Pages。单独发布 GitHub Pages 不会自动开通采集功能。

提供 Render 部署模板及通用 Docker Compose 配置，也可在已有服务器运行；不依赖某一家云平台。环境变量、持久存储、费用与接入步骤见 [后端部署说明](backend/README.md)。

## 本地采集（无需云服务器）

Mac 上双击仓库中的 `启动本地黄页.command`，会打开本机黄页。也可在此目录执行 `npm run local`，再打开终端显示的地址（默认 `http://127.0.0.1:4174`）。需要 Node.js 24 或以上，首次使用先安装依赖。

本地页面的“AI 采集”直接连接本机服务，无需云端管理密码。模型 API Key 在模型设置里填写，模型调用费用由服务商收取。来源、主题、进度、停止、历史、导出与云端版本共用一套代码；关闭终端或电脑关机后，采集任务会停止。

新采集记录和加密密钥保存在仓库的 `.local-collection/`，已排除 Git、Docker 镜像和 Pages 发布；不要删除此目录。备份时保留整个目录。本次不自动读取或迁移原本机项目的密钥和历史。

线上 GitHub 黄页仍可正常浏览。本地采集请从上述本机地址进入；GitHub Pages 不会自动连接你的电脑。GitHub Actions 是另一种云端批处理方式，需另行配置任务、模型 Secrets 与结果保存，不等同于 Pages 后端。

## 首次部署

将此目录推送到 GitHub 的 `main` 分支。在仓库 **Settings → Pages → Build and deployment → Source** 选择 **GitHub Actions**，再到 **Actions → 更新周报并发布网站 → Run workflow**。查看任务成功后的 Pages 地址。代码和任务公开；修改权限仍由 GitHub 仓库权限控制。

## 开发

需要 Node.js 24 或以上：

```sh
npm ci --ignore-scripts
npm test
npm run collect
npm run build
npm run preview
```

预览路径包含项目子目录，检查部署到 `用户名.github.io/仓库名/` 后的资源路径。构建扫描发布文件，阻止本机地址、旧服务接口和常见凭据格式进入网页。自动任务使用仓库内置 `GITHUB_TOKEN`，无需配置个人 Token。

仅 `dist/` 上传 Pages；临时 SQLite 库与依赖不会发布。采集故障会先保存、发布保留内容，再将整体来源故障报告为任务失败。正常更新记录可在 Actions 查看。
