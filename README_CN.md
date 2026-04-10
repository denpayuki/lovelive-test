# 闪耀色彩性格测试

**[English README](./README.md)**

一个基于 8 维人格模型的网页版性格测试，测试完成后会匹配出与你最相似的**偶像大师：闪耀色彩**角色。

## 这是什么？

这是一个以闪耀色彩（シャイニーカラーズ）角色为基础的趣味性格测试。你需要回答 35 道关于性格的题目，然后程序会通过 8 维人格匹配算法，计算出你与哪位偶像最相似。

### 8 个人格维度

| 维度 | 衡量什么 |
|------|---------|
| 外向性 | 你的社交能量方向——和人在一起充电，还是独处充电？ |
| 情绪稳定性 | 你的抗压能力——面对压力能保持冷静吗？ |
| 自我主张 | 你的领导意愿——会主动表达观点、承担领导角色吗？ |
| 温暖包容 | 你的关怀倾向——是否倾向于优先考虑他人的需求？ |
| 开放性 | 你的好奇心——喜欢探索新想法和新事物吗？ |
| 勤勉性 | 你的自律程度——能否设定目标并坚持完成？ |
| 真实性 | 你的表里一致度——在不同场合是否表现出相同的自己？ |
| 乐观性 | 你的人生态度——倾向于看到事物积极的一面吗？ |

### 全部 8 个组合（28 位角色）

- **illumination STARS** — 真乃、灯织、巡
- **L'Antica** — 恋钟、咲耶、摩美美、结华、雾子
- **ALSTROEMERIA** — 甘奈、甜花、千雪
- **放课后Climax Girls** — 果穗、智代子、树里、凛世、夏叶
- **Straylight** — 朝日、冬优子、爱依
- **noctchill** — 透、圆香、小糸、雏菜
- **SHHis** — 日花、美琴
- **CoMETIK** — 琉花、羽那、春希

## 快速开始

### 准备工作

你的电脑上需要安装以下软件：

- [Node.js](https://nodejs.org/)（版本 18 或更高）
- [npm](https://www.npmjs.com/)（安装 Node.js 时会自动一起安装）

> **怎么确认已经装好了？** 打开终端（Windows 上叫"命令提示符"或"PowerShell"，Mac 上叫"终端"），输入下面两行命令：
> ```bash
> node -v
> npm -v
> ```
> 如果能看到版本号（比如 `v18.17.0`），说明已经安装好了。如果提示"不是内部命令"之类的错误，需要先去上面的链接下载安装 Node.js。

### 安装步骤

1. **下载项目**

   在 GitHub 页面点击绿色的 "Code" 按钮，选择 "Download ZIP"，下载后解压。如果你装了 Git，也可以用命令行：
   ```bash
   git clone https://github.com/YOUR_USERNAME/shiny-mbti.git
   ```

2. **打开终端，进入项目文件夹**

   ```bash
   cd shiny-mbti
   ```

3. **安装依赖**

   这一步会下载项目需要的所有第三方库，第一次运行需要等待一会儿：
   ```bash
   npm install
   ```

4. **启动开发服务器**

   ```bash
   npm run dev
   ```

5. **在浏览器中打开**

   运行上面的命令后，终端会显示一个网址（通常是 `http://localhost:5173`）。在浏览器里打开这个网址就可以开始测试了！

### 添加角色立绘

测试在没有图片的情况下也能正常运行，但有立绘会好看很多。把角色立绘图片放到以下目录：

```
public/images/characters/
```

具体的文件命名规则请查看 `public/images/characters/IMAGE_NAMING.md`。图片要求 PNG 格式，建议尺寸 512×512 或更大。

> **重要提示：** 闪耀色彩的角色立绘版权归万代南梦宫娱乐所有，本仓库**不包含**任何角色图片。详见下方[版权声明](#版权声明)。

### 构建生产版本

如果你想把项目部署到服务器上，运行以下命令生成优化后的版本：

```bash
npm run build
```

构建产物会输出到 `dist/` 目录。可以用以下命令在本地预览：

```bash
npm run preview
```

## 项目结构

```
shiny-mbti/
├── src/
│   ├── components/      # React UI 组件
│   │   ├── QuizPage.tsx        # 测试主流程（首页 → 答题 → 结果）
│   │   ├── QuestionCard.tsx    # 单道题目展示
│   │   ├── LikertScale.tsx     # 7 级同意/不同意选择器
│   │   ├── ProgressBar.tsx     # 答题进度条
│   │   ├── ResultPage.tsx      # 结果页（含雷达图）
│   │   ├── CharacterCard.tsx   # 角色信息卡片
│   │   └── CharacterListPage.tsx  # 浏览全部 28 位角色
│   ├── data/            # 静态数据
│   │   ├── characters.ts       # 28 位角色资料和维度分数
│   │   ├── questions.ts        # 35 道测试题目
│   │   └── dimensions.ts       # 8 个维度定义
│   ├── utils/
│   │   └── matching.ts         # 评分和欧氏距离匹配算法
│   ├── types/
│   │   └── index.ts            # TypeScript 类型定义
│   ├── App.tsx          # 路由配置
│   ├── main.tsx         # 入口文件
│   └── index.css        # 全局样式和 Tailwind 导入
├── public/              # 静态资源
│   └── images/characters/  # 角色立绘图片（不含在仓库中）
├── index.html           # HTML 入口
├── vite.config.ts       # Vite 配置
├── package.json         # 依赖和脚本
└── tsconfig.json        # TypeScript 配置
```

## 技术栈

- **React 19** — UI 框架
- **TypeScript** — 类型安全
- **Vite** — 构建工具和开发服务器
- **Tailwind CSS v4** — 原子化 CSS 框架
- **Recharts** — 雷达图可视化
- **React Router v7** — 客户端路由

## 版权声明

### 代码部分

本项目源代码基于 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans) 协议开源。详见 [LICENSE](./LICENSE) 文件。

### 角色版权

**偶像大师：闪耀色彩**（THE iDOLM@STER: Shiny Colors）及其所有相关角色、名称、美术素材均为**万代南梦宫娱乐株式会社**（Bandai Namco Entertainment Inc.）的财产。

本仓库**不包含**任何角色图片/立绘，如需使用角色图片请自行获取，并遵守万代南梦宫的使用条款。

本项目为粉丝作品，与万代南梦宫娱乐无任何关联、认可或赞助关系。

## 许可证

本作品采用**知识共享 署名-非商业性使用-相同方式共享 4.0 国际许可协议（CC BY-NC-SA 4.0）**。

这意味着你可以自由地：
- **分享** — 复制、发行本作品
- **改编** — 修改、转换、基于本作品进行再创作

但必须遵守以下条件：
- **署名** — 你必须注明出处并链接到本项目
- **非商业性使用** — 不得将本作品用于商业目的
- **相同方式共享** — 如果你基于本作品进行了再创作，必须以相同的许可协议发布

完整许可证文本请查看 [LICENSE](./LICENSE)。
