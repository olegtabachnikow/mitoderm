'use client';
import { FC, useEffect } from 'react';
import ArrowButton from '@/components/Shared/ArrowButton/ArrowButton';
import styles from './GalleryItem.module.scss';
import { useTranslations } from 'next-intl';
import useAppStore from '@/store/store';
import { useMediaQuery } from 'react-responsive';
import MobileButtons from '@/components/Shared/MobileButtons/MobileButtons';

interface Props {
  itemList: Array<[string, string]>;
}

const GalleryItem: FC<Props> = ({ itemList }) => {
  const t = useTranslations();
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 1224px)',
  });
  const { galleryPage, setGalleryPage, isFirstRender, setIsFirstRender } =
    useAppStore((state) => state);

  useEffect(() => {
    if (isFirstRender) {
      return;
    }
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
    setIsFirstRender(false);
    setGalleryPage(galleryPage + 1);
  };
  const decrement = () => {
    setIsFirstRender(false);
    setGalleryPage(galleryPage - 1);
  };
  return (
    <div className={styles.container}>
      {!isTabletOrMobile ? (
        <ArrowButton
          disabled={galleryPage === 0}
          reversed
          colored
          onClick={decrement}
        />
      ) : null}
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
              {isTabletOrMobile ? (
                <div className={styles.itemLabel}>
                  <span className={styles.roundLabel}>&</span>
                  <span className={styles.label}>{t('gallery.before')}</span>
                  <span className={styles.label}>{t('gallery.after')}</span>
                </div>
              ) : null}
            </div>
          ))}
        </div>
        {isTabletOrMobile ? null : (
          <div className={styles.itemLabel}>
            <span className={styles.roundLabel}>&</span>
            <span className={styles.label}>{t('gallery.before')}</span>
            <span className={styles.label}>{t('gallery.after')}</span>
          </div>
        )}
      </div>
      {!isTabletOrMobile ? (
        <ArrowButton
          disabled={galleryPage === itemList.length - 1}
          colored
          onClick={increment}
        />
      ) : null}
      {isTabletOrMobile ? (
        <div className={styles.mobileButtinContainer}>
          <MobileButtons
            disabledLeft={galleryPage === 0}
            disabledRight={galleryPage === itemList.length - 1}
            onClickLeft={decrement}
            onClickRight={increment}
          />{' '}
        </div>
      ) : null}
    </div>
  );
};

export default GalleryItem;
