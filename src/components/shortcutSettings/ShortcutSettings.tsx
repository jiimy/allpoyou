'use client';

import { useEffect, useState } from 'react';

import { useShortcutStore } from '@/store/ShortcutStore';
import {
  DEFAULT_SHORTCUTS,
  eventToShortcutBinding,
  findShortcutConflict,
  formatShortcut,
  SHORTCUT_DEFS,
  type ShortcutId,
} from '@/utils/shortcuts';

import s from '@/app/my-info/myInfo.module.scss';

type ListeningState = {
  id: ShortcutId;
  error: string | null;
};

export default function ShortcutSettings() {
  const bindings = useShortcutStore((state) => state.bindings);
  const setBinding = useShortcutStore((state) => state.setBinding);
  const resetBinding = useShortcutStore((state) => state.resetBinding);
  const resetAll = useShortcutStore((state) => state.resetAll);
  const hasHydrated = useShortcutStore((state) => state.hasHydrated);

  const [listening, setListening] = useState<ListeningState | null>(null);

  useEffect(() => {
    if (!listening) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setListening(null);
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      const binding = eventToShortcutBinding(event);
      if (!binding) {
        setListening({
          id: listening.id,
          error:
            'Shift / Ctrl / Alt 중 하나와 함께 일반 키를 눌러 주세요. (예: Shift+S)',
        });
        return;
      }

      const conflict = findShortcutConflict(bindings, listening.id, binding);
      if (conflict) {
        const label =
          SHORTCUT_DEFS.find((d) => d.id === conflict)?.label ?? conflict;
        setListening({
          id: listening.id,
          error: `이미 「${label}」에 설정된 조합입니다.`,
        });
        return;
      }

      setBinding(listening.id, binding);
      setListening(null);
    };

    window.addEventListener('keydown', onKeyDown, true);
    return () => window.removeEventListener('keydown', onKeyDown, true);
  }, [bindings, listening, setBinding]);

  if (!hasHydrated) {
    return <p className={s.placeholder}>단축키 설정을 불러오는 중…</p>;
  }

  const navDefs = SHORTCUT_DEFS.filter((d) => d.group === 'nav');
  const modalDefs = SHORTCUT_DEFS.filter((d) => d.group === 'modal');

  const renderRows = (defs: typeof SHORTCUT_DEFS) =>
    defs.map((def) => {
      const binding = bindings[def.id];
      const isListening = listening?.id === def.id;
      const isDefault =
        formatShortcut(binding) === formatShortcut(DEFAULT_SHORTCUTS[def.id]);

      return (
        <div key={def.id} className={s.shortcutRow}>
          <div className={s.shortcutLabel}>{def.label}</div>
          <button
            type="button"
            className={`${s.shortcutKeyBtn} ${isListening ? s.shortcutKeyBtnListening : ''}`}
            onClick={() =>
              setListening(
                isListening ? null : { id: def.id, error: null },
              )
            }
          >
            {isListening
              ? '키 입력 대기… (Esc 취소)'
              : formatShortcut(binding) || '\u00a0'}
          </button>
          <button
            type="button"
            className={s.shortcutResetBtn}
            disabled={isDefault}
            onClick={() => resetBinding(def.id)}
          >
            초기화
          </button>
        </div>
      );
    });

  return (
    <div className={s.shortcutPanel}>
      <p className={s.shortcutHint}>
        버튼을 누른 뒤 <strong>Shift / Ctrl / Alt + 키</strong>로 설정합니다.
        일반 키만으로는 설정할 수 없습니다. 브라우저에만 저장됩니다.
      </p>

      {listening?.error ? (
        <p className={s.formError}>{listening.error}</p>
      ) : null}

      <div className={s.shortcutGroupTitle}>페이지 이동</div>
      <div className={s.shortcutList}>{renderRows(navDefs)}</div>

      <div className={s.shortcutGroupTitle}>모달 토글</div>
      <div className={s.shortcutList}>{renderRows(modalDefs)}</div>

      <button type="button" className={s.shortcutResetAll} onClick={resetAll}>
        모두 기본값으로
      </button>
    </div>
  );
}
