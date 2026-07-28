'use client';

import { usePochampsStore } from '@/store/PochampsStore';
import s from './switch.module.scss';

export default function Switch() {
  const enabled = usePochampsStore((state) => state.enabled);
  const hasHydrated = usePochampsStore((state) => state.hasHydrated);
  const toggle = usePochampsStore((state) => state.toggle);

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
    </div>
  );
}
