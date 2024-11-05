import { FC } from 'react';
import styles from './NavItem.module.css';

interface Props {
  text: string;
}

const NavItem: FC<Props> = ({ text }) => {
  return (
    <li>
      <button className={styles.button}>
        <span className={styles.text}>{text}</span>
      </button>
    </li>
  );
};

export default NavItem;
