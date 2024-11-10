import { CSSProperties, FC } from 'react';
import styles from './ContactButton.module.css';

interface Props {
  text: string;
  style?: CSSProperties;
}

const ContactButton: FC<Props> = ({ text, style }) => {
  return (
    <button style={{ ...style }} className={styles.button}>
      {text}
    </button>
  );
};

export default ContactButton;
