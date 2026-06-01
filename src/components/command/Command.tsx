import React from 'react';
import s from './command.module.scss';

const Command = ({command}: {command: string}) => {
  return (
    <div className={s.command}>
      {command}
    </div>
  );
};

export default Command;