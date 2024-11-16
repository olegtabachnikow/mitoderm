import { FC } from 'react';
import path from 'path';
import { promises as fs } from 'fs';
import styles from './BeforeAfterSlider.module.css';
import BeforeAfterImageBox from '../BeforeAfterImageBox/BeforeAfterImageBox';

const BeforeAfterSlider: FC = async () => {
  const imageDirectory = path.join(
    process.cwd(),
    '/public/images/beforeAfterExamples'
  );
  const imageFilenames = await fs.readdir(imageDirectory);
  const itemList: Array<[string, string]> = [];
  const sliderItemsArray = imageFilenames.slice(1);
  if (sliderItemsArray)
    for (let i = 0; i < sliderItemsArray.length; i += 2) {
      itemList.push(sliderItemsArray.slice(i, i + 2) as any);
    }

  return (
    <div className={styles.container}>
      <BeforeAfterImageBox itemList={itemList} />
    </div>
  );
};

export default BeforeAfterSlider;
