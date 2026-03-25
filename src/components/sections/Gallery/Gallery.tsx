import { FC } from 'react';
import dynamic from 'next/dynamic';
import path from 'path';
import { promises as fs } from 'fs';
import styles from './Gallery.module.scss';
import { getTranslations } from 'next-intl/server';
import GalleryPagination from './GalleryPagination/GalleryPagination';

interface Props {
  isHairPage?: boolean;
  isEventPage?: boolean;
}

const GalleryWrapper = dynamic(
  () => import('@/components/sections/Gallery/GalleryWrapper/GalleryWrapper'),
  {
    ssr: false,
  },
);

const Gallery: FC<Props> = async ({ isHairPage, isEventPage }) => {
  const t = await getTranslations('gallery');
  const imageDirectory = path.join(
    process.cwd(),
    `/public/images/${isEventPage ? 'eventB' : 'b'}eforeAfter`,
  );

  const imageFilenames = await fs.readdir(imageDirectory);
  let sliderItemsArray: string[] = [];

  let itemList: string[] = [];

  sliderItemsArray = imageFilenames.filter((file) => file !== '.DS_Store');

  if (isHairPage)
    sliderItemsArray = sliderItemsArray.filter((file) => file.includes('hair'));

  if (sliderItemsArray) itemList = sliderItemsArray;

  return (
    // <section id="gallery" className={styles.container}>
    //   <h2 className={styles.title}>{t('title')}</h2>
    //   <GalleryWrapper itemList={itemList as string[]} />
    //   <GalleryPagination count={itemList.length} />
    // </section>
    <section
      id="gallery"
      className={`${styles.container} ${isEventPage ? styles.eventPage : ''}`}
    >
      {isEventPage ? (
        <>
          <h2 className={styles.eventTitle}>{t('eventTitle')}</h2>
          <span className={styles.prefixLine} />
        </>
      ) : (
        <h2 className={styles.title}>{t('title')}</h2>
      )}
      <GalleryWrapper
        itemList={itemList as string[]}
        isEventPage={isEventPage}
      />
      <GalleryPagination count={itemList.length} isEventPage={isEventPage} />
    </section>
  );
};

export default Gallery;
