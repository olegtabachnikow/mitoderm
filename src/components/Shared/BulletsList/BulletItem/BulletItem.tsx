import { FC } from 'react';
import styles from './BulletItem.module.scss';
import { useTranslations } from 'next-intl';

interface Props {
  imageUrl: string;
  text: string;
}

const BulletItem: FC<Props> = ({ imageUrl, text }) => {
  const t = useTranslations();
  return (
    <div className={styles.container}>
      <span>{t(text)}</span>
      <img src={imageUrl} alt='item purpose' />
    </div>
  );
};

export default BulletItem;
