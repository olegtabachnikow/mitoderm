import { FC } from 'react';
import styles from './Mission.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Button from '../Shared/Button/Button';

const Mission: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.container}>
      <div className={styles.bg} />
      <article className={styles.textContainer}>
        <p className={styles.title}>
          <span>{t('dream.titleP1')}</span>
          <br />
          {t('dream.titleP2')}
        </p>
        <p className={styles.text}>
          {t('dream.textP1')}
          <span>{t('dream.textP2')}</span>
          {t('dream.textP3')}
        </p>
        <p className={styles.text}>
          <span>{t('dream.textP4')}</span>
          {t('dream.textP5')}
          <span>{t('dream.textP6')}</span>
          {t('dream.textP7')}
        </p>
        <div className={styles.buttonContainer}>
          <Button colored text={t('buttons.contactForSolutions')} />
        </div>
      </article>
    </section>
  );
};

export default Mission;
