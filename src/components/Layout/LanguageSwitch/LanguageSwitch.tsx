'use client';
import { FC, useState, useRef, useEffect } from 'react';
import styles from './LanguageSwitch.module.scss';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import SwitchItem from './SwitchItem/SwitchItem';

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
    )
      setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) window.addEventListener('click', closeOpenMenu);
    return () => window.removeEventListener('click', closeOpenMenu);
  }, [isOpen]);

  return (
    <div ref={popupRef} className={styles.container}>
      <div className={styles.currenSelection} onClick={handleClick}>
        <Image
          className={styles.button}
          width={20}
          height={20}
          alt={`${locale} flag`}
          src={`/images/languageSwitch/en.svg`}
          // src={`/images/languageSwitch/${locale}.svg`}
        />
        <span className={styles.localeText}>{locale}</span>
        <Image
          className={`${styles.switchIcon} + ${isOpen ? styles.active : ''}`}
          src={'/images/arrowDown.svg'}
          width={10}
          height={5.5}
          alt='arrow icon'
        />
        {isOpen ? (
          <div className={styles.popup}>
            {locale === 'en' ? (
              <>
                <SwitchItem
                  url='/ru/'
                  imageSrc='/images/languageSwitch/en.svg'
                />
                <SwitchItem
                  url='/he/'
                  imageSrc='/images/languageSwitch/en.svg'
                />
              </>
            ) : locale === 'ru' ? (
              <>
                <SwitchItem
                  url='/en/'
                  imageSrc='/images/languageSwitch/en.svg'
                />
                <SwitchItem
                  url='/he/'
                  imageSrc='/images/languageSwitch/en.svg'
                />
              </>
            ) : (
              <>
                <SwitchItem
                  url='/en/'
                  imageSrc='/images/languageSwitch/en.svg'
                />
                <SwitchItem
                  url='/ru/'
                  imageSrc='/images/languageSwitch/en.svg'
                />
              </>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LanguageSwitch;
