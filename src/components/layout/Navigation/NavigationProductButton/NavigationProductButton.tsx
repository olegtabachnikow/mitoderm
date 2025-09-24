import { FC, useState } from 'react';
import styles from './NavigationProductButton.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

const NavigationProductButton: FC = () => {
  const locale = useLocale();
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={`${styles.button} ${styles.dropDownButton} ${
        !isOpen && styles.closed
      }`}
    >
      {isOpen && (
        <div className={styles.dropDownList}>
          <Link className={styles.link} href={`../${locale}/exotechgel`}>
            gel
          </Link>
          <Link
            className={styles.link}
            href={`../${locale}/exosignalhairspray`}
          >
            spray
          </Link>
          <Link className={styles.link} href={`../${locale}/exosignalhair`}>
            signal
          </Link>
        </div>
      )}
      {t('navigation.product')}
      <Image
        className={`${styles.arrowIcon} ${
          locale === 'he' ? styles.reversed : ''
        } ${isOpen ? styles.opened : ''}`}
        src='/images/arrowDown.svg'
        width={10}
        height={5.5}
        alt='arrow icon'
      />
    </button>
  );
};

export default NavigationProductButton;
