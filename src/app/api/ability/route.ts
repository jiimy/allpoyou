import { type NextRequest } from 'next/server';
import { fetchAllAbilitiesKr } from '@/utils/abilitiesapi';

export const revalidate = 604800;

/**
 * GET /api/ability
 *
 * 쿼리 파라미터:
 *   - limit  (선택) 가져올 개수
 *   - offset (선택) 건너뛸 개수, 기본 0
 *
 * 응답:
 *   { total, count, results: AbilityKr[] }
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limit = parsePositiveInt(searchParams.get('limit'));
    const offset = parsePositiveInt(searchParams.get('offset')) ?? 0;

    const all = await fetchAllAbilitiesKr();

    const sliced =
      typeof limit === 'number' ? all.slice(offset, offset + limit) : all.slice(offset);

    return Response.json({
      total: all.length,
      count: sliced.length,
      results: sliced,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return Response.json({ error: message }, { status: 500 });
  }
}

function parsePositiveInt(value: string | null): number | undefined {
  if (value == null) return undefined;
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n) || n < 0) return undefined;
  return n;
}
