import { FC } from 'react';
import styles from './Intro.module.scss';
import { useTranslations } from 'next-intl';

const Intro: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span>
          <span>{t('intro.subtitleP1')}</span>
          <span className={styles.dot}>&#x2022;</span>
          <span>{t('intro.subtitleP2')}</span>
        </span>
        <h1 className={styles.title}>{t('intro.title')}</h1>
        <div className={styles.row}>
          <button>asdadw</button>
          <p className={styles.text}>{t('intro.text')}</p>
        </div>
      </div>
    </section>
  );
};

export default Intro;
