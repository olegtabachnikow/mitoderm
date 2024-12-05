import { FC } from 'react';
import path from 'path';
import { promises as fs } from 'fs';
import styles from './Gallery.module.scss';
import GalleryItem from './GalleryItem/GalleryItem';
import { getTranslations } from 'next-intl/server';
import DotPagination from '../Shared/DotPagination/DotPagination';

const Gallery: FC = async () => {
  const t = await getTranslations('gallery');
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
      <h2 className={styles.title}>{t('title')}</h2>
      <GalleryItem itemList={itemList} />
      <div className={styles.paginationBox}>
        <DotPagination colored count={itemList.length} />
      </div>
    </div>
  );
};

export default Gallery;
