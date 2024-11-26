'use client';
import { FC, useState } from 'react';
import styles from './BurgerButton.module.scss';

interface Props {}

const BurgerButton: FC<Props> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <button
      onClick={() => setIsOpen((state) => !state)}
      className={`${styles.button} ${isOpen ? styles.active : ''}`}
    >
      <div className={`${styles.line} ${styles.line1}`} />
      <div className={`${styles.line} ${styles.line2}`} />
      <div className={`${styles.line} ${styles.line3}`} />
    </button>
  );
};

export default BurgerButton;
