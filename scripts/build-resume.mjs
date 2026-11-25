#!/usr/bin/env node
/**
 * Renders the resume PDF and the Open Graph images from src/data/*.ts with headless Chromium.
 *
 *   npm run resume
 *
 * Outputs (committed, served from /public):
 *   public/resume/Mohamed-El-Korchi-Resume.pdf
 *   public/og.png, public/og-firebridge.png, public/og-docker-inspector.png
 *   public/apple-touch-icon.png
 *
 * Needs Chrome/Chromium. Set CHROME_PATH if it isn't found automatically.
 * Node ≥ 22.18 imports the .ts data files directly (type stripping).
 */
import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { chromium } from 'playwright-core';
import { site, experience, education, credentials } from '../src/data/profile.ts';
import { contact, summary, projects, resumeSkills } from '../src/data/resume.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    join(homedir(), '.local/bin/google-chrome'),
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  ];
  const found = candidates.find((p) => p && existsSync(p));
  if (!found) throw new Error('Chrome not found: set CHROME_PATH=/path/to/chrome');
  return found;
}

const font = (pkg, file) =>
  `data:font/woff2;base64,${readFileSync(require.resolve(`${pkg}/files/${file}`)).toString('base64')}`;
const fonts = `
  @font-face { font-family: Geist; font-weight: 100 900; src: url(${font('@fontsource-variable/geist', 'geist-latin-wght-normal.woff2')}) format('woff2'); }
  @font-face { font-family: Mono; font-weight: 100 900; src: url(${font('@fontsource-variable/geist-mono', 'geist-mono-latin-wght-normal.woff2')}) format('woff2'); }
`;
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------------- Resume ---------------- */
const resumeHtml = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(site.name)}: Resume</title>
<style>${fonts}
  @page { size: A4; margin: 13mm 14mm 12mm; }
  * { box-sizing: border-box; }
  body { margin: 0; font: 9.3pt/1.42 Geist, sans-serif; color: #141a26; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  a { color: inherit; text-decoration: none; }
  header { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; padding-bottom: 9px; border-bottom: 2px solid #141a26; }
  h1 { font: 600 24pt/1 Geist, sans-serif; letter-spacing: -.02em; margin: 0; }
  .role { font: 600 10.5pt Geist, sans-serif; color: #2448e0; margin-top: 5px; letter-spacing: .02em; }
  .contact { text-align: right; font-size: 8.4pt; color: #3a4354; line-height: 1.55; }
  h2 { font: 600 8pt Mono, monospace; letter-spacing: .16em; text-transform: uppercase; color: #2448e0; margin: 13px 0 6px; display: flex; align-items: center; gap: 8px; }
  h2::after { content: ''; flex: 1; height: 1px; background: #dcdfe5; }
  p { margin: 0; }
  .summary { color: #2b3344; }
  .item { margin-bottom: 8px; break-inside: avoid; }
  .row { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; }
  .title { font-weight: 650; font-size: 9.8pt; }
  .title .org { color: #2448e0; }
  .date { font: 500 7.8pt Mono, monospace; color: #5b6577; white-space: nowrap; }
  .meta { font-size: 8.3pt; color: #5b6577; }
  .stack { font: 7.6pt/1.45 Mono, monospace; color: #5b6577; margin-top: 1px; }
  ul { margin: 3px 0 0; padding-left: 13px; }
  li { margin: 1.5px 0; color: #2b3344; }
  li::marker { color: #2448e0; }
  .skills { display: grid; grid-template-columns: 128px 1fr; gap: 2.5px 10px; }
  .skills dt { font-weight: 650; }
  .skills dd { margin: 0; color: #2b3344; }
  .two { display: grid; grid-template-columns: 1fr 1fr; gap: 0 22px; }
  .compact .item { margin-bottom: 4px; }
</style></head><body>
<header>
  <div><h1>${esc(site.name)}</h1><div class="role">${esc(site.role)} · Data Platforms · AI</div></div>
  <div class="contact">
    ${esc(site.location)} · ${esc(contact.phone)}<br>
    <a href="mailto:${esc(site.email)}">${esc(site.email)}</a> · <a href="${esc(site.url)}">${esc(contact.website)}</a><br>
    <a href="${esc(site.linkedin)}">${esc(contact.linkedin)}</a> · <a href="${esc(site.github)}">${esc(contact.github)}</a>
  </div>
</header>

<h2>Profile</h2>
<p class="summary">${esc(summary)}</p>

<h2>Experience</h2>
${experience.map((job) => `<div class="item">
  <div class="row"><span class="title">${esc(job.role)} · <span class="org">${esc(job.company)}</span></span><span class="date">${esc(job.period)}</span></div>
  <div class="meta">${esc(job.place)} · ${esc(job.stack.join(', '))}</div>
  <ul>${job.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
</div>`).join('')}

<h2>Projects</h2>
${projects.map((p) => `<div class="item">
  <div class="row"><span class="title">${esc(p.name)}</span>${p.meta ? `<span class="date">${esc(p.meta)}</span>` : ''}</div>
  <div class="stack">${esc(p.stack)}</div>
  <ul>${p.points.map((pt) => `<li>${esc(pt)}</li>`).join('')}</ul>
</div>`).join('')}

<h2>Skills</h2>
<dl class="skills">${resumeSkills.map((s) => `<dt>${esc(s.group)}</dt><dd>${esc(s.items)}</dd>`).join('')}</dl>

<div class="two compact">
  <div>
    <h2>Education</h2>
    ${education.map((e) => `<div class="item"><div class="title">${esc(e.degree)}</div><div class="meta">${esc(e.school)} · ${esc(e.period)}</div></div>`).join('')}
  </div>
  <div>
    <h2>Awards &amp; certifications</h2>
    ${credentials.map((c) => `<div class="item"><div class="title">${esc(c.name)}</div><div class="meta">${esc(c.issuer)}</div></div>`).join('')}
  </div>
</div>
</body></html>`;

/* ---------------- Open Graph images (1200×630) ---------------- */
// The brand mark: a tiny DAG (one source fanning out to two sinks).
const dag = (size) => `<svg width="${size}" height="${size}" viewBox="0 0 32 32"><path d="M10.5 16c4.5 0 4.5-6 9-6M10.5 16c4.5 0 4.5 6 9 6" fill="none" stroke="#aab5ca" stroke-width="1.6" stroke-linecap="round"/><circle cx="9" cy="16" r="3.2" fill="#6d8bff"/><circle cx="22" cy="10" r="3.2" fill="#38d5f2"/><circle cx="22" cy="22" r="3.2" fill="#a98bff"/></svg>`;

const ogTemplate = ({ query, title, subtitle, foot }) => `<!doctype html><html><head><meta charset="utf-8"><style>${fonts}
  * { box-sizing: border-box; margin: 0; }
  body { width: 1200px; height: 630px; overflow: hidden; background: #060912; color: #e8edf7; font-family: Geist, sans-serif; position: relative; }
  .bg { position: absolute; inset: 0; background:
    radial-gradient(55% 70% at 90% 0%, rgba(109,139,255,.30), transparent 70%),
    radial-gradient(40% 55% at 0% 100%, rgba(169,139,255,.16), transparent 70%),
    radial-gradient(rgba(148,163,196,.16) 1.2px, transparent 1.4px) 0 0/26px 26px; }
  .wrap { position: absolute; inset: 0; padding: 70px 80px; display: flex; flex-direction: column; }
  .query { font: 500 22px Mono, monospace; color: #aab5ca; }
  .query b { color: #8ea5ff; font-weight: 500; } .query i { color: #3ddc97; font-style: normal; }
  h1 { font: 600 90px/1 Geist, sans-serif; letter-spacing: -.05em; margin-top: 30px; }
  h1 span { background: linear-gradient(90deg, #6d8bff, #a98bff); -webkit-background-clip: text; color: transparent; }
  p { font-size: 29px; line-height: 1.35; color: #aab5ca; margin-top: 24px; max-width: 940px; }
  .foot { margin-top: auto; display: flex; justify-content: space-between; align-items: center; font: 500 22px Mono, monospace; color: #7d899f; }
  .mark { display: grid; place-items: center; width: 72px; height: 72px; border-radius: 18px; border: 2px solid rgba(148,163,196,.22); background: #0c1220; }
  .flow { display: flex; align-items: center; gap: 10px; }
  .flow span { width: 12px; height: 12px; border-radius: 99px; }
</style></head><body><div class="bg"></div><div class="wrap">
  <div class="query">${query}</div>
  <h1>${title}</h1>
  <p>${subtitle}</p>
  <div class="foot"><span>${foot}</span><span class="mark">${dag(46)}</span></div>
</div></body></html>`;

const ogs = [
  { file: 'og.png', query: '&gt; <b>SELECT</b> * <b>FROM</b> engineers <b>WHERE</b> name = <i>\'Mohamed El Korchi\'</i>;', title: 'Raw data in.<br><span>Reliable answers out.</span>', subtitle: 'Data Engineer building real-time pipelines, lakehouse platforms and grounded AI. NiFi · Spark · Databricks · Airflow · dbt · PostGIS.', foot: 'mohamedelkorchi.com' },
  { file: 'og-firebridge.png', query: '&gt; <b>SELECT</b> * <b>FROM</b> case_studies <b>WHERE</b> project = <i>\'firebridge\'</i>;', title: 'FIREBRIDGE', subtitle: '666.9M NASA satellite fire records, archived, audited and served as one comparable fire history. NASA Space Apps Challenge 2026.', foot: 'mohamedelkorchi.com/work/firebridge' },
  { file: 'og-docker-inspector.png', query: '&gt; <b>SELECT</b> * <b>FROM</b> case_studies <b>WHERE</b> project = <i>\'docker-inspector\'</i>;', title: 'Docker Inspector', subtitle: 'A flight recorder for your containers: crash diagnosis, 7-day history and configuration audits for Docker on Linux.', foot: 'mohamedelkorchi.com/work/docker-inspector' },
];

const iconHtml = `<!doctype html><html><head><style>body{margin:0;width:180px;height:180px;display:grid;place-items:center;background:radial-gradient(circle at 30% 20%,rgba(109,139,255,.35),transparent 60%),#0c1220}</style></head><body>${dag(120)}</body></html>`;

/* ---------------- Render ---------------- */
const browser = await chromium.launch({ executablePath: findChrome() });
try {
  const page = await browser.newPage();

  await page.setContent(resumeHtml, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  mkdirSync(join(root, 'public/resume'), { recursive: true });
  const pdfPath = join(root, 'public/resume/Mohamed-El-Korchi-Resume.pdf');
  await page.pdf({ path: pdfPath, format: 'A4', printBackground: true, preferCSSPageSize: true, tagged: true, outline: true });
  if (process.env.RESUME_HTML) writeFileSync(process.env.RESUME_HTML, resumeHtml);
  console.log('✓', pdfPath);

  await page.setViewportSize({ width: 1200, height: 630 });
  for (const og of ogs) {
    await page.setContent(ogTemplate(og), { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: join(root, 'public', og.file) });
    console.log('✓', `public/${og.file}`);
  }

  await page.setViewportSize({ width: 180, height: 180 });
  await page.setContent(iconHtml, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(root, 'public/apple-touch-icon.png') });
  console.log('✓ public/apple-touch-icon.png');
} finally {
  await browser.close();
}
