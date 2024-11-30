'use client';
import { FC, useEffect } from 'react';
import styles from './Modal.module.scss';
import Form from '@/components/Form/Form';
import useAppStore from '@/store/store';

const Modal: FC = () => {
  const { modalIsOpen, toggleModal } = useAppStore((state) => state);
  const handleClose = (e: MouseEvent) => {
    const { target } = e;
    console.log(target);
    if ((target as HTMLDivElement).id === 'modal') toggleModal(false);
  };

  useEffect(() => {
    modalIsOpen
      ? window.addEventListener('click', handleClose)
      : window.removeEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, [modalIsOpen]);

  return (
    <div className={styles.container}>
      <div
        id='modal'
        className={`${styles.overlay} ${modalIsOpen ? styles.active : ''}`}
      />
      <div
        className={`${styles.content} ${
          modalIsOpen ? styles.contentActive : ''
        }`}
      >
        {modalIsOpen ? <Form /> : null}
      </div>
    </div>
  );
};

export default Modal;
