'use client';
import { FC } from 'react';
import styles from './Footer.module.scss';
import { useTranslations } from 'next-intl';
import useAppStore from '@/store/store';

const Footer: FC = () => {
  const { setModalContent, toggleModal } = useAppStore((state) => state);
  const t = useTranslations();

  const handlePrivacyClick = () => {
    toggleModal(true);
    setModalContent('privatePolicy');
  };

  const handleAccessibilityClick = () => {
    toggleModal(true);
    setModalContent('accessibility');
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span className={styles.copyright}>{t('footer.copyright')}</span>
        <div className={styles.textContainer}>
          <span onClick={handleAccessibilityClick} className={styles.item}>
            {t('footer.accessibility')}
          </span>
          <span onClick={handlePrivacyClick} className={styles.item}>
            {t('footer.privacy')}
          </span>
          <span className={styles.item}>{t('footer.group')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
