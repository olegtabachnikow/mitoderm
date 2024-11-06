import { FC } from 'react';
import styles from './AboutBullet.module.css';
import { useTranslations } from 'next-intl';

interface Props {
  data: string;
  text: string;
}

const AboutBullet: FC<Props> = ({ data, text }) => {
  const t = useTranslations();
  return (
    <div className={styles.container}>
      <span className={styles.data}>{data}</span>
      <span className={styles.text}>{t(text)}</span>
    </div>
  );
};

export default AboutBullet;
