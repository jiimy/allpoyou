import { type NextRequest } from 'next/server';

import { POCHAMS_POKEMON_DATA } from '@/components/pochamsData/PochamsPokemonData';
import { BATTLE_FORMATS, normalizePokemonSlug } from '@/utils/battleData';
import {
  CHAMPIONS_CSV_RETENTION_DAYS,
  cleanupOldBattleCsvs,
  cleanupOldPokemonMetaCsvs,
} from '@/utils/championsStorageCleanup';

export const dynamic = 'force-dynamic';
export const maxDuration = 300;

function authorize(request: NextRequest): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return process.env.NODE_ENV === 'development';
  }

  const auth = request.headers.get('authorization');
  if (auth === `Bearer ${secret}`) return true;
  if (request.headers.get('x-vercel-cron') === '1') return true;
  return false;
}

/**
 * GET /api/cron/storage-cleanup
 *
 * Pokemon / Singles / Doubles 각 포켓몬 폴더에서
 * retentionDays(기본 3)일 전 및 이전 dated CSV를 삭제합니다.
 */
export async function GET(request: NextRequest) {
  if (!authorize(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const retentionParam = Number(
    request.nextUrl.searchParams.get('retentionDays') ??
      CHAMPIONS_CSV_RETENTION_DAYS,
  );
  const retentionDays =
    Number.isFinite(retentionParam) && retentionParam > 0
      ? Math.floor(retentionParam)
      : CHAMPIONS_CSV_RETENTION_DAYS;

  let deletedCount = 0;
  let folders = 0;
  const errors: { folder: string; error: string }[] = [];
  const sampleDeleted: string[] = [];

  for (const displayName of POCHAMS_POKEMON_DATA) {
    const slug = normalizePokemonSlug(displayName);

    const pokemonCleanup = await cleanupOldPokemonMetaCsvs(slug, retentionDays);
    folders += 1;
    deletedCount += pokemonCleanup.deleted.length;
    if (pokemonCleanup.error) {
      errors.push({ folder: pokemonCleanup.folder, error: pokemonCleanup.error });
    } else if (sampleDeleted.length < 20) {
      sampleDeleted.push(...pokemonCleanup.deleted.slice(0, 5));
    }

    for (const format of BATTLE_FORMATS) {
      const battleCleanup = await cleanupOldBattleCsvs(
        format,
        slug,
        retentionDays,
      );
      folders += 1;
      deletedCount += battleCleanup.deleted.length;
      if (battleCleanup.error) {
        errors.push({
          folder: battleCleanup.folder,
          error: battleCleanup.error,
        });
      } else if (sampleDeleted.length < 40) {
        sampleDeleted.push(...battleCleanup.deleted.slice(0, 3));
      }
    }
  }

  return Response.json({
    message: 'Storage cleanup 완료',
    retentionDays,
    folders,
    deletedCount,
    sampleDeleted: sampleDeleted.slice(0, 40),
    errorCount: errors.length,
    errors: errors.slice(0, 20),
  });
}
