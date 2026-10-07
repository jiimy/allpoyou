import { type NextRequest } from 'next/server';

import {
  loadDailyPositionRankingsWithProgress,
  rebuildDailyPositionRankingsFromApi,
  type PokemonPositionRankings,
  type RankingsProgressEvent,
} from '@/utils/pokemonMetaData';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

type StreamEvent =
  | ({ type: 'progress' } & RankingsProgressEvent)
  | { type: 'result'; data: PokemonPositionRankings }
  | { type: 'error'; message: string };

/**
 * GET /api/pokemon-meta/rankings
 * - 기본: 캐시된 Doubles/Singles position 1~15 (오늘 → 어제 → 최근 파일)
 * - 오늘자 캐시가 없으면 동기 재생성 후 반환
 * - ?stream=1 : NDJSON 진행 상황 스트리밍
 * - ?rebuild=1 : pokemon API(`/api/pokemon/:slug`) battle_summary 기준 재생성
 */
export async function GET(request: NextRequest) {
  try {
    const rebuild = request.nextUrl.searchParams.get('rebuild') === '1';
    const stream = request.nextUrl.searchParams.get('stream') === '1';
    const limit = Number(request.nextUrl.searchParams.get('limit') ?? '15');
    const safeLimit =
      Number.isFinite(limit) && limit > 0 ? Math.min(Math.floor(limit), 50) : 15;

    if (rebuild) {
      const secret = process.env.CRON_SECRET;
      const auth = request.headers.get('authorization');
      const isDev = process.env.NODE_ENV === 'development';
      if (secret && auth !== `Bearer ${secret}` && !isDev) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const data = await rebuildDailyPositionRankingsFromApi({
        limit: safeLimit,
        concurrency: 8,
      });
      return Response.json(data, {
        headers: { 'Cache-Control': 'no-store' },
      });
    }

    if (stream) {
      const encoder = new TextEncoder();
      const readable = new ReadableStream<Uint8Array>({
        async start(controller) {
          const send = (event: StreamEvent) => {
            controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
          };

          try {
            const data = await loadDailyPositionRankingsWithProgress(
              safeLimit,
              async (progress) => {
                send({ type: 'progress', ...progress });
              },
            );
            send({ type: 'result', data });
          } catch (error) {
            send({
              type: 'error',
              message:
                error instanceof Error
                  ? error.message
                  : '포켓몬 랭킹을 가져오지 못했습니다.',
            });
          } finally {
            controller.close();
          }
        },
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'application/x-ndjson; charset=utf-8',
          'Cache-Control': 'no-store',
        },
      });
    }

    const data = await loadDailyPositionRankingsWithProgress(safeLimit);
    return Response.json(data, {
      headers: {
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : '포켓몬 랭킹을 가져오지 못했습니다.';
    return Response.json({ error: message }, { status: 500 });
  }
}
