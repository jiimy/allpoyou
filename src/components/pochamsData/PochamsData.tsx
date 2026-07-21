'use client';

import { useEffect, useState } from 'react';
import {
  fetchPokemonList,
  getPokemonByNameKo,
  type Pokemon,
} from '@/store/PokemonStore';
import { usePochampsStore } from '@/store/PochampsStore';
import { getBaseEnglishNameForDex } from '@/utils/pokemonName';

import s from './pochamsData.module.scss';

type BattleCategoryItem = {
  rank: number;
  name: string;
  nameEn: string;
  percentage: string;
};

type BattleCategoryGroup = {
  category: string;
  labelKo: string;
  items: BattleCategoryItem[];
};

type BattlePreview = {
  cached: boolean;
  date: string;
  pokemon: string;
  pokemonKo: string;
  showdownId: string;
  format: string;
  storagePath: string;
  byCategory: BattleCategoryGroup[];
};

type PochamsDataProps = {
  keyword: string;
};

function resolvePokemonForBattle(keyword: string, list: Pokemon[]): Pokemon | null {
  const q = keyword.trim();
  if (!q) return null;

  const exact = getPokemonByNameKo(q);
  if (exact) return exact;

  const lower = q.toLowerCase();
  return (
    list.find((p) => p.nameKo === q) ??
    list.find((p) => p.name.toLowerCase() === lower) ??
    list.find((p) => p.nameKo.includes(q)) ??
    null
  );
}

const PochamsData = ({ keyword }: PochamsDataProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<BattlePreview | null>(null);

  const enabled = usePochampsStore((state) => state.enabled);
  const battleFormat = usePochampsStore((state) => state.format);

  const q = keyword.trim();

  const shouldFetch = enabled && q.length > 0;

  useEffect(() => {
    if (!shouldFetch) return;

    let cancelled = false;

    const run = async () => {
      setLoading(true);
      setError(null);

      try {
        const list = await fetchPokemonList();
        if (cancelled) return;

        const pokemon = resolvePokemonForBattle(q, list);
        if (!pokemon) {
          setPreview(null);
          setError(`"${q}"에 해당하는 포켓몬을 찾지 못했습니다.`);
          return;
        }

        const slug = getBaseEnglishNameForDex(pokemon.name).toLowerCase();
        const res = await fetch(
          `/api/battle/${battleFormat}/${encodeURIComponent(slug)}`,
        );
        const data = (await res.json()) as BattlePreview & { error?: string };

        if (cancelled) return;

        if (!res.ok) {
          setPreview(null);
          setError(data.error ?? `배틀 데이터 조회 실패 (${res.status})`);
          return;
        }

        setPreview({
          cached: data.cached,
          date: data.date,
          pokemon: data.pokemon,
          pokemonKo: data.pokemonKo,
          showdownId: data.showdownId,
          format: data.format,
          storagePath: data.storagePath,
          byCategory: data.byCategory ?? [],
        });
        setError(null);
      } catch (err) {
        if (cancelled) return;
        setPreview(null);
        setError(
          err instanceof Error ? err.message : '배틀 데이터를 가져오지 못했습니다.',
        );
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [shouldFetch, q, battleFormat]);

  if (!shouldFetch) return null;

  return (
    <div className={s.panel}>
      {loading ? (
        <p className={s.hint}>포챔스 배틀 데이터 조회 중…</p>
      ) : error ? (
        <p className={`${s.hint} ${s.hintError}`}>{error}</p>
      ) : preview ? (
        <>
          <p className={s.meta}>
            {preview.pokemonKo || preview.pokemon} · {preview.format} ·{' '}
            {/* {preview.cached ? '캐시' : '신규 저장'} ·  */}
            {preview.date}
          </p>
          <div className={s.categories}>
            {preview.byCategory.map((group) => (
              <section key={group.category} className={s.category}>
                <h3 className={s.categoryTitle}>
                  {group.labelKo}
                  <span className={s.categoryCount}>{group.items.length}</span>
                </h3>
                <ol className={s.list}>
                  {group.items.map((item) => (
                    <li
                      key={`${group.category}-${item.rank}-${item.nameEn || item.name}`}
                    >
                      <span className={s.rank}>{item.rank}</span>
                      <span className={s.name} title={item.nameEn || undefined}>
                        {item.name}
                      </span>
                      {item.percentage ? (
                        <span className={s.pct}>{item.percentage}</span>
                      ) : null}
                    </li>
                  ))}
                </ol>
              </section>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PochamsData;
