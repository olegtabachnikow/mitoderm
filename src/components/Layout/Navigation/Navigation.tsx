import { FC } from 'react';
import styles from './Navigation.module.scss';
import { navList } from '@/constants';
import { NavItem } from '@/types';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const Navigation: FC = () => {
  const t = useTranslations();
  return (
    <nav className={styles.navigation}>
      {navList.map((item: NavItem, index: number) => (
        <button key={item.text} className={styles.button}>
          {t(item.text)}
          {index === 0 && (
            <Image
              className={styles.arrowIcon}
              src='/images/arrowDown.svg'
              width={10}
              height={5.5}
              alt='arrow icon'
            />
          )}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
