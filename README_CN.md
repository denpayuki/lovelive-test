<div align="center">

# ✦ 闪耀色彩性格测试 ✦

### *你是哪位闪耀色彩的偶像？*

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-ef9421?logo=creativecommons&logoColor=white)](./LICENSE)

**[English README](./README.md)**

<br/>

一个基于 8 维人格模型的网页版性格测试<br/>测试完成后会匹配出与你最相似的**偶像大师：闪耀色彩**角色

</div>

---

## ✦ 这是什么？

一个以闪耀色彩（シャイニーカラーズ）角色为基础的趣味性格测试。回答 **35 道**关于性格的题目，程序会通过 **8 维人格匹配算法**（欧氏距离评分），计算出你与哪位偶像最相似。

### 8 个人格维度

| 维度 | 衡量什么 |
|:--|:--|
| **外向性** | 你的社交能量方向 — 和人在一起充电，还是独处充电？ |
| **情绪稳定性** | 你的抗压能力 — 面对压力能保持冷静吗？ |
| **自我主张** | 你的领导意愿 — 会主动表达观点、承担领导角色吗？ |
| **温暖包容** | 你的关怀倾向 — 是否倾向于优先考虑他人的需求？ |
| **开放性** | 你的好奇心 — 喜欢探索新想法和新事物吗？ |
| **勤勉性** | 你的自律程度 — 能否设定目标并坚持完成？ |
| **真实性** | 你的表里一致度 — 在不同场合是否表现出相同的自己？ |
| **乐观性** | 你的人生态度 — 倾向于看到事物积极的一面吗？ |

### 全部 8 个组合 — 28 位角色

> | 组合 | 成员 |
> |:--|:--|
> | **illumination STARS** | 真乃 · 灯织 · 巡 |
> | **L'Antica** | 恋钟 · 咲耶 · 摩美美 · 结华 · 雾子 |
> | **ALSTROEMERIA** | 甘奈 · 甜花 · 千雪 |
> | **放课后Climax Girls** | 果穗 · 智代子 · 树里 · 凛世 · 夏叶 |
> | **Straylight** | 朝日 · 冬优子 · 爱依 |
> | **noctchill** | 透 · 圆香 · 小糸 · 雏菜 |
> | **SHHis** | 日花 · 美琴 |
> | **CoMETIK** | 琉花 · 羽那 · 春希 |

---

## ✦ 功能亮点

- **35 道 Likert 量表题目** — 直观的 7 级同意/不同意选择器
- **8 维人格画像** — 超越简单类型分类的多维分析
- **欧氏距离匹配** — 对比 28 位角色的手工评分数据
- **Top 3 匹配结果** — 百分比相似度评分
- **雷达图对比** — 直观展示你与最佳匹配角色的维度差异
- **角色图鉴** — 按组合浏览全部 28 位角色，可展开查看维度条
- **结果图片导出** — 一键生成精美的 PNG 结果卡片，方便保存和分享
- **三语支持** — 中文、英文、日文界面，自动检测浏览器语言
- **深色 / 浅色模式** — 自动持久化，跨会话保持
- **完全响应式** — 手机、平板、桌面端均可使用

---

## ✦ 快速开始

### 准备工作

