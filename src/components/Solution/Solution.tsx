'use client';
import { FC, useState, useEffect } from 'react';
import styles from './Solution.module.scss';
import { useTranslations } from 'next-intl';
import Button from '../Shared/Button/Button';
import { solutionItems } from '@/constants';
import { combinedArray } from '@/utils/helpers';
import { SolutionItem as SolutionItemType } from '@/types';
import SolutionItem from './SolutionItem/SolutionItem';
import ArrowButton from '../Shared/ArrowButton/ArrowButton';
import { useMediaQuery } from 'react-responsive';

const Solution: FC = () => {
  const t = useTranslations();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleScroll = (arg: 1 | 2) => {
    currentPage !== arg
      ? setCurrentPage(arg)
      : arg === 1
      ? setCurrentPage(2)
      : setCurrentPage(1);
  };

  useEffect(() => {
    const currentScroll = document.getElementById(`block${currentPage}`);
    currentScroll?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  }, [currentPage]);

  const solutionBlocks = combinedArray(solutionItems);
  return (
    <section className={styles.section}>
      <p className={styles.title}>
        {t('solution.titleP1')}
        <span>{t('solution.titleP2')}</span>
        {t('solution.titleP3')}
      </p>
      <span className={styles.subtitle}>{t('solution.subtitle')}</span>
      <div className={styles.sliderContainer}>
        {!isTabletOrMobile ? (
          <ArrowButton colored reversed onClick={() => handleScroll(1)} />
        ) : null}
        <div className={styles.slider}>
          {solutionBlocks.map((block: SolutionItemType[], index: number) => (
            <div
              id={`block${index + 1}`}
              className={styles.solutionBlock}
              key={index}
            >
              <SolutionItem item={block[0]} withLabel />
              <SolutionItem item={block[1]} />
            </div>
          ))}
        </div>
        {!isTabletOrMobile ? (
          <ArrowButton colored onClick={() => handleScroll(2)} />
        ) : null}
      </div>
      {isTabletOrMobile ? (
        <div className={styles.mobileButtons}>
          <ArrowButton colored dark reversed onClick={() => handleScroll(1)} />
          <ArrowButton colored dark onClick={() => handleScroll(2)} />
        </div>
      ) : null}
      <Button
        style={{ margin: '40px auto' }}
        colored
        text={t('buttons.contactForPrice')}
      />
    </section>
  );
};

export default Solution;
