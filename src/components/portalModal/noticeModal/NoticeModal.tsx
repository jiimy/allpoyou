'use client';

import { useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';

import ModalFrame from '@/components/portalModal/ModalFrame';
import { useNoticeModalStore } from '@/store/NoticeModalStore';
import {
  clearNoticeDismiss,
  dismissNotice,
  isNoticeDismissed,
  subscribeNoticeDismiss,
} from '@/utils/noticeModalStorage';

import s from './noticeModal.module.scss';

/**
 * 현재 업데이트 공지 버전.
 * 새 업데이트마다 이 값과 안내 문구를 함께 수정하세요.
 * "다음 업데이트 전까지 보지 않기"는 이 버전 기준으로 숨깁니다.
 */
const CURRENT_UPDATE_VERSION = '2026-08-03';

const NoticeModal = () => {
  const pathname = usePathname() ?? '';
  const storeOpen = useNoticeModalStore((state) => state.isOpen);
  const setStoreOpen = useNoticeModalStore((state) => state.setIsOpen);

  const storedDismissed = useSyncExternalStore(
    subscribeNoticeDismiss,
    () => isNoticeDismissed(CURRENT_UPDATE_VERSION),
    () => true,
  );

  const [closedPath, setClosedPath] = useState<string | null>(null);
  const [hideUntilNextUpdate, setHideUntilNextUpdate] = useState(false);
  const [checkboxReady, setCheckboxReady] = useState(false);

  const autoOpen = !storedDismissed && closedPath !== pathname;
  const open = storeOpen || autoOpen;

  if (open && !checkboxReady) {
    setHideUntilNextUpdate(storedDismissed);
    setCheckboxReady(true);
  } else if (!open && checkboxReady) {
    setCheckboxReady(false);
  }

  const handleModalChange: React.Dispatch<React.SetStateAction<boolean>> = (
    value,
  ) => {
    const next = typeof value === 'function' ? value(true) : value;
    if (next) {
      setStoreOpen(true);
      return;
    }

    if (hideUntilNextUpdate) {
      dismissNotice(CURRENT_UPDATE_VERSION);
    } else {
      clearNoticeDismiss();
    }

    setClosedPath(pathname);
    setStoreOpen(false);
  };

  if (!open) return null;

  return (
    <ModalFrame
      setOnModal={handleModalChange}
      isDim
      onClose
      dimClick
      className={s.noticeModal}
    >
      <div className={s.content}>
        <h2 className={s.title}>업데이트 안내</h2>
        <ul className={s.list}>
          <li className={s.item}>
            타입 상성 추천의 n번째 포켓몬 선택의 각 항목에서 바로 팀에서 제거하는 기능 추가. 
            <span className={s.subText}>
              - 위로 올라가지 않고도 팀에서 포켓몬 제거 가능.
            </span>
          </li>
          <li className={s.item}>
            타입 상성 추천시 현재 포켓몬이 아닌 파티 전체의 타입으로도 추천할수있게 추가.
            <span className={s.subText}>
              - (물라오스 - 팬텀 - 오롱털 일때 상성 타입이 땅, 불꽃뿐이라 포켓몬 추천 번위가 좁아 파티 전체까지 확장할수있게)
            </span>
          </li>
          <li className={s.item}>
            타입 상성표에서 공격 상성 추가
          </li>
        </ul>
        <details>
          <summary>지난 업데이트 내역</summary>
          <ul className={s.list}>
            <li className={s.item}>
              26.07.29 - 포챔스 배울 수 있는 기술 반영
              <span className={s.subText}>
                - &quot;기술&quot; 페이지에서 포챔스 기준으로 기술을 검색하고 배울수있는 기술을 검색할 수 있습니다.
              </span>
            </li>
            <li className={s.item}>
              26.07.27 - 포챔스 랭킹 데이터 반영
            </li>
            <li className={s.item}>
              26.07.22 - 포챔스 데이터 팀에 추가 기능 추가
              <span className={s.subText}>
                - 포챔스 데이터 검색 후 상세 스탯을 선택후 팀에 추가 기능 추가.
              </span>
            </li>
            <li className={s.item}>
              26.07.20 - 우측 상단에 포챔스데이터를 가져오는 기능 추가.
              <span className={s.subText}>
                - 메인메뉴에서 포켓몬 이름 검색시 포챔스 데이터 기준으로              배틀데이터 제공
              </span>
            </li>
          </ul>
        </details>
        <div className={s.footer}>
          <label className={s.checkbox}>
            <input
              type="checkbox"
              className={s.checkboxInput}
              checked={hideUntilNextUpdate}
              onChange={(event) =>
                setHideUntilNextUpdate(event.target.checked)
              }
            />
            <span>다음 업데이트 전까지 보지 않기</span>
          </label>
        </div>
      </div>
    </ModalFrame>
  );
};

export default NoticeModal;
