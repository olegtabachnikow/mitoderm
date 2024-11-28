'use client';
import { FC, useEffect, useState } from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import Navigation from '../Navigation/Navigation';
import { useMediaQuery } from 'react-responsive';
import BurgerButton from '@/components/Shared/BurgerButton/BurgerButton';

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const handleClose = (e: MouseEvent) => {
    const { target } = e;
    if ((target as HTMLDivElement).id === 'overlay') setIsOpen(false);
  };

  useEffect(() => {
    isOpen
      ? window.addEventListener('click', handleClose)
      : window.removeEventListener('click', handleClose);
    return () => window.removeEventListener('click', handleClose);
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <div
        className={`${styles.overlay} ${isOpen ? styles.active : ''}`}
        id='overlay'
      />
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image
            src='/images/logo.svg'
            width={40}
            height={37}
            quality={100}
            alt='mitoderm logo'
          />
          <span className={styles.logoText}>MitoDerm</span>
        </div>
        <Navigation isOpen={isOpen} />
        <LanguageSwitch />
        {isTabletOrMobile && (
          <BurgerButton isOpen={isOpen} setIsOpen={setIsOpen} />
        )}
      </div>
    </header>
  );
};

export default Header;
