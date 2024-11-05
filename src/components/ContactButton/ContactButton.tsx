import { FC } from 'react';
import styles from './ContactButton.module.css';
import { useTranslations } from 'next-intl';

const ContactButton: FC = () => {
  const t = useTranslations();
  return <button className={styles.button}>{t('buttons.contact')}</button>;
};

export default ContactButton;
