# 部署到 Vercel — 零基础指南

本指南会手把手教你把这个网站发布到互联网上，全程免费，不需要任何编程知识。

---

## 你需要准备什么

1. **一个 GitHub 账号** — 如果没有，去 https://github.com 注册一个（免费）
2. **一个 Vercel 账号** — 如果没有，去 https://vercel.com/signup 注册一个（免费，推荐用 GitHub 账号直接登录）
3. **这个项目的代码** — 需要上传到你的 GitHub 仓库里

---

## 第一步：把代码上传到 GitHub

如果你的代码已经在 GitHub 上了，跳到第二步。

1. 登录 GitHub，点击右上角的 **+** 号，选择 **New repository**（新建仓库）
2. 给仓库起个名字，比如 `shiny-mbti`
3. 其他选项保持默认，点击 **Create repository**（创建仓库）
4. 按照页面上显示的指引，把本地代码推送上去

---

## 第二步：在 Vercel 导入项目

1. 登录 Vercel 控制台：https://vercel.com/dashboard
2. 点击 **Add New...** → **Project**
3. 在 **Import Git Repository** 列表中找到你的 `shiny-mbti` 仓库，点击 **Import**

---

## 第三步：配置构建设置

Vercel 会自动检测到这是一个 Vite 项目，通常**不需要修改任何设置**。确认以下默认值即可：

| 设置项 | 值 |
|---|---|
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |

---

## 第四步：点击部署

1. 确认设置无误后，点击 **Deploy**
2. 等待几分钟，Vercel 会自动安装依赖、构建项目、发布网站
3. 构建过程中你会看到实时日志，如果一切顺利，最后会显示 **Congratulations!**

---

## 第五步：访问你的网站

部署成功后，Vercel 会给你一个免费的网址，格式类似：

```
https://你的项目名.vercel.app
```

点击这个链接，就能看到你的网站了！

---

## 后续更新

以后每次你把新代码推送到 GitHub 的 `main` 分支，Vercel 会**自动重新构建和部署**，不需要你手动操作。

---

## 可选：绑定自定义域名

如果你有自己的域名（比如 `example.com`），可以绑定到这个项目上：

1. 在 Vercel 项目页面，点击 **Settings** → **Domains**
2. 输入你的域名，点击 **Add**
3. 按照提示添加 DNS 记录（Vercel 会给出具体的配置说明）
4. 等待 DNS 生效（通常几分钟到几小时）

---

## 常见问题

### 构建失败了怎么办？

- 检查构建日志中的错误信息，最常见的原因是 Node.js 版本不兼容
- 在 Vercel 项目的 **Settings > General > Node.js Version** 中，选择 `20.x`
- 然后重新触发部署

### 网站打开后页面空白？

- 检查构建输出目录是否为 `dist`（不是 `build` 或其他）
- 检查构建命令是否为 `npm run build`

### 点击"角色图鉴"后刷新页面显示 404？

- 这个问题已经处理好了。项目根目录的 `vercel.json` 文件配置了 SPA 路由重写规则，Vercel 会自动将所有路径指向首页
