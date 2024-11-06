import { FC } from 'react';
import styles from './About.module.css';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { aboutBulletItems } from '@/constants';
import AboutBullet from '../AboutBullet/AboutBullet';
import { AboutBulletItem } from '@/types';

const About: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.container}>
      <div className={styles.subtitle}>
        <span>{t('about.subtitle')}</span>
        <span className={styles.line} />
      </div>
      <div className={styles.containerInner}>
        <article className={styles.articleBox}>
          <div>
            <span>{t('about.titleP1')}</span>
            <span className={styles.colored}>{t('about.titleP2')}</span>
            <p className={styles.text}>{t('about.text1')}</p>
            <p className={styles.text}>{t('about.text2')}</p>
          </div>
        </article>
        <Image
          width={559}
          height={327}
          alt='molecula'
          src='/images/about.svg'
        />
      </div>
      <div className={styles.bullets}>
        {aboutBulletItems.map((item: AboutBulletItem) => (
          <AboutBullet data={item.data} text={item.text} key={item.data} />
        ))}
      </div>
    </section>
  );
};

export default About;
