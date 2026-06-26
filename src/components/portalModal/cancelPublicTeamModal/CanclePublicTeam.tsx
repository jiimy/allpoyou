'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import {
  unpublishPublicTeam,
  type PublicTeam,
} from '@/app/public-teams/actions';
import ModalFrame from '@/components/portalModal/ModalFrame';
import type { ChildrenModalType } from '@/types/modal';

import s from './cancelPublicTeamModal.module.scss';

type CanclePublicTeamProps = ChildrenModalType & {
  team: PublicTeam;
  onDismiss: () => void;
  onUnpublished: (teamId: string) => void;
};

const CanclePublicTeam = ({
  setOnModal,
  dimClick,
  isDim = true,
  className,
  team,
  onDismiss,
  onUnpublished,
}: CanclePublicTeamProps) => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const teamTitle = team.teamName || '저장된 팀';

  const handleModalChange: React.Dispatch<React.SetStateAction<boolean>> = (
    value,
  ) => {
    const next = typeof value === 'function' ? value(true) : value;
    if (!next) onDismiss();
    setOnModal(value);
  };

  const handleConfirm = () => {
    setError(null);
    startTransition(async () => {
      const result = await unpublishPublicTeam(team.id);

      if ('error' in result) {
        setError(result.error);
        return;
      }

      onUnpublished(team.id);
      router.refresh();
      onDismiss();
    });
  };

  return (
    <ModalFrame
      setOnModal={handleModalChange}
      isDim={dimClick || isDim}
      onClose
      dimClick={dimClick}
      className={classNames(s.modal, className)}
    >
      <div className={s.content}>
        <h2 className={s.title}>이 팀을 비공개로 변경하시겠습니까?</h2>
        <p className={s.description}>
          &quot;{teamTitle}&quot; 팀이 비공개됩니다.
        </p>
        {error ? (
          <p className={s.error} role="alert">
            {error}
          </p>
        ) : null}
        <div className={s.actions}>
          <button
            type="button"
            className={s.confirmBtn}
            disabled={isPending}
            onClick={handleConfirm}
          >
            예
          </button>
          <button
            type="button"
            className={s.cancelBtn}
            disabled={isPending}
            onClick={onDismiss}
          >
            아니오
          </button>
        </div>
      </div>
    </ModalFrame>
  );
};

export default CanclePublicTeam;
