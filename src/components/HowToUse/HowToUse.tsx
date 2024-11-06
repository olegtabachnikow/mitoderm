import { FC } from 'react';
import styles from './HowToUse.module.css';
import LearnMoreButton from '../LearnMoreButton/LearnMoreButton';
import { useTranslations } from 'next-intl';
import { howToUseItemList } from '@/constants';
import HowToUseItem from '../HowToUseItem/HowToUseItem';
import type { HowToUseItem as ItemType } from '@/types';

const HowToUse: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.container}>
      <h3 className={styles.title}>
        {t('howToUse.titleP1')}
        <span className={styles.colored}>{t('howToUse.titleP2')}</span>
        {t('howToUse.titleP3')}
      </h3>
      <div className={styles.itemsContainer}>
        {howToUseItemList.map((item: ItemType) => (
          <HowToUseItem imagePath={item.imagePath} text={item.text} />
        ))}
      </div>
      <LearnMoreButton />
    </section>
  );
};

export default HowToUse;
