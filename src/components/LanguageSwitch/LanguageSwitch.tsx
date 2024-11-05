'use client';
import { FC, useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './LanguageSwitch.module.css';
import Image from 'next/image';
import { useLocale } from 'next-intl';

const ruLink = (
  <Link style={{ color: '#000', marginRight: 10 }} href='/ru/'>
    <Image
      width={129}
      height={109}
      alt='russian flag'
      src='/images/ru_button.svg'
    />
  </Link>
);

const heLink = (
  <Link style={{ color: '#000', marginRight: 10 }} href='/he/'>
    <Image
      width={129}
      height={109}
      alt='israel flag'
      src='/images/he_button.svg'
    />
  </Link>
);

const enLink = (
  <Link style={{ color: '#000', marginRight: 10 }} href='/en/'>
    <Image
      width={129}
      height={109}
      alt='usa flag'
      src='/images/en_button.svg'
    />
  </Link>
);

const LanguageSwitch: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const handleClick = () => {
    setIsOpen(() => !isOpen);
  };

  const closeOpenMenu = (e: MouseEvent) => {
    if (
      isOpen &&
      popupRef.current &&
      !popupRef.current?.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) window.addEventListener('click', closeOpenMenu);
    return () => window.removeEventListener('click', closeOpenMenu);
  }, [isOpen]);

  return (
    <div ref={popupRef} className={styles.container}>
      <Image
        className={styles.button}
        onClick={handleClick}
        width={129}
        height={109}
        alt={`${locale} flag`}
        src={`/images/${locale}_button.svg`}
      />
      {isOpen ? (
        <div className={styles.popup}>
          {locale === 'en' ? (
            <>
              {ruLink}
              {heLink}
            </>
          ) : locale === 'ru' ? (
            <>
              {enLink}
              {heLink}
            </>
          ) : (
            <>
              {enLink}
              {ruLink}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default LanguageSwitch;
