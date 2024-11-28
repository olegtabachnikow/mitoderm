import { CSSProperties, FC } from 'react';
import styles from './Button.module.scss';

interface Props {
  text: string;
  onClick?: () => void;
  style?: CSSProperties;
  colored?: boolean;
  submit?: boolean;
}

const Button: FC<Props> = ({ text, onClick, style, colored, submit }) => {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      style={style}
      onClick={onClick}
      className={colored ? styles.buttonColored : styles.button}
    >
      {text}
    </button>
  );
};

export default Button;
