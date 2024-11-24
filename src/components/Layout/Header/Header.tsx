import { FC } from 'react';
import styles from './Header.module.scss';
import Image from 'next/image';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';
import Navigation from '../Navigation/Navigation';

const Header: FC = () => {
  return (
    <header className={styles.header}>
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
        <Navigation />
        <LanguageSwitch />
      </div>
    </header>
  );
};

export default Header;
