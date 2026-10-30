# 学术黄页 · GitHub 版

学术期刊、智库、新闻媒体、政府、国际组织、AI 与能源项目导航，以及全球与各地区形势周报。网页公开浏览，无需 ChatGPT 或 GitHub 登录；星标保存在当前浏览器。

## 托管和更新

GitHub Pages 发布 `site/` 生成的静态网页。GitHub Actions 每天北京时间 **00:17、06:17、12:17、18:17** 检查来源并重新发布。定时任务可能延迟；公开仓库连续 60 天没有活动时，GitHub 可能停用定时工作流。

- 网页“刷新周报”读取最近已发布的数据，不启动抓取。
- “管理更新”进入仓库 Actions。拥有写入权限的管理员可点 **Run workflow** 提前触发，完成后回网页刷新。
- `site/data/weekly.json` 保存公开标题、原文链接、发布日期、订阅摘要和来源检查结果；最近八周历史与新条目合并，来源失败不清空已有内容。
- 按既有重要性、地区分类和同一事件合并规则筛选，保留“入选依据”、来源状态与 Markdown 导出。只使用公开元数据，不调用收费模型 API。
- `data/crawl-schedule.json` 保存长访问间隔，工作流串行执行，遵守 robots.txt；不会绕过证书校验、登录、付费墙或访问限制。
- 本仓库只含公开导航和周报；个人文献、模型密钥、本机路径、采集记录与本机文件接口不在发布范围。

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
