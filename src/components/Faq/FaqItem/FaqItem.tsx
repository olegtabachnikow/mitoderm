'use client';
import { FC, useState } from 'react';
import styles from './FaqItem.module.scss';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface Props {
  item: number;
}

const FaqItem: FC<Props> = ({ item }) => {
  const t = useTranslations();
  const [isShown, setIsShown] = useState<boolean>(false);
  return (
    <div
      className={styles.container}
      onClick={() => setIsShown((state) => !state)}
    >
      <div className={styles.label}>
        <Image
          className={`${styles.image} ${isShown ? styles.active : ''}`}
          src='/images/arrowDown.svg'
          alt='arrow icon'
          width={26}
          height={15}
        />
        <span className={styles.title}>{t(`faq.item${item}.title`)}</span>
      </div>
      {isShown ? (
        <p className={styles.text}>{t(`faq.item${item}.text`)}</p>
      ) : null}
    </div>
  );
};

export default FaqItem;
