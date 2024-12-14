'use client';
import { CSSProperties, FC } from 'react';
import styles from './Button.module.scss';
import useAppStore from '@/store/store';

interface Props {
  text: string;
  style?: CSSProperties;
  colored?: boolean;
  submit?: boolean;
  disabled?: boolean;
  contact?: boolean;
  onClick?: () => any;
}

const Button: FC<Props> = ({
  text,
  style,
  colored,
  submit,
  disabled = false,
  contact,
  onClick,
}) => {
  const { toggleModal, setModalContent } = useAppStore((state) => state);

  const openForm = () => {
    setModalContent('form');
    toggleModal(true);
  };

  const handleClick = () => {
    contact ? openForm() : onClick ? onClick() : null;
  };

  return (
    <button
      type={submit ? 'submit' : 'button'}
      style={style}
      onClick={handleClick}
      disabled={disabled}
      className={`${colored ? styles.buttonColored : styles.button} ${
        disabled ? styles.disabled : ''
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
