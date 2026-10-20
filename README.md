# tinyzqh.github.io

Source for [tinyzqh.github.io](https://tinyzqh.github.io) — Zhiqiang He's personal academic site.

## Stack

- **Astro 5** — static site generator
- **Tailwind CSS** — utility-first styling
- **MDX** — long-form content with components
- **OGL / WebGL** — hero gradient mesh
- **TypeScript** — type-checked content collections

## Develop

```bash
conda activate web        # Node 20 environment
npm install
npm run dev               # http://127.0.0.1:4321
```

## Build

```bash
npm run build             # output → dist/
npm run preview           # preview the production build
```

## Content

Add a new publication: drop a markdown file in `src/content/publications/`.
Schema is enforced — see `src/content/config.ts`.

Write a blog post: add `src/content/blog/<slug>.md` — it is served at `/blog/<slug>/`.

```yaml
---
title: Post title
description: One-sentence summary (list page, RSS, social cards)
date: 2026-10-20
tags: [rl]
draft: true        # visible under `npm run dev` only; remove to publish
---
```

Math uses KaTeX (`$inline$`, `$$display$$`); code blocks are highlighted by Shiki.
The feed is at `/rss.xml`.

## Deploy

Push to `master`. GitHub Actions builds and deploys to the `gh-pages` branch,
which serves `tinyzqh.github.io`.
