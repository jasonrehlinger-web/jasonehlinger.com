// Runs before every build (see "build" in package.json).
// Blocks the deploy if a source file looks truncated or corrupted, so a bad
// upload never reaches the live site. Netlify keeps serving the last good
// deploy until the file is fixed.
//
// Past damage this catches: pages cut off mid-tag (contact, services,
// speaking) and null bytes padded onto the end of files.

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const ROOTS = ['src', 'public'];
const TEXT = new Set(['.astro', '.md', '.mdx', '.ts', '.js', '.mjs', '.css', '.txt', '.xml', '.svg', '.json', '.html']);

const errors = [];
const warnings = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (TEXT.has(extname(p))) check(p);
  }
}

const count = (s, re) => (s.match(re) || []).length;

function balanced(file, text, open, close, label) {
  const o = count(text, open);
  const c = count(text, close);
  if (o !== c) errors.push(`${file}: ${o} opening vs ${c} closing ${label} (file may be cut off)`);
}

function check(path) {
  const file = relative('.', path).replace(/\\/g, '/');
  const buf = readFileSync(path);

  if (buf.includes(0)) errors.push(`${file}: contains null bytes (corrupted upload)`);
  const text = buf.toString('utf8');
  if (text.includes('�')) errors.push(`${file}: contains invalid characters (corrupted upload)`);
  if (text.trim() === '') errors.push(`${file}: is empty`);

  const ext = extname(path);

  if (ext === '.astro') {
    balanced(file, text, /<style[\s>]/g, /<\/style>/g, '<style> tags');
    balanced(file, text, /<script[\s>]/g, /<\/script>/g, '<script> tags');
    if (/<Layout[\s>]/.test(text) && !text.includes('</Layout>')) {
      errors.push(`${file}: opens <Layout> but never closes it (file may be cut off)`);
    }
    const last = text.trimEnd().slice(-1);
    if (!['>', '}', ';', '-'].includes(last)) {
      errors.push(`${file}: ends mid-line with "${text.trimEnd().slice(-30)}" (file may be cut off)`);
    }
  }

  if (ext === '.md' || ext === '.mdx') {
    if (!/^---\r?\n[\s\S]*?\r?\n---\r?\n/.test(text)) {
      errors.push(`${file}: frontmatter block is missing or not closed`);
    }
    balanced(file, text, /<div[\s>]/g, /<\/div>/g, '<div> tags');
    balanced(file, text, /<p[\s>]/g, /<\/p>/g, '<p> tags');
    balanced(file, text, /<a\s/g, /<\/a>/g, '<a> tags');
  }

  if (text.includes('—')) {
    warnings.push(`${file}: has ${count(text, /—/g)} em-dash(es); house style is no em-dashes`);
  }
}

for (const r of ROOTS) walk(r);

for (const w of warnings) console.warn(`[integrity] warning: ${w}`);
if (errors.length) {
  for (const e of errors) console.error(`[integrity] ERROR: ${e}`);
  console.error(`\n[integrity] ${errors.length} problem(s) found. Build stopped so the live site stays on the last good version.`);
  process.exit(1);
}
console.log('[integrity] All source files look complete.');
