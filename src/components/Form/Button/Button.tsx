import React, { FC } from 'react';

import style from 'components/Form/Button/Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ children, disabled, onClick }) => {
  const onClickButton: () => void = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={onClickButton}
      className={style.button}
      type="submit"
      disabled={disabled}
    >
      {children}
    </button>
  );
};
