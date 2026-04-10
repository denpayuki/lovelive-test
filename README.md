# ShinyColors Personality Quiz

**[中文文档](./README_CN.md)**

A web-based personality quiz that matches you with one of the 28 idols from **THE iDOLM@STER: Shiny Colors** based on an 8-dimension personality model.

## What Is This?

This is a fun personality test inspired by the characters of ShinyColors (シャイニーカラーズ). You answer 35 questions about your personality, and the app calculates which idol you are most similar to using an 8-dimension matching algorithm.

### The 8 Personality Dimensions

| Dimension | What It Measures |
|-----------|-----------------|
| Extraversion | Social energy — do you recharge around people or alone? |
| Emotional Stability | Stress resilience — do you stay calm under pressure? |
| Assertiveness | Leadership drive — do you speak up and take charge? |
| Warmth | Caring tendency — do you prioritize others' needs? |
| Openness | Curiosity — do you enjoy exploring new ideas? |
| Discipline | Self-control — do you set goals and stick to them? |
| Authenticity | True-to-self — do you show the same face everywhere? |
| Optimism | Outlook — do you tend to see the bright side? |

### All 8 Units (28 Characters)

- **illumination STARS** — Mano, Hiori, Meguru
- **L'Antica** — Kogane, Sakuya, Mamimi, Yuika, Kiriko
- **ALSTROEMERIA** — Amana, Tenka, Chiyuki
- **Houkago Climax Girls** — Kaho, Chiyoko, Juri, Rinze, Natsuha
- **Straylight** — Asahi, Fuyuko, Mei
- **noctchill** — Toru, Madoka, Koito, Hinana
- **SHHis** — Nichika, Mikoto
- **CoMETIK** — Ruka, Hana, Haruki

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) version 18 or higher
- [npm](https://www.npmjs.com/) (comes bundled with Node.js)

> **How to check:** Open a terminal (Command Prompt on Windows, Terminal on Mac/Linux) and type:
> ```bash
> node -v
> npm -v
> ```
> If you see version numbers, you're good to go. If not, download Node.js from the link above.

### Installation

1. **Download the project**

   Click the green "Code" button on GitHub, then "Download ZIP" and unzip it. Or if you have Git installed:
   ```bash
   git clone https://github.com/YOUR_USERNAME/shiny-mbti.git
   ```

2. **Open a terminal in the project folder**

   Navigate to the folder you just downloaded:
   ```bash
   cd shiny-mbti
   ```

3. **Install dependencies**

   This downloads all the libraries the project needs:
   ```bash
   npm install
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open in your browser**

   After running the command above, you'll see a URL in the terminal (usually `http://localhost:5173`). Open it in your browser and start the quiz!

### Adding Character Images

The quiz works without images, but it looks much better with them. Place character portrait images in:

```
public/images/characters/
```

See `public/images/characters/IMAGE_NAMING.md` for the exact file naming format. Images should be PNG format, ideally 512×512 or larger.

> **Important:** Character images from THE iDOLM@STER: Shiny Colors are copyrighted by Bandai Namco Entertainment. They are **NOT** included in this repository. See the [Copyright Notice](#copyright-notice) section below.

### Building for Production

To create an optimized build for deployment:

```bash
npm run build
```

The output will be in the `dist/` folder. You can preview it locally with:

```bash
npm run preview
```

## Project Structure

```
shiny-mbti/
├── src/
│   ├── components/      # React UI components
│   │   ├── QuizPage.tsx        # Main quiz flow (landing → questions → results)
│   │   ├── QuestionCard.tsx    # Single question display
│   │   ├── LikertScale.tsx     # 7-point agree/disagree selector
│   │   ├── ProgressBar.tsx     # Quiz progress indicator
│   │   ├── ResultPage.tsx      # Results with radar chart
│   │   ├── CharacterCard.tsx   # Character info card
│   │   └── CharacterListPage.tsx  # Browse all 28 characters
│   ├── data/            # Static data
│   │   ├── characters.ts       # 28 character profiles & dimension scores
│   │   ├── questions.ts        # 35 quiz questions
│   │   └── dimensions.ts       # 8 dimension definitions
│   ├── utils/
│   │   └── matching.ts         # Scoring & Euclidean distance matching
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── App.tsx          # Router setup
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles & Tailwind import
├── public/              # Static assets
│   └── images/characters/  # Character portrait images (not included)
├── index.html           # HTML entry point
├── vite.config.ts       # Vite configuration
├── package.json         # Dependencies & scripts
└── tsconfig.json        # TypeScript configuration
```

## Tech Stack

- **React 19** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool & dev server
- **Tailwind CSS v4** — Utility-first styling
- **Recharts** — Radar chart visualization
- **React Router v7** — Client-side routing

## Copyright Notice

### Code

The source code of this project is licensed under the [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) license. See the [LICENSE](./LICENSE) file for details.

### Character IP

**THE iDOLM@STER: Shiny Colors** and all related characters, names, and artwork are the property of **Bandai Namco Entertainment Inc.**

Character images/illustrations are **NOT** included in this repository and must be sourced separately. If you use character images, you must comply with Bandai Namco's guidelines and terms of use.

This is a fan-made project and is not affiliated with, endorsed by, or sponsored by Bandai Namco Entertainment Inc.

## License

This work is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0)**.

This means you are free to:
- **Share** — copy and redistribute the material
- **Adapt** — remix, transform, and build upon the material

Under the following terms:
- **Attribution** — You must give appropriate credit and link back to this project
- **NonCommercial** — You may not use the material for commercial purposes
- **ShareAlike** — If you remix or build upon this project, you must distribute your contributions under the same license

See [LICENSE](./LICENSE) for the full license text.
