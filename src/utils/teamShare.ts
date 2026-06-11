import {
  EV_TOTAL_MAX,
  TEAM_SLOT_COUNT,
  type SavedTeam,
  type TeamPokemonSlot,
} from '@/store/PokemonTeamStore';

const MOVE_SLOT_COUNT = 4;

export function isPokemonSlotComplete(slot: TeamPokemonSlot | null): boolean {
  if (!slot) return false;
  if (slot.itemId == null) return false;
  if (!slot.nature) return false;
  if (slot.moves.length !== MOVE_SLOT_COUNT) return false;
  if (!slot.evs || slot.evs.total !== EV_TOTAL_MAX) return false;
  return true;
}

/** 팀 이름 + 6마리 모두 도구·성격·기술4·노력치66을 채웠을 때만 공개 가능 */
export function isTeamShareable(team: SavedTeam | undefined): boolean {
  if (!team) return false;
  if (!team.teamName.trim()) return false;
  if (team.pokemons.length !== TEAM_SLOT_COUNT) return false;
  return team.pokemons.every(isPokemonSlotComplete);
}

type PokemonCompareSlot = {
  pokemonId: number | null;
  form?: string;
  abilityId: number | null;
  itemId: number | null;
  nature: string | null;
  teraType: string | null;
  moves: number[];
  evs: TeamPokemonSlot['evs'];
};

function extractPokemonCompareSlot(
  slot: TeamPokemonSlot | null,
): PokemonCompareSlot {
  if (!slot) {
    return {
      pokemonId: null,
      abilityId: null,
      itemId: null,
      nature: null,
      teraType: null,
      moves: [],
      evs: null,
    };
  }

  return {
    pokemonId: slot.pokemonId,
    form: slot.form,
    abilityId: slot.abilityId,
    itemId: slot.itemId,
    nature: slot.nature,
    teraType: slot.teraType,
    moves: [...slot.moves],
    evs: slot.evs,
  };
}

function teamPokemonSignature(pokemons: SavedTeam['pokemons']): string {
  return JSON.stringify(pokemons.map(extractPokemonCompareSlot));
}

function parsePublishedPokemonData(raw: unknown): SavedTeam['pokemons'] {
  if (!Array.isArray(raw)) {
    return Array.from({ length: TEAM_SLOT_COUNT }, () => null);
  }

  return Array.from({ length: TEAM_SLOT_COUNT }, (_, index) => {
    const slot = raw[index];
    if (!slot || typeof slot !== 'object') return null;

    const record = slot as Record<string, unknown>;
    const pokemonId =
      typeof record.pokemonId === 'number'
        ? record.pokemonId
        : typeof record.pokemon_id === 'number'
          ? record.pokemon_id
          : null;
    if (pokemonId == null) return null;

    const parseId = (value: unknown): number | null =>
      typeof value === 'number' && Number.isFinite(value) ? value : null;

    return {
      pokemonId,
      nameKo: '',
      nameEn: '',
      types: [],
      form: typeof record.form === 'string' ? record.form : undefined,
      abilityId: parseId(record.abilityId ?? record.ability_id),
      itemId: parseId(record.itemId ?? record.item_id),
      nature: typeof record.nature === 'string' ? record.nature : null,
      teraType: typeof record.teraType === 'string' ? record.teraType : null,
      moves: Array.isArray(record.moves)
        ? record.moves.filter((id): id is number => typeof id === 'number')
        : [],
      evs:
        record.evs && typeof record.evs === 'object'
          ? (record.evs as TeamPokemonSlot['evs'])
          : null,
    } satisfies TeamPokemonSlot;
  });
}

/** 포켓몬 구성(종·폼·특성·도구·성격·테라·기술·노력치)이 동일한지 비교 */
export function areTeamPokemonsEqual(
  left: SavedTeam['pokemons'],
  right: unknown,
): boolean {
  const normalizedRight = parsePublishedPokemonData(right);
  return teamPokemonSignature(left) === teamPokemonSignature(normalizedRight);
}

/** 이미 동일한 포켓몬 구성으로 공개한 기록이 있는지 */
export function isTeamAlreadyPublished(
  team: SavedTeam | undefined,
  publishedPokemonDataList: unknown[],
): boolean {
  if (!team) return false;
  return publishedPokemonDataList.some((published) =>
    areTeamPokemonsEqual(team.pokemons, published),
  );
}

/** 공개 버튼 활성화: 필수 항목 완료 + 포켓몬 정보가 기존 공개본과 다를 때 */
export function isTeamPublishable(
  team: SavedTeam | undefined,
  publishedPokemonDataList: unknown[],
): boolean {
  return (
    isTeamShareable(team) &&
    !isTeamAlreadyPublished(team, publishedPokemonDataList)
  );
}
