'use client';
import { FC } from 'react';
import styles from './HowCaBeUsed.module.scss';
import { useTranslations } from 'next-intl';
import {
  howToUseItemList,
  howToUseHairItemList,
  howToUseGelItemList,
} from '@/constants';
import BulletList from '../../sharedUI/BulletsList/BulletList';

interface Props {
  page: 'hair' | 'main' | 'gel';
}

const HowCanBeUsed: FC<Props> = ({ page }) => {
  let currentData = howToUseItemList;
  switch (true) {
    case page === 'hair':
      currentData = howToUseHairItemList;
      break;
    case page === 'gel':
      currentData = howToUseGelItemList;
      break;
    default:
      currentData = howToUseItemList;
  }
  const t = useTranslations();
  return (
    <section className={styles.section}>
      <p className={styles.title}>{t('howToUse.title')}</p>
      <BulletList data={currentData} />
    </section>
  );
};

export default HowCanBeUsed;
