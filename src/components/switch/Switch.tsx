'use client';

import {
  usePochampsStore,
  type PochampsBattleFormat,
} from '@/store/PochampsStore';
import s from './switch.module.scss';

const FORMATS: PochampsBattleFormat[] = ['Singles', 'Doubles'];

export default function Switch() {
  const enabled = usePochampsStore((state) => state.enabled);
  const format = usePochampsStore((state) => state.format);
  const hasHydrated = usePochampsStore((state) => state.hasHydrated);
  const toggle = usePochampsStore((state) => state.toggle);
  const setFormat = usePochampsStore((state) => state.setFormat);

  // localStorage 복원 전에는 OFF로 그려 SSR 불일치를 피함
  const isOn = hasHydrated && enabled;

  return (
    <div className={s.switch}>
      <div className={s.row}>
        <span className={s.label} id="pochamps-switch-label">
          포챔스데이터
        </span>
        <button
          type="button"
          className={`${s.track} ${isOn ? s.trackOn : ''}`}
          role="switch"
          aria-checked={isOn}
          aria-labelledby="pochamps-switch-label"
          onClick={toggle}
        >
          <span className={s.thumb} aria-hidden />
        </button>
      </div>

      {isOn ? (
        <div className={s.formatRow} role="group" aria-label="배틀 포맷">
          {FORMATS.map((item) => (
            <button
              key={item}
              type="button"
              className={`${s.formatBtn} ${format === item ? s.formatBtnActive : ''}`}
              aria-pressed={format === item}
              onClick={() => setFormat(item)}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
