import { FC } from 'react';
import styles from './HowCaBeUsed.module.scss';
import { useTranslations } from 'next-intl';
import { howToUseItemList } from '@/constants';
import UsageItem from './UsageItem/UsageItem';
import Button from '../Shared/Button/Button';

const HowCanBeUsed: FC = () => {
  const t = useTranslations();
  return (
    <section className={styles.section}>
      <p className={styles.title}>
        {t('howToUse.titleP1')}
        <span className={styles.titleColored}>{t('howToUse.titleP2')}</span>
        {t('howToUse.titleP3')}
      </p>
      <div className={styles.itemList}>
        {howToUseItemList.map((item) => (
          <UsageItem
            key={item.text}
            imageUrl={item.imagePath}
            text={item.text}
          />
        ))}
      </div>
      <Button colored text={t('buttons.learnMore')} />
    </section>
  );
};

export default HowCanBeUsed;
