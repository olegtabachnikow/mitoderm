import { FC } from 'react';
import path from 'path';
import { promises as fs } from 'fs';
import styles from './Gallery.module.scss';
import GalleryWrapper from './GalleryWrapper/GalleryWrapper';
import { getTranslations } from 'next-intl/server';
import GalleryPagination from './GalleryPagination/GalleryPagination';

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
    <section id='gallery' className={styles.container}>
      <h2 className={styles.title}>{t('title')}</h2>
      <GalleryWrapper itemList={itemList} />
      <GalleryPagination count={itemList.length} />
    </section>
  );
};

export default Gallery;
