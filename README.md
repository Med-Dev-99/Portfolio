# mohamedelkorchi.com

Personal portfolio of **Mohamed El Korchi, Data Engineer**: selected work, case studies and resume.

**Live:** https://mohamedelkorchi.com

![Portfolio preview](public/og.png)

## Stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | [Astro 7](https://astro.build) (static output) | Plain HTML at build time; zero framework JavaScript sent to the browser |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) | CSS-first theme tokens, light/dark via CSS variables, only used classes ship |
| Fonts | Geist + Geist Mono (self-hosted, variable) | No third-party requests; latin subsets preloaded |
| Motion | SVG pipeline simulation (≈4 KB), CSS scroll-driven animations, View Transitions, Popover API | Native browser features instead of JS libraries; pauses off-screen, honours reduced motion |
| Navigation | Speculation Rules (HTTP header) | Internal pages prerender on hover for instant loads |
| Serving | `nginx-unprivileged` in Docker, behind an Nginx TLS proxy and Cloudflare | Read-only container, pre-compressed assets, strict CSP (allows only Cloudflare Web Analytics) |

Scripts, all small and framework-free:

- `public/theme.js` (≈1 KB): applies the saved theme before first paint.
- `PipelineSim.astro` (≈4 KB): the hero's live pipeline: records flow from sources through ingest → validate → store → transform → serve; failed records go to quarantine. Without JavaScript or with reduced motion it renders as a static diagram.
- `StackLineage.astro` (≈2 KB): hover or tap a tool to trace where it was used.
- `Header.astro` (<1 KB): section links show pipeline-run states (pending → running → done) as you scroll.

## Develop

Requires Node.js 22.23+ (see `.nvmrc`).

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # type-check + static build into dist/
npm run preview
```

## Edit the content

Everything shown on the site lives in **[`src/data/profile.ts`](src/data/profile.ts)**: hero text, headline numbers, projects, experience, skills, education and credentials. Change it and rebuild.

The case studies are in [`src/pages/work/`](src/pages/work/).

## Resume and social images

```bash
npm run resume
```

This renders, with headless Chrome:

- `public/resume/Mohamed-El-Korchi-Resume.pdf` from `src/data/profile.ts` + [`src/data/resume.ts`](src/data/resume.ts)
- `public/og*.png` (link previews) and `public/apple-touch-icon.png`

`resume.ts` holds resume-only details such as the phone number; the website never imports it. Set `CHROME_PATH` if Chrome isn't found.

## Images

Screenshots in `public/images/` are pre-optimised WebP files in two widths, named `name-<width>.webp`, and rendered by [`Shot.astro`](src/components/Shot.astro) with `srcset`. To add one:

```bash
magick input.png -resize '1440x>' -strip -quality 82 public/images/<project>/<name>-1440.webp
magick input.png -resize '800x>'  -strip -quality 82 public/images/<project>/<name>-800.webp
```

## Deploy

```bash
npm run deploy                 # build, upload, switch release atomically (no restarts)
npm run deploy -- --setup      # first install / config change
npm run deploy -- --https      # certificate + HTTPS (once DNS points at the server)
```

See [deploy/README.md](deploy/README.md) for how the site sits next to other services on the VPS, rollback and optional CI/CD.

## License

Code is MIT. Written content, screenshots and the resume are © Mohamed El Korchi.
