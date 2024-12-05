import { FC } from 'react';
import styles from './Footer.module.scss';
import { useTranslations } from 'next-intl';

const Footer: FC = () => {
  const t = useTranslations();
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <span className={styles.copyright}>{t('footer.copyright')}</span>
        <div className={styles.textContainer}>
          <span className={styles.item}>{t('footer.accessibility')}</span>
          <span className={styles.item}>{t('footer.privacy')}</span>
          <span className={styles.item}>{t('footer.group')}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
