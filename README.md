<div align="center">

# ✦ Love Live! Personality Quiz ✦

### *Which Love Live! character are you most like?*

[![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-CC_BY--NC--SA_4.0-ef9421?logo=creativecommons&logoColor=white)](./LICENSE)

<br/>

A web-based personality quiz matching your answers with one of Love Live! characters
using an eight-dimension personality model.

</div>

---

## About

Answer **40 personality questions** to see which Love Live! character best matches your personality. The quiz scores answers across eight dimensions and uses Euclidean distance to rank the character matches.

The dimensions are **Energy, Warmth, Drive, Discipline, Creativity, Confidence, Optimism,** and **Independence**. Results are for entertainment, not a psychological assessment.

## Features

- 40 questions with a seven-point agree/disagree scale
- Eight-dimension personality profile and ranked character matches
- Radar-chart comparison with your best match
- Gallery of Love Live! characters
- Shareable result image export
- English interface and dark/light themes
- Responsive layout for mobile and desktop

## Getting Started

### Requirements

- Node.js 18 or later
- npm

### Install and run

```bash
git clone https://github.com/denpayuki/lovelive-test.git
cd lovelive-test
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

### Build

```bash
npm run build
npm run preview
```

## Deployment

This is a Vite single-page app and can be hosted on static platforms.

## Project Structure

```text
src/
├── components/       React pages, quiz controls, character cards, and export UI
├── contexts/         Theme context
├── data/             Character profiles, questions, and dimension definitions
├── i18n/             English interface and character descriptions
├── types/            Shared TypeScript types
└── utils/            Matching algorithm and image export helpers
public/sprite/        Local character image assets
```

## Credits and Rights

This project is adapted from [ShinyColors Personality Quiz](https://github.com/Sallyn0225/shiny-mbti). The source project's code is provided under the [CC BY-NC-SA 4.0 license](./LICENSE); this attribution does not imply endorsement.

Love Live!, Nijigasaki High School Idol Club, their characters, and related artwork belong to their respective rights holders. The code license does not grant rights to those franchise materials or character images. This is an unofficial fan project and is not affiliated with or endorsed by the official rights holders.
