'use client';
import { FC } from 'react';
import styles from './About.module.scss';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { aboutBulletItems } from '@/constants';
import { AboutBulletItem } from '@/types';
import AboutItem from './AboutItem/AboutItem';
import Button from '../Shared/Button/Button';
import { usePathname } from 'next/navigation';

const scrollTo = () => {
  const element = document.getElementById('faq');
  if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  return;
};

const About: FC = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const isEventPage = pathname.includes('event');

  return (
    <section id='about' className={styles.section}>
      <article className={styles.article}>
        <div className={styles.textContainer}>
          <h2>
            {t('about.titleP1')}
            <span>{t('about.titleP2')}</span>
          </h2>
          <p>
            {t('about.text1')}
            <span>{t('about.text1Colored')}</span>
            <br />
            <br />
            {t('about.text2')}
            <span>{t('about.text2Colored')}</span>
          </p>
        </div>
        <div className={styles.imageContainer}>
          <Image src='/images/whatIsExosome.png' fill alt='exosome examples' />
        </div>
      </article>
      <div className={styles.itemContainer}>
        {aboutBulletItems.map((item: AboutBulletItem) => (
          <AboutItem key={item.text} data={item.data} text={t(item.text)} />
        ))}
      </div>
      <Button
        style={{ marginBlock: 40, marginBottom: isEventPage ? 80 : 40 }}
        colored
        text={t(isEventPage ? 'buttons.seat' : 'buttons.moreAbout')}
        onClick={!isEventPage ? scrollTo : () => null}
        contact={isEventPage}
      />
    </section>
  );
};

export default About;
