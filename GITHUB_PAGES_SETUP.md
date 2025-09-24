# GitHub Pages 部署指南

## 问题解决

如果您遇到 `actions/configure-pages@v4` 错误，请按照以下步骤操作：

### 1. 启用 GitHub Pages

1. 前往您的 GitHub 仓库
2. 点击 **Settings** 标签
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**
5. 保存设置

### 2. 设置仓库权限

1. 在 **Settings** 页面
2. 点击左侧菜单的 **Actions** > **General**
3. 在 **Workflow permissions** 部分选择 **Read and write permissions**
4. 勾选 **Allow GitHub Actions to create and approve pull requests**
5. 保存设置

### 3. 推送代码

将包含 GitHub Actions 工作流的代码推送到 main 分支：

```bash
git add .
git commit -m "Add GitHub Pages deployment workflow"
git push origin main
```

### 4. 检查部署状态

1. 前往仓库的 **Actions** 标签
2. 查看 "Deploy to GitHub Pages" 工作流是否成功运行
3. 如果成功，您的网站将在 `https://[username].github.io/[repository-name]` 可用

## 自定义域名（可选）

如果您有自定义域名：

1. 编辑 `public/CNAME` 文件
2. 取消注释并替换为您的域名
3. 在您的域名提供商处设置 CNAME 记录指向 `[username].github.io`

## 故障排除

- 确保仓库是公开的（除非您有 GitHub Pro）
- 检查 Actions 权限设置
- 确保 main 分支存在且包含工作流文件
- 查看 Actions 日志获取详细错误信息
