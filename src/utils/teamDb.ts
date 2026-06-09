/** teams.id — user DB PK + team_slot 기준 안정적인 TEXT PK */
export function buildTeamRowId(
  userDbId: string | number,
  teamSlot: number,
): string {
  return `${userDbId}:${teamSlot}`;
}

export function normalizeDbId(value: unknown): string {
  if (value == null) return '';
  return String(value);
}
