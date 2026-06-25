'use client';

import React, { useState } from 'react';

import TypePicker from './TypePicker';
import TypeResult from './TypeResult';

const TypeSelect = () => {
  const [select, setSelect] = useState<string[]>([]);

  return (
    <>
      <TypePicker selected={select} onChange={setSelect} maxSelection={2} />
      {select.length > 0 ? <TypeResult mode="defense" select={select} /> : null}
    </>
  );
};

export default TypeSelect;
