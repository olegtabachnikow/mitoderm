import { FC } from 'react';
import styles from './BeforeAfter.module.css';
import bg from '../../../public/images/beforeAfter.png';
import { useTranslations } from 'next-intl';
import BeforeAfterSlider from '../BeforeAfterSlider/BeforeAfterSlider';

const BeforeAfter: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.container}>
      <div
        className={styles.bg1}
        style={{ backgroundImage: `url(${bg.src})` }}
      />
      <div className={styles.bg2} />
      <div className={styles.containerInner}>
        <span className={styles.title}>{t('beforeAfter.title')}</span>
        <span className={styles.title1}>{t('beforeAfter.gallery')}</span>
        <BeforeAfterSlider />
      </div>
    </section>
  );
};

export default BeforeAfter;
