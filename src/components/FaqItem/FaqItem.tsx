'use client';
import { FC, useState } from 'react';
import styles from './FaqItem.module.css';
import { useTranslations } from 'next-intl';

interface Props {
  item: number;
}

const FaqItem: FC<Props> = ({ item }) => {
  const t = useTranslations();
  const [isShown, setIsShown] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <span
        onClick={() => setIsShown((state) => !state)}
        className={styles.title}
      >
        {t(`faq.item${item}.title`)}
      </span>
      {isShown ? (
        <p className={styles.text}>{t(`faq.item${item}.text`)}</p>
      ) : null}
    </div>
  );
};

export default FaqItem;
