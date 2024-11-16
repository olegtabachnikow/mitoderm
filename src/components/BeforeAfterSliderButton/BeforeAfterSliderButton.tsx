import { FC, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import styles from './BeforeAfterSliderButton.module.css';

interface BeforeAfterSliderButtonProps {
  reversed?: boolean;
  currentItem: number;
  setCurrentItem: Dispatch<SetStateAction<number>>;
}

const BeforeAfterSliderButton: FC<BeforeAfterSliderButtonProps> = ({
  reversed,
  currentItem,
  setCurrentItem,
}) => {
  return (
    <button
      className={styles.button}
      onClick={() => {
        setCurrentItem(reversed ? ++currentItem : --currentItem);
        console.log(currentItem);
      }}
    >
      <Image
        src={`/images/arrowIcon${reversed ? 'Right' : 'Left'}.svg`}
        alt='arrow'
        width={50}
        height={55}
      />
    </button>
  );
};

export default BeforeAfterSliderButton;
