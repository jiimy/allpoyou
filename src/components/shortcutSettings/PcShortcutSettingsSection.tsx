'use client';

import ShortcutSettings from '@/components/shortcutSettings/ShortcutSettings';
import { useMobile } from '@/hooks/useMobile';
import s from '@/app/my-info/myInfo.module.scss';

type PcShortcutSettingsSectionProps = {
  /** 로그인 카드 안 section 스타일 사용 여부 */
  asSection?: boolean;
};

/** PC(≥768px)에서만 단축키 설정 UI를 표시합니다. */
export default function PcShortcutSettingsSection({
  asSection = true,
}: PcShortcutSettingsSectionProps) {
  const isMobile = useMobile();

  if (isMobile) return null;

  if (!asSection) {
    return (
      <div className={s.card} style={{ marginTop: 24 }}>
        <div className={s.sectionTitle}>단축키 설정</div>
        <ShortcutSettings />
      </div>
    );
  }

  return (
    <div className={s.section}>
      <div className={s.sectionTitle}>단축키 설정</div>
      <ShortcutSettings />
    </div>
  );
}
