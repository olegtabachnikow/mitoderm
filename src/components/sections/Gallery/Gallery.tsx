import { FC } from 'react';
import dynamic from 'next/dynamic';
import path from 'path';
import { promises as fs } from 'fs';
import styles from './Gallery.module.scss';
import { getTranslations } from 'next-intl/server';
import GalleryPagination from './GalleryPagination/GalleryPagination';

const env = process.env.NODE_ENV;

const GalleryWrapper = dynamic(
  () => import('@/components/sections/Gallery/GalleryWrapper/GalleryWrapper'),
  {
    ssr: false,
  }
);

const Gallery: FC = async () => {
  const t = await getTranslations('gallery');
  const imageDirectory = path.join(process.cwd(), '/public/images/beforeAfter');
  const imageFilenames = await fs.readdir(imageDirectory);
  let sliderItemsArray: string[] = [];

  let itemList: string[] = [];

  if (env == 'development') {
    sliderItemsArray = imageFilenames.slice(1);
  } else sliderItemsArray = imageFilenames;

  if (sliderItemsArray) itemList = sliderItemsArray;

  return (
    <section id='gallery' className={styles.container}>
      <h2 className={styles.title}>{t('title')}</h2>
      <GalleryWrapper itemList={itemList as string[]} />
      <GalleryPagination count={itemList.length} />
    </section>
  );
};

export default Gallery;
