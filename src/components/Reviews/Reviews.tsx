'use client';
import { FC, useEffect } from 'react';
import styles from './Reviews.module.scss';
import { useTranslations } from 'next-intl';
import ArrowButton from '../Shared/ArrowButton/ArrowButton';
import { reviews as items } from '@/constants';
import { ReviewType } from '@/types';
import Review from './Review/Review';
import useAppStore from '@/store/store';
import { useMediaQuery } from 'react-responsive';
import MobileButtons from '../Shared/MobileButtons/MobileButtons';

const Reviews: FC = () => {
  const { reviewPage, setReviewPage, isFirstRender, setIsFirstRender } =
    useAppStore((state) => state);
  const t = useTranslations();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const reviews = () => {
    const arr = [];
    for (let i = 0; i < items.length; i += 2) {
      arr.push(items.slice(i, i + 2));
    }
    return arr as ReviewType[][];
  };

  const itemList = isTabletOrMobile ? items : reviews();

  const scrollTo = () => {
    if (isFirstRender) {
      return;
    }
    const element = document.getElementById(`review${reviewPage}`);
    if (reviewPage >= itemList.length) setReviewPage(0);
    if (reviewPage < 0) setReviewPage(itemList.length - 1);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  useEffect(() => {
    scrollTo();
  }, [reviewPage]);

  const increment = () => {
    setIsFirstRender(false);
    setReviewPage(reviewPage + 1);
  };
  const decrement = () => {
    setIsFirstRender(false);
    setReviewPage(reviewPage - 1);
  };

  return (
    <section className={styles.section}>
      <div className={styles.contentWrapper}>
        {isTabletOrMobile ? (
          <h2 className={styles.title}>{t('reviews.title')}</h2>
        ) : null}
        <img className={styles.lines} src='/images/lines3.svg' alt='lines' />
        <div className={styles.containerInner}>
          {isTabletOrMobile ? null : (
            <div className={styles.row}>
              <h2 className={styles.title}>{t('reviews.title')}</h2>
              <div className={styles.buttonBox}>
                <ArrowButton
                  disabled={reviewPage === 0}
                  onClick={decrement}
                  colored
                  reversed
                />
                <ArrowButton
                  disabled={reviewPage === reviews().length - 1}
                  onClick={increment}
                  colored
                />
              </div>
            </div>
          )}
          <div className={styles.reviewBox}>
            {isTabletOrMobile
              ? items.map((review: ReviewType, i: number) => (
                  <div
                    className={`${styles.itemBoxMobile} ${
                      i === items.length - 1 ? styles.lastItem : ''
                    }`}
                    id={`review${i}`}
                    key={`review${i}`}
                  >
                    <Review item={review} />
                  </div>
                ))
              : reviews().map((review: ReviewType[], i: number) => (
                  <div className={styles.itemBox} id={`review${i}`} key={i}>
                    <Review item={review[0]} />
                    <Review item={review[1]} />
                  </div>
                ))}
          </div>
        </div>
        <img
          className={styles.image}
          src='/images/reviewsBG.png'
          alt='bottles of exosome'
        />
      </div>
      {isTabletOrMobile ? (
        <div className={styles.mobileButtons}>
          <MobileButtons
            disabledLeft={reviewPage === 0}
            disabledRight={reviewPage === items.length - 1}
            onClickLeft={decrement}
            onClickRight={increment}
          />
        </div>
      ) : null}
    </section>
  );
};

export default Reviews;
