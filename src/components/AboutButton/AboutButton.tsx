import { FC } from 'react';
import styles from './AboutButton.module.css';
import { useTranslations } from 'next-intl';

const AboutButton: FC = () => {
  const t = useTranslations();
  return <button className={styles.button}>{t('buttons.moreAbout')}</button>;
};

export default AboutButton;
