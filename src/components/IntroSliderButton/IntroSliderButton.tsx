import { FC } from 'react';
import Image from 'next/image';
import styles from './IntroSliderButton.module.css';

interface Props {
  reverced?: boolean;
}

const IntroSliderButton: FC<Props> = ({ reverced }) => {
  return (
    <button
      className={styles.button}
      style={{ transform: `rotate(${!reverced ? 0 : 180}deg)` }}
    >
      <Image
        src='/images/arrowButton.svg'
        width={60}
        height={60}
        alt='arrow icon'
      />
    </button>
  );
};

export default IntroSliderButton;
