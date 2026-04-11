<div align="center">

# ✦ ShinyColors Personality Quiz ✦

### *Which ShinyColors idol are you?*

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-ef9421?logo=creativecommons&logoColor=white)](./LICENSE)

**[中文文档](./README_CN.md)**

<br/>

A web-based personality quiz that matches you with one of the 28 idols from<br/>**THE iDOLM@STER: Shiny Colors** based on an 8-dimension personality model.

</div>

---

## ✦ What Is This?

A fun personality test inspired by the characters of ShinyColors (シャイニーカラーズ). Answer **35 questions** about your personality, and the app calculates which idol you're most similar to using an **8-dimension matching algorithm** with Euclidean distance scoring.

### The 8 Personality Dimensions

| Dimension | What It Measures |
|:--|:--|
| **Extraversion** | Social energy — do you recharge around people or alone? |
| **Emotional Stability** | Stress resilience — do you stay calm under pressure? |
| **Assertiveness** | Leadership drive — do you speak up and take charge? |
| **Warmth** | Caring tendency — do you prioritize others' needs? |
| **Openness** | Curiosity — do you enjoy exploring new ideas? |
| **Discipline** | Self-control — do you set goals and stick to them? |
| **Authenticity** | True-to-self — do you show the same face everywhere? |
| **Optimism** | Outlook — do you tend to see the bright side? |

### All 8 Units — 28 Characters

> | Unit | Members |
> |:--|:--|
> | **illumination STARS** | Mano · Hiori · Meguru |
> | **L'Antica** | Kogane · Sakuya · Mamimi · Yuika · Kiriko |
> | **ALSTROEMERIA** | Amana · Tenka · Chiyuki |
> | **Houkago Climax Girls** | Kaho · Chiyoko · Juri · Rinze · Natsuha |
> | **Straylight** | Asahi · Fuyuko · Mei |
> | **noctchill** | Toru · Madoka · Koito · Hinana |
> | **SHHis** | Nichika · Mikoto |
> | **CoMETIK** | Ruka · Hana · Haruki |

---

## ✦ Features

- **35 Likert-scale questions** with an intuitive 7-point agree/disagree selector
- **8-dimension personality profiling** — goes beyond simple type categories
- **Euclidean distance matching** against 28 hand-scored character profiles
- **Top 3 results** with percentage-based similarity scores
- **Radar chart comparison** — visualize your profile vs. your best match
- **Character encyclopedia** — browse all 28 characters by unit with expandable dimension bars
- **Result image export** — save and share your result as a shareable PNG card
- **Trilingual UI** — Chinese, English, and Japanese with auto-detection
- **Dark / Light mode** — automatic persistence across sessions
- **Fully responsive** — works on mobile, tablet, and desktop

---

## ✦ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) version 18+
- [npm](https://www.npmjs.com/) (bundled with Node.js)

> **How to check:** Run `node -v && npm -v` in your terminal. If you see version numbers, you're all set.

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Sallyn0225/shiny-mbti.git

# 2. Navigate into the project
cd shiny-mbti

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open `http://localhost:5173` in your browser and start the quiz!

### Building for Production

```bash
npm run build     # Output → dist/
npm run preview   # Preview the production build locally
```

---

## ✦ Project Structure

```
shiny-mbti/
├── src/
│   ├── components/          # React UI components
│   │   ├── QuizPage.tsx           Landing → questions → results flow
│   │   ├── ResultPage.tsx         Top matches + radar chart
│   │   ├── ExportCard.tsx         Shareable result card (off-screen)
│   │   ├── ExportPreviewModal.tsx Export preview & download modal
│   │   ├── NicknameModal.tsx      Nickname input before export
│   │   ├── CharacterCard.tsx      Character info card
│   │   ├── CharacterListPage.tsx  Browse all 28 characters
│   │   ├── QuestionCard.tsx       Single question display
│   │   ├── LikertScale.tsx        7-point selector
│   │   ├── ProgressBar.tsx        Quiz progress indicator
│   │   ├── ThemeToggle.tsx        Dark/light mode switch
│   │   ├── LocaleToggle.tsx       Language switcher (zh/en/ja)
│   │   └── DisclaimerModal.tsx    About / disclaimer dialog
│   ├── i18n/                # Internationalization
│   │   ├── index.tsx             LocaleProvider & useLocale hook
│   │   ├── questions.ts          Translated question text
│   │   └── locales/              zh.ts · en.ts · ja.ts
│   ├── data/                # Static data
│   │   ├── characters.ts         28 character profiles & scores
│   │   ├── questions.ts          35 quiz questions
│   │   └── dimensions.ts         8 dimension definitions
│   ├── utils/
│   │   ├── matching.ts           Scoring & Euclidean distance
│   │   └── exportImage.ts        DOM-to-PNG capture utilities
│   ├── contexts/ThemeContext.tsx
│   ├── types/index.ts
│   ├── App.tsx              # Router setup
│   └── index.css            # Tailwind + global styles
├── public/                  # Static assets
├── index.html
└── vite.config.ts
```

---

## ✦ Tech Stack

<table>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/-React_19-61dafb?style=flat-square&logo=react&logoColor=white" /></td>
    <td>UI framework</td>
  </tr>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/-TypeScript_6-3178c6?style=flat-square&logo=typescript&logoColor=white" /></td>
    <td>Type safety</td>
  </tr>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/-Vite_8-646cff?style=flat-square&logo=vite&logoColor=white" /></td>
    <td>Build tool & dev server</td>
  </tr>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/-Tailwind_CSS_4-06b6d4?style=flat-square&logo=tailwindcss&logoColor=white" /></td>
    <td>Utility-first styling</td>
  </tr>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/-Recharts-ff7300?style=flat-square&logo=data:image/svg+xml;base64,&logoColor=white" /></td>
    <td>Radar chart visualization</td>
  </tr>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/-React_Router_7-ca4245?style=flat-square&logo=reactrouter&logoColor=white" /></td>
    <td>Client-side routing</td>
  </tr>
  <tr>
    <td align="center"><img src="https://img.shields.io/badge/-modern--screenshot-333?style=flat-square" /></td>
    <td>Result image export</td>
  </tr>
</table>

---

## ✦ Copyright Notice

### Code

The source code of this project is licensed under the [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) license. See [LICENSE](./LICENSE) for details.

### Character IP

**THE iDOLM@STER: Shiny Colors** and all related characters, names, and artwork are the property of **Bandai Namco Entertainment Inc.**

This is a fan-made project and is not affiliated with, endorsed by, or sponsored by Bandai Namco Entertainment Inc.

---

<div align="center">

Made with ♥ for Producers everywhere

</div>
