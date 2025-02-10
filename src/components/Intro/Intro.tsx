'use client';
import { FC } from 'react';
import dynamic from 'next/dynamic';
import styles from './Intro.module.scss';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Button = dynamic(() => import('@/components/Shared/Button/Button'), {
  ssr: false,
});

const Intro: FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const isEventPage = pathname.includes('event');

  return (
    <section
      id='intro'
      className={`${styles.section} ${isEventPage ? styles.sectionEvent : ''} ${
        locale === 'he' ? styles.reversed : ''
      }`}
    >
      <div className={styles.container}>
        <span>
          {isEventPage ? (
            <span>{t('intro.eventSubtitle')}</span>
          ) : (
            <>
              <span>{t('intro.subtitleP1')}</span>
              <span className={styles.dot}>&#x2022;</span>
              <span>{t('intro.subtitleP2')}</span>
            </>
          )}
        </span>
        <h1 className={`${styles.title} ${locale === 'ru' ? styles.ru : ''}`}>
          {t(isEventPage ? 'intro.eventTitle' : 'intro.title')}
        </h1>
        <div className={styles.row}>
          <Button
            text={t(isEventPage ? 'buttons.seat' : 'buttons.contact')}
            style={{ marginTop: 20 }}
            formPage={isEventPage ? 'event' : 'main'}
          />
          {isEventPage ? null : (
            <p className={styles.text}>{t('intro.text')}</p>
          )}
        </div>
      </div>
      {!isEventPage && (
        <Image
          className={styles.lines}
          src='/images/lines1.svg'
          width={460}
          height={460}
          alt='lines'
        />
      )}
    </section>
  );
};

export default Intro;
