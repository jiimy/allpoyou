'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { TYPE_COLOR } from '@/constants/pokemonTypeColor';
import {
  fetchPokemonList,
  getCachedPokemonList,
  getPokemonById,
} from '@/store/PokemonStore';
import type { TeamPokemonSlot } from '@/store/teamDbMappers';
import { getPokemonStaticImage } from '@/utils/pokemonDisplay';
import { resolvePokemonSlot } from '@/utils/publicTeamDisplay';
import s from './publicTeam.module.scss';

type PublicPokemonSlotProps = {
  slot: TeamPokemonSlot | null;
  slotIndex: number;
};

function enrichSlotFromDex(
  slot: TeamPokemonSlot,
): TeamPokemonSlot {
  const pokemon = getPokemonById(slot.pokemonId);
  if (!pokemon) return slot;

  return {
    ...slot,
    nameKo: slot.nameKo.trim() ? slot.nameKo : pokemon.nameKo,
    nameEn: slot.nameEn.trim() ? slot.nameEn : pokemon.name,
    types: slot.types.length > 0 ? slot.types : pokemon.types,
    images: slot.images?.length ? slot.images : pokemon.images,
  };
}

export default function PublicPokemonSlot({
  slot,
  slotIndex,
}: PublicPokemonSlotProps) {
  const [pokemonReady, setPokemonReady] = useState(
    () => getCachedPokemonList().length > 0,
  );

  useEffect(() => {
    if (pokemonReady) return;
    void fetchPokemonList().finally(() => setPokemonReady(true));
  }, [pokemonReady]);

  const enrichedSlot =
    slot && (pokemonReady || getCachedPokemonList().length > 0)
      ? enrichSlotFromDex(slot)
      : slot;

  const resolved = resolvePokemonSlot(enrichedSlot);
  const staticImageUrl = getPokemonStaticImage(resolved?.images);

  if (!resolved) {
    return (
      <div className={s.slot}>
        <div className={s.slotEmpty}>빈 슬롯 {slotIndex + 1}</div>
      </div>
    );
  }

  return (
    <div className={s.slot}>
      <div className={s.slotHeader}>
        <div className={s.slotImageWrap}>
          {staticImageUrl ? (
            <Image
              src={staticImageUrl}
              alt={resolved.nameKo}
              width={72}
              height={72}
              className={s.slotImage}
              unoptimized
            />
          ) : (
            <div className={s.slotImagePlaceholder} aria-hidden />
          )}
        </div>
        <div className={s.slotNameWrap}>
          <div className={s.slotName}>{resolved.nameKo}</div>
          <div className={s.slotTypes}>
            {resolved.types.map((type) => (
              <span
                key={type}
                className={s.typeBadge}
                style={{ backgroundColor: TYPE_COLOR[type] ?? '#888' }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      </div>

      <dl className={s.slotDetails}>
        <div>
          <dt>특성</dt>
          <dd>{resolved.ability ?? '-'}</dd>
        </div>
        <div>
          <dt>도구</dt>
          <dd>{resolved.item ?? '-'}</dd>
        </div>
        <div>
          <dt>성격</dt>
          <dd>{resolved.nature ?? '-'}</dd>
        </div>
        <div>
          <dt>기술</dt>
          <dd>
            {resolved.moves.length > 0
              ? resolved.moves.join(' · ')
              : '-'}
          </dd>
        </div>
        <div>
          <dt>노력치</dt>
          <dd>{resolved.evsText || '-'}</dd>
        </div>
      </dl>
    </div>
  );
}