- [Node.js](https://nodejs.org/) 18 或更高版本
- [npm](https://www.npmjs.com/)（安装 Node.js 时自动附带）

> **怎么确认已安装？** 在终端运行 `node -v && npm -v`，能看到版本号就说明已经装好了。

### 安装步骤

```bash
# 1. 克隆仓库
git clone https://github.com/Sallyn0225/shiny-mbti.git

# 2. 进入项目目录
cd shiny-mbti

# 3. 安装依赖
npm install

# 4. 启动开发服务器
npm run dev
```

在浏览器中打开 `http://localhost:5173` 即可开始测试！

### 构建生产版本

```bash
npm run build     # 产物输出到 dist/
npm run preview   # 本地预览生产版本
```

### 部署上线

本项目可以部署到任何静态托管平台，以下是零基础部署指南：

- [部署到 Cloudflare Pages](./docs/cloudflare-pages-deploy.md)
- [部署到 Vercel](./docs/vercel-deploy.md)

---

## ✦ 项目结构

```
shiny-mbti/
├── src/
│   ├── components/          # React UI 组件
│   │   ├── QuizPage.tsx           首页 → 答题 → 结果主流程
│   │   ├── ResultPage.tsx         匹配结果 + 雷达图
│   │   ├── ExportCard.tsx         可分享的结果卡片（离屏渲染）
│   │   ├── ExportPreviewModal.tsx 导出预览与下载弹窗
│   │   ├── NicknameModal.tsx      导出前的昵称输入
│   │   ├── CharacterCard.tsx      角色信息卡片
│   │   ├── CharacterListPage.tsx  浏览全部 28 位角色
│   │   ├── QuestionCard.tsx       单道题目展示
│   │   ├── LikertScale.tsx        7 级选择器
│   │   ├── ProgressBar.tsx        答题进度条
│   │   ├── ThemeToggle.tsx        深色/浅色模式切换
│   │   ├── LocaleToggle.tsx       语言切换器（中/英/日）
│   │   └── DisclaimerModal.tsx    关于/免责声明弹窗
│   ├── i18n/                # 国际化
│   │   ├── index.tsx             LocaleProvider 与 useLocale hook
│   │   ├── questions.ts          翻译后的题目文本
│   │   └── locales/              zh.ts · en.ts · ja.ts
│   ├── data/                # 静态数据
│   │   ├── characters.ts         28 位角色资料和维度分数
│   │   ├── questions.ts          35 道测试题目
│   │   └── dimensions.ts         8 个维度定义
│   ├── utils/
│   │   ├── matching.ts           评分与欧氏距离匹配
│   │   └── exportImage.ts        DOM 转 PNG 截图工具
│   ├── contexts/ThemeContext.tsx
│   ├── types/index.ts
│   ├── App.tsx              # 路由配置
│   └── index.css            # Tailwind + 全局样式
├── public/                  # 静态资源
├── index.html
└── vite.config.ts
```

---

## ✦ 技术栈

<table>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/-React_19-61dafb?style=flat-square&logo=react&logoColor=white" /></td>
    <td>UI 框架</td>
  </tr>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/-TypeScript_6-3178c6?style=flat-square&logo=typescript&logoColor=white" /></td>
    <td>类型安全</td>
  </tr>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/-Vite_8-646cff?style=flat-square&logo=vite&logoColor=white" /></td>
    <td>构建工具和开发服务器</td>
  </tr>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/-Tailwind_CSS_4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white" /></td>
    <td>原子化 CSS 框架</td>
  </tr>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/-Recharts-ff7300?style=flat-square&logo=data:image/svg+xml;base64,&logoColor=white" /></td>
    <td>雷达图可视化</td>
  </tr>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/-React_Router_7-ca4245?style=flat-square&logo=reactrouter&logoColor=white" /></td>
    <td>客户端路由</td>
  </tr>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/-modern--screenshot-333?style=flat-square" /></td>
    <td>结果图片导出</td>
  </tr>
</table>

---

## ✦ 版权声明

### 代码部分

本项目源代码基于 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans) 协议开源。详见 [LICENSE](./LICENSE)。

### 角色版权

**偶像大师：闪耀色彩**（THE iDOLM@STER: Shiny Colors）及其所有相关角色、名称、美术素材均为**万代南梦宫娱乐株式会社**（Bandai Namco Entertainment Inc.）的财产。

本项目为粉丝作品，与万代南梦宫娱乐无任何关联、认可或赞助关系。

---

<div align="center">

为全世界的制作人，用心制作 ♥

</div>
