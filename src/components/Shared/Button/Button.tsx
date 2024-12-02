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
}

const Button: FC<Props> = ({
  text,
  style,
  colored,
  submit,
  disabled = false,
  contact,
}) => {
  const toggleModal = useAppStore((state) => state.toggleModal);
  const handleClick = () => {
    contact ? toggleModal(true) : null;
  };

  return (
    <button
      type={submit ? 'submit' : 'button'}
      style={style}
      onClick={handleClick}
      disabled={disabled}
      className={colored ? styles.buttonColored : styles.button}
    >
      {text}
    </button>
  );
};

export default Button;
