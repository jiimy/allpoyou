/**
 * POCHAMS_POKEMON_DATA 전수 pokemon meta prefetch (로컬 1회 실행용)
 *
 *   node scripts/prefetch-pokemon-meta.mjs
 */

import { readFileSync, writeFileSync } from 'fs';

const t = readFileSync('./src/components/pochamsData/PochamsPokemonData.ts', 'utf8');
const names = [...t.matchAll(/'([^']+)'/g)]
  .map((m) => m[1])
  .filter((n) => n !== 'as const');

const slug = (raw) => raw.trim().toLowerCase().replace(/[^a-z0-9.-]/g, '');
const DELAY = 3800;
const BASE = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const summary = {
  startedAt: new Date().toISOString(),
  total: names.length,
  ok: 0,
  fail: 0,
  errors: [],
};

console.log('[pokemon-meta] count=', names.length, 'delay=', DELAY);

for (let i = 0; i < names.length; i++) {
  const name = names[i];
  const s = slug(name);
  const url = `${BASE}/api/pokemon-meta/${encodeURIComponent(s)}`;
  const n = i + 1;

  try {
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      summary.fail++;
      summary.errors.push({
        name,
        slug: s,
        status: res.status,
        error: data.error || res.statusText,
      });
      console.log(`[${n}/${names.length}] FAIL`, name, res.status, data.error || '');
    } else {
      summary.ok++;
      console.log(
        `[${n}/${names.length}] OK`,
        name,
        data.cached ? '(cached)' : '(fresh)',
        data.storagePath || '',
      );
    }
  } catch (e) {
    summary.fail++;
    summary.errors.push({ name, slug: s, error: String(e) });
    console.log(`[${n}/${names.length}] ERR`, name, e.message || e);
  }

  writeFileSync(
    './prefetch-pokemon-meta-progress.json',
    JSON.stringify(
      { ...summary, index: n, name, updatedAt: new Date().toISOString() },
      null,
      2,
    ),
  );

  if (i < names.length - 1) await sleep(DELAY);
}

summary.finishedAt = new Date().toISOString();
writeFileSync(
  './prefetch-pokemon-meta-progress.json',
  JSON.stringify(summary, null, 2),
);
console.log('[pokemon-meta] done ok=', summary.ok, 'fail=', summary.fail);
