import { FC } from 'react';
import dynamic from 'next/dynamic';
import styles from './Intro.module.scss';
import { useTranslations, useLocale } from 'next-intl';
// import ArrowButton from '../Shared/ArrowButton/ArrowButton';
import Image from 'next/image';
// import DotPagination from '../Shared/DotPagination/DotPagination';

const Button = dynamic(() => import('@/components/Shared/Button/Button'), {
  ssr: false,
});

const Intro: FC = () => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section
      id='intro'
      className={`${styles.section} ${locale === 'he' ? styles.reversed : ''}`}
    >
      {/*
      For now this element is hidden

      <div className={styles.buttonBox}>
        <ArrowButton reversed={locale === 'he' ? false : true} />
      </div> */}
      <div className={styles.container}>
        <span>
          <span>{t('intro.subtitleP1')}</span>
          <span className={styles.dot}>&#x2022;</span>
          <span>{t('intro.subtitleP2')}</span>
        </span>
        <h1 className={`${styles.title} ${locale === 'ru' ? styles.ru : ''}`}>
          {t('intro.title')}
        </h1>
        <div className={styles.row}>
          <Button
            text={t('buttons.contact')}
            style={{ marginTop: 20 }}
            contact
          />
          <p className={styles.text}>{t('intro.text')}</p>
        </div>
      </div>
      {/* 
      For now this element is hidden

      <div className={styles.buttonBox}>
        <ArrowButton reversed={locale === 'he'} />
      </div> */}
      <Image
        className={styles.lines}
        src='/images/lines1.svg'
        width={460}
        height={460}
        alt='lines'
      />
      {/*     
      For now this element is hidden

      <DotPagination
        intro
        count={3}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 30,
          transform: 'translateX(-50%)',
        }}
      /> */}
    </section>
  );
};

export default Intro;
