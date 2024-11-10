import { FC } from 'react';
import styles from './Header.module.css';
import Image from 'next/image';
import Navbar from '../Navbar/Navbar';
import LanguageSwitch from '../LanguageSwitch/LanguageSwitch';

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src='/images/logo.svg'
            alt='MitoDerm logo'
            width={80}
            height={80}
            priority
          />
          <span className={styles.logoText}>MitoDerm</span>
        </div>
        <Navbar />
        <LanguageSwitch />
      </div>
    </header>
  );
};

export default Header;
