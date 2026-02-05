import { FC, useState, useEffect } from 'react';
import styles from './NavigationProductButton.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

interface Props {
  isMobile?: boolean;
  handleClick?: () => void;
}
const NavigationProductButton: FC<Props> = ({ isMobile, handleClick }) => {
  const locale = useLocale();
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    isMobile ? setIsOpen(true) : setIsOpen(false);
  }, [isMobile]);

  return (
    <div
      onMouseEnter={() => (isMobile ? null : setIsOpen(true))}
      onMouseLeave={() => (isMobile ? null : setIsOpen(false))}
      className={`${isMobile ? styles.buttonMobile : styles.button} ${
        styles.dropDownButton
      } ${!isOpen ? styles.closed : styles.opened}`}
    >
      <Link href={`/${locale}/`}>{t('navigation.product')}</Link>
      <Image
        className={`${styles.arrowIcon} ${
          locale === 'he' ? styles.reversed : ''
        } ${isOpen ? styles.opened : ''}`}
        src="/images/icons/arrowDown.svg"
        width={10}
        height={5.5}
        alt="arrow icon"
      />
      {isOpen && (
        <div
          className={`${styles.dropDownList} ${
            isMobile && styles.dropdownListMobile
          } ${locale === 'he' && styles.reversed}`}
        >
          <Link
            onClick={handleClick}
            className={`${styles.link} ${isMobile && styles.linkMobile}`}
            href={`../${locale}/exotechgel`}
          >
            Exotech Gel
          </Link>
          <Link
            onClick={handleClick}
            className={`${styles.link} ${isMobile && styles.linkMobile}`}
            href={`../${locale}/exosignalhairspray`}
          >
            Exosignal Hair Spray
          </Link>
          <Link
            onClick={handleClick}
            className={`${styles.link} ${isMobile && styles.linkMobile}`}
            href={`../${locale}/exosignal_hair`}
          >
            Exosignal Hair
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavigationProductButton;
