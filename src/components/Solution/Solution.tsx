import { FC } from 'react';
import styles from './Solution.module.scss';
import { useTranslations } from 'next-intl';
import Button from '../Shared/Button/Button';

const Solution: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.section}>
      <p className={styles.title}>
        {t('solution.titleP1')}
        <span>{t('solution.titleP2')}</span>
        {t('solution.titleP3')}
      </p>
      <span className={styles.subtitle}>{t('solution.subtitle')}</span>
      <div className={styles.slider}></div>
      <Button
        style={{ margin: '40px auto' }}
        colored
        text={t('buttons.contactForPrice')}
      />
    </section>
  );
};

export default Solution;
