'use client';
import { FC } from 'react';
import styles from './Solution.module.scss';
import { useTranslations } from 'next-intl';
import Button from '../../sharedUI/Button/Button';
import { solutionItems } from '@/constants';
import { combinedArray } from '@/utils/helpers';
import { SolutionItem as SolutionItemType } from '@/types';
import SolutionItem from './SolutionItem/SolutionItem';

const Solution: FC = () => {
  const t = useTranslations();

  const solutionBlocks = combinedArray(solutionItems);
  return (
    <>
      <section id='solution' className={styles.section}>
        <p className={styles.title}>{t('solution.title')}</p>
        <span className={styles.subtitle}>{t('solution.subtitle')}</span>
        <div className={styles.sliderContainer}>
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
        </div>
        <Button
          style={{ margin: '40px auto' }}
          colored
          text={t('buttons.contactForPrice')}
          formPage='main'
        />
      </section>
      <section className={styles.solutionLabelsContainer}>
        <div className={styles.discrontLabel}>
          <span dir='ltr' className={styles.discountLabelTitle}>
            1 + 1 = 3
          </span>
          <span>{t('solution.discountLabelText1')}</span>
          <span>{t('solution.discountLabelText2')}</span>
        </div>
        <div className={styles.bundleContainer}>
          <div className={styles.bundleTextContainer}>
            <span className={styles.bundleTitle}>
              {t('solution.bundleTitle')}
            </span>
            <span className={styles.bundleText}>
              {t('solution.bundleText1')}
            </span>
            <span className={styles.bundleText}>
              {t('solution.bundleText2')}
            </span>
          </div>
          <img
            src='/images/solution/solutionVTech.png'
            alt='bundle explanation'
          />
        </div>
        <Button
          style={{ margin: '40px auto' }}
          colored
          text={t('buttons.contactForPrice')}
          formPage='main'
        />
      </section>
    </>
  );
};

export default Solution;
