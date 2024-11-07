import { FC } from 'react';
import styles from './Solution.module.css';
import { useTranslations } from 'next-intl';
import SliderButton from '../SliderButton/SliderButton';
import Image from 'next/image';

const Solution: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <span>{t('solution.titleP1')}</span>
        <span>{t('solution.titleP2')}</span>
        <span>{t('solution.titleP3')}</span>
      </div>
      <div className={styles.contentOuter}>
        <SliderButton />
        <div className={styles.contentInner}>
          <div className={styles.content}>
            <div className={styles.contentItem}>
              <Image
                src='/images/bottle1.svg'
                width={350}
                height={350}
                alt='bottle of mixture'
              />
              <div className={styles.itemTitle}>
                <span className={styles.itemTitleStyled}>
                  {t('solution.item1titleP1')}
                </span>
                <span>{t('solution.item1titleP2')}</span>
              </div>
              <span>{t('solution.item1textP1')}</span>
              <span>{t('solution.item1textP2')}</span>
              <span>{t('solution.item1textP3')}</span>
              <span>{t('solution.item1textP4')}</span>
            </div>
            <Image
              width={50}
              height={50}
              alt='plus'
              src='/images/plus.svg'
              className={styles.plus}
            />
            <div className={styles.contentItem}>
              <Image
                src='/images/bottle2.svg'
                width={350}
                height={350}
                alt='bottle of mixture'
              />
              <div className={styles.itemTitle}>
                <span>{t('solution.item2title')}</span>
              </div>
              <span>{t('solution.item2textP1')}</span>
              <span>{t('solution.item2textP2')}</span>
            </div>
          </div>
          <div className={styles.contentFooter}>
            <span>{t('solution.usage')}</span>
          </div>
        </div>
        <SliderButton reverced />
      </div>
    </section>
  );
};

export default Solution;
