import { FC } from 'react';
import styles from './Navbar.module.css';
import { NavList } from '@/constants';
import NavItem from '../NavItem/NavItem';
import { useTranslations } from 'next-intl';

const Navbar: FC = () => {
  const t = useTranslations();
  return (
    <nav className={styles.navigation}>
      <ul className={styles.list}>
        {NavList.map((item) => (
          <NavItem key={item.text} text={t(item.text)} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
