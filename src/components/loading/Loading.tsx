import React from 'react';
import s from './loading.module.scss';

const Loading = () => {
  return (
    <div className={s.wrap}>
      <div className={s.loading}>
        <div className={s.square}></div>
      </div>
    </div>
  );
};

export default Loading;