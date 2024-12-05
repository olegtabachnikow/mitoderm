'use client';
import { FC, useEffect } from 'react';
import ArrowButton from '@/components/Shared/ArrowButton/ArrowButton';
import styles from './GalleryItem.module.scss';
import { useTranslations } from 'next-intl';
import useAppStore from '@/store/store';

interface Props {
  itemList: Array<[string, string]>;
}

const GalleryItem: FC<Props> = ({ itemList }) => {
  const t = useTranslations();
  const { galleryPage, setGalleryPage } = useAppStore((state) => state);

  useEffect(() => {
    const element = document.getElementById(`item${galleryPage}`);
    if (galleryPage >= itemList.length) setGalleryPage(0);
    if (galleryPage < 0) setGalleryPage(itemList.length - 1);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [galleryPage]);

  const increment = () => {
    setGalleryPage(galleryPage + 1);
  };
  const decrement = () => {
    setGalleryPage(galleryPage - 1);
  };
  return (
    <div className={styles.container}>
      <ArrowButton reversed colored onClick={decrement} />
      <div className={styles.itemWrapper}>
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
        <div className={styles.itemLabel}>
          <span className={styles.roundLabel}>&</span>
          <span className={styles.label}>{t('gallery.before')}</span>
          <span className={styles.label}>{t('gallery.after')}</span>
        </div>
      </div>
      <ArrowButton colored onClick={increment} />
    </div>
  );
};

export default GalleryItem;
