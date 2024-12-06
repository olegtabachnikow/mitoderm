'use client';
import { FC, useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const t = useTranslations();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  const handleScroll = (arg: 1 | 2) => {
    setCurrentPage(arg);
    const currentScroll = document.getElementById(`block${arg}`);
    currentScroll?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

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
          <ArrowButton
            disabled={currentPage === 1}
            colored
            reversed
            onClick={() => handleScroll(1)}
          />
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
          <ArrowButton
            disabled={currentPage === 2}
            colored
            onClick={() => handleScroll(2)}
          />
        ) : null}
      </div>
      {isTabletOrMobile ? (
        <div className={styles.mobileButtons}>
          <ArrowButton
            disabled={currentPage === 1}
            colored
            dark
            reversed
            onClick={() => handleScroll(1)}
          />
          <ArrowButton
            disabled={currentPage === 2}
            colored
            dark
            onClick={() => handleScroll(2)}
          />
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
