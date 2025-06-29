import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import styles from './FormCloseButton.module.scss';

const FormCloseButton: FC = () => {
  const router = useRouter();
  const locale = useLocale();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <button
      onClick={handleGoBack}
      className={`${styles.button} ${locale === 'he' && styles.he}`}
    >
      <img src='/images/crossYellow.svg' alt='yellow cross icon for button' />
    </button>
  );
};

export default FormCloseButton;
