/**
 * One-time legal PDF generator.
 *
 * Renders the typed legal content (Terms, Privacy, Cookie policy) into a
 * print-ready A4 template and exports static PDFs into
 * `public/documents/legal/`. The six PDFs are committed to the repository and
 * served from `public`, so no PDF generation happens at runtime.
 *
 * Run with:
 *   pnpm --filter web generate:legal-pdfs
 *
 * Requires a Playwright Chromium browser. If the browser is not installed,
 * install it once with:
 *   pnpm --filter web exec playwright install chromium
 *
 * The approved ValtQ brand mark (`public/favicon-light.png`) is embedded as a
 * base64 data URI so generation never depends on external asset URLs.
 */
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';
import { chromium } from 'playwright';
import type { BrowserContext } from 'playwright';
import { termsDocument } from '../src/content/legal/terms';
import { privacyDocument } from '../src/content/legal/privacy';
import { cookiesDocument } from '../src/content/legal/cookies';
import type {
  BrowserStorageItem,
  LegalBlock,
  LegalDocument,
  LegalNoticeTone,
} from '../src/content/legal/types';
import type { Locale } from '../src/i18n/config';
import { formatIsoDate } from '../src/lib/format-date';
import enDict from '../src/i18n/dictionaries/en.json';
import arDict from '../src/i18n/dictionaries/ar.json';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(scriptDir, '..');
const outDir = path.join(webRoot, 'public', 'documents', 'legal');
const logoPath = path.join(webRoot, 'public', 'favicon-light.png');

const LOCALES: Locale[] = ['en', 'ar'];

const documents: ReadonlyArray<{ slug: string; file: string; doc: LegalDocument }> = [
  { slug: 'terms', file: 'valtq-terms-of-service', doc: termsDocument },
  { slug: 'privacy', file: 'valtq-privacy-policy', doc: privacyDocument },
  { slug: 'cookies', file: 'valtq-cookie-policy', doc: cookiesDocument },
];

const dictionaries: Record<Locale, typeof enDict> = { en: enDict, ar: arDict };

/** Chrome strings for the PDF template, authored per locale (not legal content). */
const templateLabels: Record<Locale, { legalDocument: string; pageOf: string }> = {
  en: { legalDocument: 'Legal Document', pageOf: 'Page %p of %t' },
  ar: { legalDocument: 'مستند قانوني', pageOf: 'صفحة %p من %t' },
};

function fail(message: string): never {
  console.error(`\n[generate-legal-pdfs] Error: ${message}\n`);
  process.exit(1);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function readLogoDataUri(): string {
  if (!fs.existsSync(logoPath)) {
    fail(`Approved brand mark not found at ${logoPath}.`);
  }
  const mime = 'image/png';
  const data = fs.readFileSync(logoPath).toString('base64');
  return `data:${mime};base64,${data}`;
}

function baseFontFamily(locale: Locale): string {
  return locale === 'ar'
    ? "'Noto Sans Arabic', 'Lato', 'Liberation Sans', sans-serif"
    : "'Lato', 'Liberation Sans', 'DejaVu Sans', sans-serif";
}

function monoFontFamily(): string {
  return "'Ubuntu Mono', 'Liberation Mono', 'DejaVu Sans Mono', monospace";
}

function renderNotice(tone: LegalNoticeTone, text: string, locale: Locale): string {
  const dot = tone === 'caution' ? 'background:#00707E;' : 'background:#2B4EFF;';
  return `
    <aside class="notice ${tone}" dir="${locale === 'ar' ? 'rtl' : 'ltr'}">
      <span class="notice-dot" style="${dot}" aria-hidden="true"></span>
      <p>${escapeHtml(text)}</p>
    </aside>`;
}

function renderStorageTable(items: BrowserStorageItem[], locale: Locale): string {
  const t = dictionaries[locale].legal;
  const essential = (value: boolean): string =>
    value ? t.storageEssentialLabel : t.storagePreferenceLabel;
  const cellAlign = locale === 'ar' ? 'text-align:right;' : '';
  const rows = items
    .map(
      (item) => `
      <tr>
        <td class="key" dir="ltr" style="text-align:${locale === 'ar' ? 'right' : 'left'};">${escapeHtml(item.key)}</td>
        <td style="${cellAlign}">${escapeHtml(item.mechanism)}</td>
        <td style="${cellAlign}">${escapeHtml(item.purpose)}</td>
        <td style="${cellAlign}"><span class="tag ${item.essential ? 'essential' : 'preference'}">${escapeHtml(essential(item.essential))}</span></td>
      </tr>`,
    )
    .join('');

  return `
    <table>
      <thead>
        <tr>
          <th>${escapeHtml(t.storageKeyLabel)}</th>
          <th>${escapeHtml(t.storageTypeLabel)}</th>
          <th>${escapeHtml(t.storagePurposeLabel)}</th>
          <th>${escapeHtml(t.storageEssentialLabel)}</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function renderBlock(block: LegalBlock, locale: Locale): string {
  switch (block.type) {
    case 'p':
      return `<p>${escapeHtml(block.text)}</p>`;
    case 'h3':
      return `<h3>${escapeHtml(block.heading)}</h3>`;
    case 'ul':
      return `<ul>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
    case 'ol':
      return `<ol>${block.items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ol>`;
    case 'notice':
      return renderNotice(block.tone, block.text, locale);
    case 'storageInventory':
      return renderStorageTable(block.items, locale);
    default:
      return '';
  }
}

