# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ShinyColors (闪耀色彩) personality quiz — a React SPA that matches users to one of 28 idolmaster ShinyColors characters via an 8-dimension personality model (35 Likert-scale questions). Chinese-language UI with Japanese character names.

## Commands

- `npm run dev` — start Vite dev server with HMR
- `npm run build` — type-check (tsc -b) then Vite production build
- `npm run lint` — ESLint across the project
- `npm run preview` — preview production build locally

## Tech Stack

- React 19 + TypeScript 6 + Vite 8
- Tailwind CSS v4 (via `@tailwindcss/vite` plugin, imported as `@import "tailwindcss"` in index.css)
- react-router-dom v7 (BrowserRouter)
- recharts (radar chart on result page)

## Architecture

**Routing** (`App.tsx`): Two routes only — `/` (QuizPage) and `/characters` (CharacterListPage).

**Data layer** (`src/data/`):
- `characters.ts` — 28 character profiles, each with 8-dimension scores (1-10 scale), unit affiliation, and unit color
- `questions.ts` — 35 questions, each mapped to a dimension key with a `reversed` flag
- `dimensions.ts` — metadata for the 8 personality dimensions (extraversion, emotionalStability, assertiveness, warmth, openness, discipline, authenticity, optimism)

**Matching logic** (`src/utils/matching.ts`):
- User answers (1-7 Likert) → per-dimension averages → linear mapping to 1-10 scale
- Euclidean distance between user vector and each character vector → sorted results with similarity percentage

**Component flow**:
- `QuizPage` manages quiz state (current index, answers map, results) — renders landing screen → question flow → `ResultPage`
- `ResultPage` shows top-3 matches with a recharts RadarChart comparing user vs best match
- `CharacterListPage` groups all 28 characters by unit with expandable dimension bars
- `LikertScale` renders 7 graduated circle buttons (7=agree → 1=disagree) with color coding (rose for agree, sky for disagree)

**Types** (`src/types/index.ts`): `DimensionScores`, `CharacterProfile`, `Question`, `DimensionMeta`, `MatchResult`.

**Character images**: Expected at `/images/characters/{imageFile}` — fallback shows first kanji of name when image is missing.

## Design Style

All UI design must follow the design system documented in `DESIGN.md`. Key points:
- Warm parchment palette (background `#f5f4ed`, card surface `#faf9f5`) — no cool blue-grays
- Terracotta brand accent (`#c96442`) for primary CTAs only
- Serif font (Georgia fallback) for headlines at weight 500, sans-serif for UI text
- Ring-based shadows (`0px 0px 0px 1px`) instead of drop shadows
- Generous border-radius (8-32px) and relaxed body line-height (1.60)
- Light/dark section alternation for page rhythm

Refer to `DESIGN.md` for the complete color palette, typography scale, component specs, and responsive breakpoints.
