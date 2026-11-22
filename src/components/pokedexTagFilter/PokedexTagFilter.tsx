'use client';

import {
  POKEDEX_TAGS,
  type PokedexTagSelection,
} from '@/store/PokemonStore';

import s from './pokedexTagFilter.module.scss';

type PokedexTagFilterProps = {
  selections: PokedexTagSelection[];
  onCycleTag: (tag: string) => void;
  onClear: () => void;
};

function isGenerationTag(tag: string) {
  return /^\d+세대$/.test(tag);
}

function isLegendarySubTag(tag: string) {
  return tag === '초전설' || tag === '준전설';
}

export default function PokedexTagFilter({
  selections,
  onCycleTag,
  onClear,
}: PokedexTagFilterProps) {
  const modeByTag = new Map(
    selections.map((entry) => [entry.tag, entry.mode] as const),
  );
  const noneActive = selections.length === 0;
  const legendInclude = modeByTag.get('전설') === 'include';
  const ultraExcluded = modeByTag.get('초전설') === 'exclude';
  const quasiExcluded = modeByTag.get('준전설') === 'exclude';
  // 초전설·준전설을 둘 다 제외하면 전설 그룹 전체 선택 UI는 끔
  const bothSubsExcluded = legendInclude && ultraExcluded && quasiExcluded;

  return (
    <div className={s.wrap} role="group" aria-label="도감 태그 필터">
      <button
        type="button"
        className={`${s.tagBtn} ${noneActive ? s.tagBtnActive : ''}`}
        aria-pressed={noneActive}
        onClick={onClear}
      >
        전체
      </button>
      {POKEDEX_TAGS.map((tag) => {
        const mode = modeByTag.get(tag);
        const include = mode === 'include';
        const exclude = mode === 'exclude';
        const isGen = isGenerationTag(tag);
        const isSub = isLegendarySubTag(tag);
        // 전설 선택 시 아직 제외하지 않은 초전설/준전설은 선택 UI
        const subActiveLook =
          isSub && legendInclude && !mode && !bothSubsExcluded;
        const showActive =
          tag === '전설'
            ? include && !bothSubsExcluded
            : include || subActiveLook;
        // 둘 다 제외면 전설 그룹 필터 해제와 맞춰 기본 UI (하나만 제외일 때는 빨간 제외 UI)
        const showExclude = exclude && !(isSub && bothSubsExcluded);
        const subExcludeUnderLegend = isSub && legendInclude && exclude;
        const showDividerBefore = tag === '전설' || tag === '환상';
        const showExcludeLabel = exclude && !(isSub && bothSubsExcluded);

        return (
          <span key={tag} className={s.tagItem}>
            {showDividerBefore ? (
              <span className={s.divider} aria-hidden>
                |
              </span>
            ) : null}
            <button
              type="button"
              className={`${s.tagBtn} ${showActive ? s.tagBtnActive : ''} ${showExclude ? s.tagBtnExclude : ''}`}
              aria-pressed={showActive || showExclude}
              aria-label={
                include
                  ? isGen || tag === '전설' || tag === '환상'
                    ? `${tag} 포함 (다시 누르면 제외)`
                    : `${tag}만 보기 (다시 누르면 제외)`
                  : exclude
                    ? subExcludeUnderLegend
                      ? `전설 중 ${tag} 제외 (다시 누르면 해제)`
                      : `${tag} 제외 (다시 누르면 해제)`
                    : subActiveLook
                      ? `전설 중 ${tag} 제외 필터 켜기`
                      : isGen || tag === '전설' || tag === '환상'
                        ? `${tag} 필터 (다른 태그와 함께 선택 가능)`
                        : `${tag} 필터`
              }
              onClick={() => onCycleTag(tag)}
            >
              {showExcludeLabel ? `${tag}제외` : tag}
            </button>
          </span>
        );
      })}
    </div>
  );
}
