'use client';
import { FC, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styles from './Intro.module.scss';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { usePathname } from '@/i18n/routing';
import DotPagination from '../Shared/DotPagination/DotPagination';
import useAppStore from '@/store/store';

const Button = dynamic(() => import('@/components/Shared/Button/Button'), {
  ssr: false,
});

const Intro: FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const isEventPage = pathname.includes('event');
  const { introPage, setIntroPage } = useAppStore((state) => state);

  const scrollToNextChild = () => {
    const container = document.getElementById('scroller');
    const scrollPosition = introPage * window.innerWidth;
    if (locale === 'he') {
      container?.scrollTo({
        left: -scrollPosition,
        behavior: 'smooth',
      });
    } else {
      container?.scrollTo({
        left: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (isEventPage) {
      setIntroPage(1);
    } else setIntroPage(0);
  }, []);

  useEffect(() => {
    const container = document.getElementById('scroller');
    container?.addEventListener(
      'wheel',
      (event) => {
        event.preventDefault();
      },
      { passive: false }
    );
    container?.addEventListener(
      'touch',
      (event) => {
        event.preventDefault();
      },
      { passive: false }
    );
  }, []);

  useEffect(() => {
    scrollToNextChild();
  }, [introPage]);

  useEffect(() => {
    const currentValue = introPage === 0 ? 1 : 0;
    const interval = setInterval(() => {
      setIntroPage(currentValue);
    }, 15000);

    return () => clearInterval(interval);
  }, [introPage]);

  return (
    <section id='intro' className={styles.section}>
      <div id='scroller' className={styles.scrollBox}>
        <div
          className={`${styles.introMain} ${
            locale === 'he' ? styles.reversed : ''
          }`}
        >
          <div className={styles.container}>
            <span>
              <span>{t('intro.subtitleP1')}</span>
              <span className={styles.dot}>&#x2022;</span>
              <span>{t('intro.subtitleP2')}</span>
            </span>
            <h1
              className={`${styles.title} ${locale === 'ru' ? styles.ru : ''}`}
            >
              {t('intro.title')}
            </h1>
            <div className={styles.row}>
              <Button
                text={t('buttons.contact')}
                style={{ marginTop: 20 }}
                formPage={'main'}
              />
              <p className={styles.text}>{t('intro.text')}</p>
            </div>
          </div>
        </div>
        <div
          className={`${styles.introEvent} ${
            locale === 'he' ? styles.reversed : ''
          }`}
        >
          <div className={styles.container}>
            <span>
              <span>{t('intro.eventSubtitle')}</span>
            </span>
            <h1
              className={`${styles.title} ${locale === 'ru' ? styles.ru : ''}`}
            >
              {t('intro.eventTitle')}
            </h1>
            <div className={styles.row}>
              <Button
                text={t('buttons.seat')}
                style={{ marginTop: 20 }}
                formPage={'event'}
              />
            </div>
          </div>
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
      <div className={styles.paginationBox}>
        <DotPagination count={2} intro />
      </div>
    </section>
  );
};

export default Intro;
