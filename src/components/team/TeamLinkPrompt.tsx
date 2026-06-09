'use client';

import ModalFrame from '@/components/portalModal/ModalFrame';
import s from '@/app/make-team/maekTeam.module.scss';

type TeamLinkPromptProps = {
  open: boolean;
  resolving: boolean;
  onConfirm: () => void;
  onDecline: () => void;
};

export function TeamLinkPrompt({
  open,
  resolving,
  onConfirm,
  onDecline,
}: TeamLinkPromptProps) {
  if (!open) return null;

  return (
    <ModalFrame
      setOnModal={() => {}}
      isDim
      dimClick={false}
      className={s.teamLinkPrompt}
    >
      <p className={s.teamLinkPromptMessage}>
        로컬에 있는 데이터를 계정에 연동하시겠습니까?
      </p>
      <p className={s.teamLinkPromptHint}>
        연동해도 기존 로컬 데이터는 그대로 유지됩니다. 로그인 중에는 팀
        수정 내용이 로컬에 저장되지 않고 계정 DB에만 저장됩니다.
      </p>
      <div className={s.teamLinkPromptActions}>
        <button
          type="button"
          className={s.teamLinkPromptButtonSecondary}
          disabled={resolving}
          onClick={onDecline}
        >
          아니오
        </button>
        <button
          type="button"
          className={s.teamLinkPromptButtonPrimary}
          disabled={resolving}
          onClick={onConfirm}
        >
          {resolving ? '처리 중…' : '예'}
        </button>
      </div>
    </ModalFrame>
  );
}
