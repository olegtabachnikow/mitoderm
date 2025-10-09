import { FC } from 'react';
import styles from './SolutionProduct.module.scss';
import { useTranslations } from 'next-intl';

interface Props {
  page: 'hair' | 'gel';
}

const SolutionProduct: FC<Props> = ({ page }) => {
  const t = useTranslations();
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <span className={styles.title}>{t(`solution.${page}.itemTitle`)}</span>
        <span className={styles.subtitle}>{t(`solution.${page}.item1`)}</span>
        <span className={styles.text}>
          &bull; {t(`solution.${page}.item2`)}
        </span>
        <span className={styles.text}>
          &bull; {t(`solution.${page}.item3`)}
        </span>
        <span className={styles.text}>
          &bull; {t(`solution.${page}.item4`)}
        </span>
        <span className={styles.text}>
          &bull; {t(`solution.${page}.item5`)}
        </span>
        <span className={styles.text}>
          &bull; {t(`solution.${page}.item6`)}
        </span>
      </div>
      <div className={styles.imageContainer}>
        <img src={`/images/solution/${page}Sm.png`} alt='product' />
      </div>
    </div>
  );
};

export default SolutionProduct;
