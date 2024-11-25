import { FC } from 'react';
import styles from './ArrowButton.module.scss';
import Image from 'next/image';

interface Props {
  reversed?: boolean;
}

const ArrowButton: FC<Props> = ({ reversed }) => {
  return (
    <button
      className={styles.button}
      style={reversed ? { transform: 'rotate(180deg)' } : {}}
    >
      <Image
        className={styles.image}
        src='/images/arrowRight.svg'
        width={40}
        height={40}
        alt='arrow button'
      />
    </button>
  );
};

export default ArrowButton;
