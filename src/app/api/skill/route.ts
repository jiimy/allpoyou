import { type NextRequest } from 'next/server';

import { fetchAllItemsKr } from '@/utils/itemapi';

// 1주일(604800초). 값은 정적 리터럴이어야 Next.js 빌드가 통과함.
export const revalidate = 604800;

/**
 * GET /api/skill
 *
 * 쿼리 파라미터:
 *   - limit  (선택) 가져올 개수
 *   - offset (선택) 건너뛸 개수, 기본 0
 *
 * 응답:
 *   { total, count, results: ItemKr[] }
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const limit = parsePositiveInt(searchParams.get('limit'));
    const offset = parsePositiveInt(searchParams.get('offset')) ?? 0;

    const all = await fetchAllItemsKr();

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
