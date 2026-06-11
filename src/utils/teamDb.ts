export function normalizeDbId(value: unknown): string {
  if (value == null) return '';
  return String(value);
}
