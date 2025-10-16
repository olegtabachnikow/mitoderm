import { FC } from 'react';
import styles from './BulletItem.module.scss';
import { useTranslations } from 'next-intl';

interface Props {
  imageUrl: string;
  text: string;
  isEventPage: boolean;
  page?: 'hair' | 'gel' | 'main';
}

const BulletItem: FC<Props> = ({ imageUrl, page, text, isEventPage }) => {
  const t = useTranslations();

  return (
    <div
      className={`${styles.container} ${isEventPage && styles.containerEvent} ${
        page && page !== 'main' && styles.productContainer
      }`}
    >
      <span>{t(text)}</span>
      <img src={imageUrl} alt='item purpose' />
    </div>
  );
};

export default BulletItem;
