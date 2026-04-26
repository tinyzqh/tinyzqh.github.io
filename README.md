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

## Deploy

Push to `master`. GitHub Actions builds and deploys to the `gh-pages` branch,
which serves `tinyzqh.github.io`.
