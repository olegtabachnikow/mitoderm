import { FC } from 'react';
import styles from './Faq.module.css';
import { useTranslations } from 'next-intl';
import FaqItem from '../FaqItem/FaqItem';

const Faq: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.container}>
      <div className={styles.containerInner}>
        <span className={styles.title}>{t('faq.title')}</span>
        <div className={styles.itemBox}>
          <FaqItem item={1} />
          <FaqItem item={2} />
          <FaqItem item={3} />
        </div>
      </div>
    </section>
  );
};

export default Faq;
