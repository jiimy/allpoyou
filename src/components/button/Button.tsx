import React from 'react';
import classnames from 'classnames';
import s from './button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'tertiary';
  loading?: boolean;
  active?: boolean;
};

const Button = ({ children, onClick, className, disabled, type, size, variant, loading }: ButtonProps) => {
  return (
    <button className={classnames('button', className)} disabled={disabled} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

const FilterButton = ({ children, onClick, className, style, disabled, type, size, variant, loading, active }: ButtonProps) => {
  return (
    <button className={classnames(s.filterBtn, className, { [s.filterBtnActive]: active })} style={style} disabled={disabled} type={type} onClick={onClick}>
      {children}
    </button>
  );
};


export { Button, FilterButton };
