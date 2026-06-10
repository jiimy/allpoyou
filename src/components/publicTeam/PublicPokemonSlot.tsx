import Image from 'next/image';
import { TYPE_COLOR } from '@/constants/pokemonTypeColor';
import { resolvePokemonSlot } from '@/utils/publicTeamDisplay';
import type { TeamPokemonSlot } from '@/store/teamDbMappers';
import s from './publicTeam.module.scss';

type PublicPokemonSlotProps = {
  slot: TeamPokemonSlot | null;
  slotIndex: number;
};

export default function PublicPokemonSlot({
  slot,
  slotIndex,
}: PublicPokemonSlotProps) {
  const resolved = resolvePokemonSlot(slot);

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
          <Image
            src={resolved.imageUrl}
            alt={resolved.nameKo}
            width={72}
            height={72}
            className={s.slotImage}
          />
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
