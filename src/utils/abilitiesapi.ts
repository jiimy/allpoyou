import abilitiesData from '@/constants/abilities.json';

export type AbilityKr = {
  id: number;
  nameKo: string;
  summary: string;
};

type AbilityJsonEntry = {
  nameKo: string;
  summary: string;
};

/** constants/abilities.json 기준 한국어 특성 목록 */
export async function fetchAllAbilitiesKr(): Promise<AbilityKr[]> {
  const entries = Object.entries(
    abilitiesData as Record<string, AbilityJsonEntry>,
  );

  return entries
    .map(([id, entry]) => ({
      id: Number(id),
      nameKo: entry.nameKo,
      summary: entry.summary,
    }))
    .filter((entry) => Number.isFinite(entry.id))
    .sort((a, b) => a.id - b.id);
}
