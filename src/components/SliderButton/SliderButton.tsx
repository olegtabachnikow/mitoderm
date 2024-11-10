import { CSSProperties, FC } from 'react';
import Image from 'next/image';
import styles from './SliderButton.module.css';

interface Props {
  reverced?: boolean;
  addStyles?: CSSProperties;
}

const SliderButton: FC<Props> = ({ reverced, addStyles }) => {
  return (
    <button
      className={styles.button}
      style={{ transform: `rotate(${!reverced ? 0 : 180}deg)`, ...addStyles }}
    >
      <Image
        src='/images/arrowButton.svg'
        width={50}
        height={50}
        alt='arrow icon'
      />
    </button>
  );
};

export default SliderButton;
