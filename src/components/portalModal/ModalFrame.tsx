import React from "react";
import ModalPortal from "./PortalModal";
import classNames from 'classnames';
import s from './modal.module.scss';
import { Close } from "../images";

type modalFrameType = {
  children: React.ReactNode;
  setOnModal: React.Dispatch<React.SetStateAction<boolean>>,
  onClose?: boolean;
  isDim?: boolean;
  zindex?: number;
  dimClick?: boolean;
  modalType?: 'modal' | 'page';
  onClick?: () => void;
  className?: string
}

const ModalFrame = ({
  children,
  setOnModal,
  onClose,
  isDim,
  zindex,
  dimClick,
  modalType = 'modal',
  onClick,
  className
}: modalFrameType) => {
  return (
    <ModalPortal setOnModal={setOnModal}>
      <div
        className={classNames(s.modal, modalType === 'page' && s.page)}
        onClick={onClick}
        style={zindex ? { zIndex: zindex } : undefined}
      >
        {isDim && (
          <div
            className={s.dim}
            onClick={(e) => {
              e.stopPropagation(); 
              if (dimClick) setOnModal(false);
            }}
          />
        )}

        <div className={s.modal_container}>
          <div className={`${className} ${s.modal_content}`}>
            {children}
            {onClose && (
              <div className={s.close} onClick={() => setOnModal(false)}>
                <Close fill="#8C8C8C" />
              </div>
            )}
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ModalFrame;