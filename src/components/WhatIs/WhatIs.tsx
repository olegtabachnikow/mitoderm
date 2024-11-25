import { FC } from 'react';
import styles from './WhatIs.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

const WhatIs: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.section}>
      <article className={styles.article}>
        <div className={styles.textContainer}>
          <h2>
            {t('about.titleP1')}
            <span>{t('about.titleP2')}</span>
          </h2>
          <p>
            {t('about.text1')}
            <span>{t('about.text1Colored')}</span>
            <br />
            <br />
            {t('about.text2')}
            <span>{t('about.text2Colored')}</span>
          </p>
        </div>
        <div className={styles.imageContainer}>
          <Image src='/images/whatIsExosome.png' fill alt='exosome examples' />
        </div>
      </article>
    </section>
  );
};

export default WhatIs;
