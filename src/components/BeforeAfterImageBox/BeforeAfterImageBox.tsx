'use client';
import { FC, useEffect, useState } from 'react';
import BeforeAfterSliderButton from '../BeforeAfterSliderButton/BeforeAfterSliderButton';
import styles from './BeforeAfterImageBox.module.css';

interface Props {
  itemList: Array<[string, string]>;
}

const BeforeAfterImageBox: FC<Props> = ({ itemList }) => {
  const [currentItem, setCurrentItem] = useState<number>(0);
  useEffect(() => {
    const element = document.getElementById(`item${currentItem}`);
    if (currentItem >= itemList.length) setCurrentItem(0);
    if (currentItem < 0) setCurrentItem(itemList.length - 1);
    element?.scrollIntoView({
      behavior: 'smooth',
    });
  }, [currentItem]);

  return (
    <>
      <BeforeAfterSliderButton
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
      />
      <div className={styles.imageBox}>
        {itemList.map((item, i) => (
          <div id={`item${i}`} className={styles.item} key={`key${i}`}>
            <img
              className={styles.image}
              src={`/images/beforeAfterExamples/${item[0]}`}
              alt='before usage exoxo'
            />
            <img
              className={styles.image}
              src={`/images/beforeAfterExamples/${item[1]}`}
              alt='result after usage exoxo'
            />
          </div>
        ))}
      </div>
      <BeforeAfterSliderButton
        reversed
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
      />
    </>
  );
};

export default BeforeAfterImageBox;
