import { FC } from 'react';
import styles from './Intro.module.scss';
import { useTranslations } from 'next-intl';
import Button from '../Shared/Button/Button';
import ArrowButton from '../Shared/ArrowButton/ArrowButton';
import Image from 'next/image';
import DotPagination from '../Shared/DotPagination/DotPagination';

const Intro: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.section}>
      <ArrowButton reversed />
      <div className={styles.container}>
        <span>
          <span>{t('intro.subtitleP1')}</span>
          <span className={styles.dot}>&#x2022;</span>
          <span>{t('intro.subtitleP2')}</span>
        </span>
        <h1 className={styles.title}>{t('intro.title')}</h1>
        <div className={styles.row}>
          <Button text={t('buttons.contact')} style={{ marginTop: 20 }} />
          <p className={styles.text}>{t('intro.text')}</p>
        </div>
      </div>
      <ArrowButton />
      <Image
        className={styles.lines}
        src='/images/lines1.svg'
        width={460}
        height={460}
        alt='lines'
      />
      <DotPagination
        count={3}
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 30,
          transform: 'translateX(-50%)',
        }}
      />
    </section>
  );
};

export default Intro;
