import { Dispatch, FC, SetStateAction } from 'react';
import styles from './RadioGroupInput.module.scss';
import { useTranslations } from 'next-intl';

interface Props {
  text: string;
  value: 1 | 2;
  isProf: boolean;
  setValue: Dispatch<SetStateAction<1 | 2>>;
}

const RadioGroupInput: FC<Props> = ({ text, value, setValue, isProf }) => {
  const t = useTranslations();
  return (
    <div className={styles.container}>
      <span className={styles.label}>{t(text)}</span>
      <div className={styles.buttonContainer}>
        <button
          type='button'
          onClick={() => setValue(1)}
          className={styles.item}
        >
          <div
            onClick={() => setValue(1)}
            className={`${styles.buttonIcon} ${
              value === 1 ? styles.active : ''
            }`}
          />
          <span>{t(isProf ? 'form.prof1' : 'form.gen1')}</span>
        </button>
        <button
          onClick={() => setValue(2)}
          type='button'
          className={styles.item}
        >
          <div
            className={`${styles.buttonIcon} ${
              value === 2 ? styles.active : ''
            }`}
          />
          <span>{t(isProf ? 'form.prof2' : 'form.gen2')}</span>
        </button>
      </div>
    </div>
  );
};

export default RadioGroupInput;
