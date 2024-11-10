import { FC } from 'react';
import styles from './Solution.module.css';
import { useTranslations } from 'next-intl';
import SliderButton from '../SliderButton/SliderButton';
import Image from 'next/image';
import ContactButton from '../ContactButton/ContactButton';

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
        <SliderButton addStyles={{ marginLeft: '2%' }} />
        <div className={styles.contentInner}>
          <div className={styles.content}>
            <div className={styles.contentItem}>
              <Image
                src='/images/bottle1.svg'
                width={70}
                height={150}
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
              width={40}
              height={40}
              quality={100}
              alt='plus'
              src='/images/plus.svg'
              className={styles.plus}
            />
            <div className={styles.contentItem}>
              <Image
                src='/images/bottle2.svg'
                width={70}
                height={150}
                quality={100}
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
            <ContactButton
              style={{ marginInline: 'auto' }}
              text={t('buttons.contactForPrice')}
            />
          </div>
        </div>
        <SliderButton reverced addStyles={{ marginRight: '2%' }} />
      </div>
    </section>
  );
};

export default Solution;
