'use client';
import { FC } from 'react';
import styles from './Navigation.module.scss';
import { navList } from '@/constants';
import { NavItem } from '@/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import useAppStore from '@/store/store';

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: FC<Props> = ({ isOpen, setIsOpen }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const { toggleModal, setModalContent } = useAppStore((state) => state);

  const randomString = () => (Math.random() + 1).toString(36).substring(7);

  const openForm = () => {
    setModalContent('form');
    toggleModal(true);
  };
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

  const handleClick = () => {
    setIsOpen(false);
    openForm();
  };

  return (
    <>
      {isTabletOrMobile ? (
        <nav
          className={`${styles.mobileNavigation} ${isOpen && styles.active}`}
        >
          {navList.map((item: NavItem, index: number) => (
            <div
              className={styles.linkContainerMobile}
              key={`item${index + Math.random()}`}
            >
              {item.scrollId ? (
                <Link
                  onClick={() => setIsOpen(false)}
                  href={`#${item.scrollId}`}
                  key={index + randomString()}
                  className={styles.buttonMobile}
                >
                  {t(item.text)}
                  {putImage(index)}
                </Link>
              ) : (
                <button
                  onClick={handleClick}
                  key={index + randomString()}
                  className={styles.buttonMobile}
                >
                  {t(item.text)}
                  {putImage(index)}
                </button>
              )}
            </div>
          ))}
        </nav>
      ) : (
        <nav className={styles.navigation}>
          {navList.map((item: NavItem, index: number) => (
            <div
              className={styles.linkContainer}
              key={`item${index + Math.random()}`}
            >
              {item.scrollId ? (
                <Link
                  href={`#${item.scrollId}`}
                  key={index + randomString()}
                  className={styles.button}
                >
                  {t(item.text)}
                  {putImage(index)}
                </Link>
              ) : (
                <button
                  onClick={handleClick}
                  key={index + randomString()}
                  className={styles.button}
                >
                  {t(item.text)}
                  {putImage(index)}
                </button>
              )}
            </div>
          ))}
        </nav>
      )}
    </>
  );
};

export default Navigation;
