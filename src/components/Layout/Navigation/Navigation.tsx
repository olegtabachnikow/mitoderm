'use client';
import { FC } from 'react';
import styles from './Navigation.module.scss';
import { navList } from '@/constants';
import { NavItem } from '@/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

interface Props {
  isOpen: boolean;
}

const Navigation: FC<Props> = ({ isOpen }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const t = useTranslations();

  const putImage = (index: number) => {
    if (index === 0)
      return (
        <Image
          className={styles.arrowIcon}
          src='/images/arrowDown.svg'
          width={10}
          height={5.5}
          alt='arrow icon'
        />
      );
  };

  return (
    <>
      {isTabletOrMobile ? (
        <>
          <nav
            className={`${styles.mobileNavigation} ${isOpen && styles.active}`}
          >
            {navList.map((item: NavItem, index: number) => (
              <button key={index} className={styles.buttonMobile}>
                {t(item.text)}
                {putImage(index)}
              </button>
            ))}
          </nav>
        </>
      ) : (
        <nav className={styles.navigation}>
          {navList.map((item: NavItem, index: number) => (
            <button key={index} className={styles.button}>
              {t(item.text)}
              {putImage(index)}
            </button>
          ))}
        </nav>
      )}
    </>
  );
};

export default Navigation;
