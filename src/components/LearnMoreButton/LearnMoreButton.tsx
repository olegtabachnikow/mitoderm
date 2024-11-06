import { FC } from 'react';
import styles from './LearnMoreButton.module.css';
import { useTranslations } from 'next-intl';

const LearnMoreButton: FC = () => {
  const t = useTranslations();
  return <button className={styles.button}>{t('buttons.learnMore')}</button>;
};

export default LearnMoreButton;
