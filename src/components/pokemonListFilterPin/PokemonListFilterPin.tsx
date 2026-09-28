'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { usePokemonListFilterStore } from '@/store/PokemonListFilterStore';
import {
  buildSearchHistoryHref,
  formatSearchHistoryLabel,
  getSearchHistoryKind,
  useSearchHistoryStore,
  type SearchHistoryEntry,
} from '@/store/SearchHistoryStore';

import s from './pokemonListFilterPin.module.scss';

export default function PokemonListFilterPin() {
  const router = useRouter();
  const menuOpen = usePokemonListFilterStore((state) => state.menuOpen);
  const setMenuOpen = usePokemonListFilterStore((state) => state.setMenuOpen);
  const toggleMenu = usePokemonListFilterStore((state) => state.toggleMenu);
  const excludeMega = usePokemonListFilterStore((state) => state.excludeMega);
  const excludeGmax = usePokemonListFilterStore((state) => state.excludeGmax);
  const finalEvolutionOnly = usePokemonListFilterStore(
    (state) => state.finalEvolutionOnly,
  );
  const setExcludeMega = usePokemonListFilterStore(
    (state) => state.setExcludeMega,
  );
  const setExcludeGmax = usePokemonListFilterStore(
    (state) => state.setExcludeGmax,
  );
  const setFinalEvolutionOnly = usePokemonListFilterStore(
    (state) => state.setFinalEvolutionOnly,
  );
  const historyEntries = useSearchHistoryStore((state) => state.entries);
  const clearHistory = useSearchHistoryStore((state) => state.clearEntries);
  const removeHistory = useSearchHistoryStore((state) => state.removeEntry);
  const requestModalOpen = useSearchHistoryStore(
    (state) => state.requestModalOpen,
  );

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, setMenuOpen]);

  const handleHistoryClick = (entry: SearchHistoryEntry) => {
    setMenuOpen(false);
    const kind = getSearchHistoryKind(entry);
    if (kind === 'type-calc' || kind === 'type-table') {
      requestModalOpen(kind);
      return;
    }
    const href = buildSearchHistoryHref(entry);
    if (href) router.push(href);
  };

  const activeCount =
    Number(excludeMega) + Number(excludeGmax) + Number(finalEvolutionOnly);

  return (
    <>
      <button
        type="button"
        className={`${s.pinBtn} ${menuOpen ? s.pinBtnOpen : ''} ${activeCount > 0 ? s.pinBtnActive : ''}`}
        aria-label={menuOpen ? '포켓몬 필터 메뉴 닫기' : '포켓몬 필터 메뉴 열기'}
        aria-expanded={menuOpen}
        onClick={toggleMenu}
      >
        <svg
          className={s.pinIcon}
          viewBox="0 0 24 24"
          width="18"
          height="18"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M16 3a1 1 0 0 1 .8 1.6L14.4 8.2l1.9 1.9a1 1 0 0 1-.2 1.6l-2.3 1.4 4.4 6.6a1 1 0 1 1-1.7 1.1l-4.4-6.6-2.3 1.4a1 1 0 0 1-1.4-.4L6.2 11a1 1 0 0 1 .2-1.6l1.9-1.9L4.6 3.8A1 1 0 0 1 6.2 2.6L9.9 6l1.9-1.9A1 1 0 0 1 12.6 4H16z"
          />
        </svg>
        {activeCount > 0 ? (
          <span className={s.badge}>{activeCount}</span>
        ) : null}
      </button>

      {menuOpen ? (
        <button
          type="button"
          className={s.dim}
          aria-label="필터 메뉴 닫기"
          onClick={() => setMenuOpen(false)}
        />
      ) : null}

      <aside
        className={`${s.panel} ${menuOpen ? s.panelOpen : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className={s.panelHeader}>
          <h2 className={s.panelTitle}>포켓몬 필터</h2>
          <button
            type="button"
            className={s.closeBtn}
            aria-label="닫기"
            onClick={() => setMenuOpen(false)}
          >
            ×
          </button>
        </div>
        <p className={s.panelHint}>도감·추천 목록 등 전역에 적용됩니다.</p>
        <div className={s.checkList}>
          <label className={s.check}>
            <input
              type="checkbox"
              className={s.checkInput}
              checked={excludeMega}
              onChange={(e) => setExcludeMega(e.target.checked)}
            />
            메가진화제외
          </label>
          <label className={s.check}>
            <input
              type="checkbox"
              className={s.checkInput}
              checked={excludeGmax}
              onChange={(e) => setExcludeGmax(e.target.checked)}
            />
            거다이제외
          </label>
          <label className={s.check}>
            <input
              type="checkbox"
              className={s.checkInput}
              checked={finalEvolutionOnly}
              onChange={(e) => setFinalEvolutionOnly(e.target.checked)}
            />
            최종진화만
          </label>
        </div>

        <div className={s.historySection}>
          <div className={s.historyHeader}>
            <h3 className={s.historyTitle}>검색 기록</h3>
            {historyEntries.length > 0 ? (
              <button
                type="button"
                className={s.historyClear}
                onClick={clearHistory}
              >
                전체 삭제
              </button>
            ) : null}
          </div>
          {historyEntries.length === 0 ? (
            <p className={s.historyEmpty}>아직 검색 기록이 없습니다.</p>
          ) : (
            <ul className={s.historyList}>
              {historyEntries.map((entry) => (
                <li key={entry.id} className={s.historyItem}>
                  <button
                    type="button"
                    className={s.historyLink}
                    onClick={() => handleHistoryClick(entry)}
                  >
                    {formatSearchHistoryLabel(entry)}
                  </button>
                  <button
                    type="button"
                    className={s.historyRemove}
                    aria-label={`${formatSearchHistoryLabel(entry)} 삭제`}
                    onClick={() => removeHistory(entry.id)}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </>
  );
}
