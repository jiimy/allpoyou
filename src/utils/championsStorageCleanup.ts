import 'server-only';

import { createAdminClient } from '@/utils/supabase/admin';
import {
  BATTLE_STORAGE_BUCKET,
  buildStoragePath,
  getSeoulDateDaysAgo,
  type BattleFormat,
} from '@/utils/battleData';

/** 오늘 포함 최근 N일만 유지. N일 전(및 그 이전) CSV는 삭제 */
export const CHAMPIONS_CSV_RETENTION_DAYS = 3;

const DATED_CSV_RE = /^(\d{4}-\d{2}-\d{2})(?:-metadata)?\.csv$/;

export type StorageCleanupResult = {
  folder: string;
  deleted: string[];
  kept: string[];
  error?: string;
};

/**
 * 폴더 내 YYYY-MM-DD.csv / YYYY-MM-DD-metadata.csv 중
 * retentionDays일 전(및 더 오래된) 파일을 삭제합니다.
 * 예: retentionDays=3 → 오늘·어제·그제 유지, 3일 전 이하는 삭제
 */
export async function cleanupOldDatedCsvsInFolder(
  folderPath: string,
  retentionDays = CHAMPIONS_CSV_RETENTION_DAYS,
): Promise<StorageCleanupResult> {
  const folder = folderPath.replace(/^\/+|\/+$/g, '');
  const oldestKeep = getSeoulDateDaysAgo(retentionDays - 1);
  const deleted: string[] = [];
  const kept: string[] = [];

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.storage
      .from(BATTLE_STORAGE_BUCKET)
      .list(folder, {
        limit: 100,
        sortBy: { column: 'name', order: 'asc' },
      });

    if (error) {
      return { folder, deleted, kept, error: error.message };
    }

    const toRemove: string[] = [];
    for (const item of data ?? []) {
      const name = item.name;
      if (!name) continue;
      const match = DATED_CSV_RE.exec(name);
      if (!match) continue;

      const fileDate = match[1]!;
      const fullPath = `${folder}/${name}`;
      if (fileDate < oldestKeep) {
        toRemove.push(fullPath);
        deleted.push(fullPath);
      } else {
        kept.push(fullPath);
      }
    }

    if (toRemove.length > 0) {
      const { error: removeError } = await supabase.storage
        .from(BATTLE_STORAGE_BUCKET)
        .remove(toRemove);
      if (removeError) {
        return {
          folder,
          deleted: [],
          kept,
          error: removeError.message,
        };
      }
    }

    return { folder, deleted, kept };
  } catch (error) {
    return {
      folder,
      deleted: [],
      kept,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/** Pokemon/{slug}/ 의 오래된 CSV(+metadata) 정리 */
export async function cleanupOldPokemonMetaCsvs(
  slug: string,
  retentionDays = CHAMPIONS_CSV_RETENTION_DAYS,
): Promise<StorageCleanupResult> {
  return cleanupOldDatedCsvsInFolder(`Pokemon/${slug}`, retentionDays);
}

/** Singles|Doubles/{slug}/ 의 오래된 CSV 정리 */
export async function cleanupOldBattleCsvs(
  format: BattleFormat,
  slug: string,
  retentionDays = CHAMPIONS_CSV_RETENTION_DAYS,
): Promise<StorageCleanupResult> {
  const sample = buildStoragePath(format, slug, getSeoulDateDaysAgo(0));
  const folder = sample.replace(/\/[^/]+$/, '');
  return cleanupOldDatedCsvsInFolder(folder, retentionDays);
}
