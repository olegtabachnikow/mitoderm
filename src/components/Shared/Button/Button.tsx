'use client';
import { CSSProperties, FC } from 'react';
import styles from './Button.module.scss';
import useAppStore from '@/store/store';
import { FormType } from '@/types';

interface Props {
  text: string;
  style?: CSSProperties;
  colored?: boolean;
  submit?: boolean;
  disabled?: boolean;
  contact?: boolean;
  onClick?: () => any;
  formType?: FormType;
}

const Button: FC<Props> = ({
  text,
  style,
  colored,
  submit,
  disabled = false,
  contact,
  onClick,
  formType,
}) => {
  const { toggleModal, setModalContent, setFormCategory } = useAppStore(
    (state) => state
  );

  const openForm = () => {
    setModalContent('form');
    formType && setFormCategory(formType);
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