function renderSections(doc: LegalDocument, locale: Locale): string {
  const content = doc.content[locale];
  return content.sections
    .map(
      (section) => `
      <section>
        <h2>${escapeHtml(section.heading)}</h2>
        ${section.blocks.map((block) => renderBlock(block, locale)).join('\n')}
      </section>`,
    )
    .join('\n');
}

function footerTemplate(doc: LegalDocument, locale: Locale): string {
  const title = doc.content[locale].title;
  const page = templateLabels[locale].pageOf;
  const font = baseFontFamily(locale);
  // %p / %t are replaced by Chromium with the current and total page counts.
  const pageMarkup = page
    .replace('%p', '<span class="pageNumber"></span>')
    .replace('%t', '<span class="totalPages"></span>');
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return `
  <div style="width:100%;padding:0 16mm 7mm;display:flex;justify-content:space-between;align-items:center;gap:16px;font-family:${font};color:#64748B;font-size:8px;direction:${dir};">
    <div style="display:flex;align-items:center;gap:8px;min-width:0;">
      <span style="font-weight:700;color:#0B1E36;font-size:9px;letter-spacing:0.02em;">ValtQ</span>
      <span style="opacity:0.45;font-weight:600;letter-spacing:0.04em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(title)}</span>
    </div>
    <div style="white-space:nowrap;">${pageMarkup}</div>
  </div>`;
}

function buildHtml(doc: LegalDocument, locale: Locale, logoDataUri: string): string {
  const content = doc.content[locale];
  const labels = templateLabels[locale];
  const t = dictionaries[locale].legal;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const font = baseFontFamily(locale);

  return `<!doctype html>
<html lang="${locale}" dir="${dir}">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(content.title)} — ValtQ</title>
<style>
  :root {
    --navy: #0b1e36;
    --cobalt: #2b4eff;
    --cyan: #22e5ff;
    --teal: #00707e;
    --slate: #334155;
    --muted: #5b6775;
    --border: #e2e8f0;
    --surface: #f6f8fb;
  }
  * { box-sizing: border-box; }
  html, body {
    margin: 0;
    padding: 0;
    background: #ffffff;
    color: var(--slate);
    font-family: ${font};
    font-size: 10.5pt;
    line-height: 1.68;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .doc { max-width: 100%; }

  /* ---- Header ---- */
  .doc-header {
    border-bottom: 1px solid var(--border);
    padding-bottom: 16px;
    margin-bottom: 22px;
  }
  .brand-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }
  .brand { display: flex; align-items: center; gap: 10px; min-width: 0; }
  .brand img { height: 34px; width: 34px; flex: none; }
  .brand-name {
    font-size: 13pt;
    font-weight: 700;
    color: var(--navy);
    letter-spacing: -0.01em;
  }
  .legal-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 5px 12px;
    border: 1px solid #b9c5ff;
    border-radius: 999px;
    background: #f0f3ff;
    color: #0032de;
    font-size: 8pt;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    white-space: nowrap;
  }
  .legal-badge .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--cyan);
  }
  h1.title {
    margin: 18px 0 8px;
    font-size: 25pt;
    line-height: 1.15;
    letter-spacing: -0.015em;
    color: var(--navy);
    font-weight: 700;
  }
  .doc-description {
    margin: 0;
    max-width: 168mm;
    color: var(--muted);
    font-size: 11pt;
    line-height: 1.55;
  }
  .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px 20px;
    margin-top: 16px;
  }
  .meta-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 5px 11px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--surface);
    font-size: 8.5pt;
    color: var(--muted);
    font-weight: 500;
  }
  .meta-item .key { color: var(--navy); font-weight: 700; }
  .accent-rule {
    height: 3px;
    margin: 0 0 0;
    background: linear-gradient(90deg, var(--navy) 0%, var(--cobalt) 45%, var(--cyan) 100%);
    border-radius: 0 0 3px 3px;
  }

  /* ---- Content ---- */
  section { margin: 0 0 22px; }
  h2 {
    margin: 0 0 10px;
    font-size: 13pt;
    font-weight: 700;
    color: var(--navy);
    letter-spacing: -0.005em;
    break-after: avoid;
    break-inside: avoid;
  }
  h3 {
    margin: 14px 0 7px;
    font-size: 11pt;
    font-weight: 700;
    color: var(--navy);
    break-after: avoid;
    break-inside: avoid;
  }
  p { margin: 0 0 10px; orphans: 3; widows: 3; }
  ul, ol { margin: 0 0 12px; padding-inline-start: 20px; }
  li { margin: 0 0 6px; orphans: 3; widows: 3; }
  li::marker { color: var(--cobalt); font-weight: 700; }

  /* ---- Notices ---- */
  .notice {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin: 0 0 14px;
    padding: 11px 14px;
    border: 1px solid;
    border-radius: 8px;
    break-inside: avoid;
  }
  .notice p { margin: 0; }
  .notice-dot {
    flex: none;
    width: 7px;
    height: 7px;
    margin-top: 5px;
    border-radius: 50%;
  }

  /* ---- Storage table ---- */
  table {
    width: 100%;
    margin: 0 0 14px;
    border-collapse: collapse;
    font-size: 9pt;
  }
  thead { display: table-header-group; }
  thead th {
    background: var(--navy);
    color: #ffffff;
    padding: 7px 10px;
    text-align: left;
    font-size: 7.5pt;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  tbody td {
    padding: 8px 10px;
    border-bottom: 1px solid var(--border);
    vertical-align: top;
  }
  tbody tr { break-inside: avoid; }
  td.key { font-family: ${monoFontFamily()}; font-weight: 600; color: var(--navy); word-break: break-word; }
  .tag {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 999px;
    font-size: 7.5pt;
    font-weight: 700;
    white-space: nowrap;
  }
  .tag.essential { background: rgba(34, 229, 255, 0.16); color: #00515c; }
  .tag.preference { background: var(--surface); color: var(--muted); border: 1px solid var(--border); }

  [dir="rtl"] thead th { text-align: right; }
  [dir="rtl"] .doc-description { max-width: 168mm; }
</style>
</head>
<body>
  <div class="doc">
    <div class="accent-rule" aria-hidden="true"></div>
    <header class="doc-header">
      <div class="brand-row">
        <div class="brand">
          <img src="${logoDataUri}" alt="ValtQ logo" />
          <span class="brand-name">ValtQ</span>
        </div>
        <span class="legal-badge"><span class="dot" aria-hidden="true"></span>${escapeHtml(labels.legalDocument)}</span>
      </div>
      <h1 class="title">${escapeHtml(content.title)}</h1>
      <p class="doc-description">${escapeHtml(content.description)}</p>
      <div class="meta-row">
        <span class="meta-item"><span class="key">${escapeHtml(t.effectiveLabel)}</span>${escapeHtml(formatIsoDate(doc.effectiveDate, locale))}</span>
        <span class="meta-item"><span class="key">${escapeHtml(t.updatedLabel)}</span>${escapeHtml(formatIsoDate(doc.updatedDate, locale))}</span>
      </div>
    </header>
    <main>
      <p class="doc-description" style="margin-bottom:18px;">${escapeHtml(content.intro)}</p>
      ${renderSections(doc, locale)}
    </main>
  </div>
</body>
</html>`;
}

