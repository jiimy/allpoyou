import { type NextRequest } from 'next/server';

import { recordAccessLog } from '@/utils/accessLog';

export const dynamic = 'force-dynamic';

/**
 * POST /api/access-log
 * 접속 시 IP·user_id(비로그인 null)를 access_logs 에 기록합니다.
 */
export async function POST(request: NextRequest) {
  try {
    const result = await recordAccessLog(request.headers);
    if (result.error) {
      console.error('[POST /api/access-log]', result.error, {
        ip: result.ip,
        userId: result.userId,
      });
    }
    return Response.json(result, {
      status: result.error ? 500 : 200,
      headers: { 'Cache-Control': 'no-store' },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : '접속 로그 기록에 실패했습니다.';
    console.error('[POST /api/access-log]', message);
    return Response.json(
      { recorded: false, error: message },
      { status: 500 },
    );
  }
}
