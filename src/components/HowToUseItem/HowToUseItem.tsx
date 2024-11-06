import { FC } from 'react';
import { Jost } from 'next/font/google';
import styles from './HowToUseItem.module.css';
import { useTranslations } from 'next-intl';

const jost = Jost({
  weight: ['300', '400'],
  style: 'normal',
  display: 'swap',
  variable: '--font-Jost',
  subsets: ['latin', 'cyrillic'],
});

interface Props {
  imagePath: string;
  text: string;
}

const HowToUseItem: FC<Props> = ({ imagePath, text }) => {
  const t = useTranslations();
  return (
    <div className={styles.container}>
      <img alt='issue icon' src={imagePath} />
      <p className={jost.className}>{t(text)}</p>
    </div>
  );
};

export default HowToUseItem;