async function generatePdf(
  context: BrowserContext,
  html: string,
  doc: LegalDocument,
  locale: Locale,
  outputPath: string,
): Promise<void> {
  const page = await context.newPage();
  try {
    await page.setContent(html, { waitUntil: 'load' });
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate: footerTemplate(doc, locale),
      margin: { top: '18mm', right: '16mm', bottom: '18mm', left: '16mm' },
      preferCSSPageSize: false,
    });
  } finally {
    await page.close();
  }
}

async function launchBrowser() {
  const executablePathCandidates = [
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    process.env.CHROME_PATH,
    '/usr/bin/google-chrome-stable',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
  ].filter((value): value is string => Boolean(value));

  try {
    return await chromium.launch();
  } catch {
    for (const executablePath of executablePathCandidates) {
      try {
        return await chromium.launch({ executablePath });
      } catch {
        // Try the next candidate.
      }
    }
    fail(
      'No Chromium browser could be launched. Install the Playwright browser once with:\n' +
        '  pnpm --filter web exec playwright install chromium\n' +
        'or set CHROME_PATH to a system Chrome/Chromium binary.',
    );
  }
}

async function main(): Promise<void> {
  const logoDataUri = readLogoDataUri();

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  for (const { slug, doc } of documents) {
    for (const locale of LOCALES) {
      const content = doc.content[locale];
      if (!content) {
        fail(`Missing "${locale}" content for the "${slug}" document.`);
      }
    }
  }

  const browser = await launchBrowser();
  try {
    const context = await browser.newContext({ deviceScaleFactor: 2 });
    for (const { file, doc } of documents) {
      for (const locale of LOCALES) {
        const outputPath = path.join(outDir, `${file}-${locale}.pdf`);
        const html = buildHtml(doc, locale, logoDataUri);
        await generatePdf(context, html, doc, locale, outputPath);
        const size = fs.statSync(outputPath).size;
        if (size === 0) {
          fail(`Generated an empty PDF at ${outputPath}.`);
        }
        console.log(`  ✔ ${path.relative(webRoot, outputPath)}  (${size.toLocaleString('en-US')} bytes)`);
      }
    }
    await context.close();
  } finally {
    await browser.close();
  }

  console.log('\n[generate-legal-pdfs] Done. Six legal PDFs written to public/documents/legal/.');
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  fail(`Unexpected failure: ${message}`);
});
