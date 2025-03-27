"use client";
export const dynamic = "force-dynamic";

import axios from "axios";
import React, { useEffect, useState } from "react";
import ModalFrame from "../ModalFrame";
import { ExportModalType } from "@/types/modal";
import ListSearch from "@/components/List/ListSearch";

type downloadModalType = ExportModalType & {
  link: string;
}

const DownloadModal = ({
  setOnModal,
  dimClick,
  isDim = true,
  className,
  onClose,
  link
}: downloadModalType) => {

  return (
    <ModalFrame
      setOnModal={setOnModal}
      isDim={isDim}
      onClose
      dimClick={dimClick}
      className={className}
    >
      <ListSearch link={link} />
    </ModalFrame>
  );
};

export default DownloadModal;
