'use client';
import { FC } from 'react';
import styles from './StickyBar.module.scss';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { WorkshopVariant } from '@/types';

interface Props {
  isShown: boolean;
  onVariantChange: (variant: WorkshopVariant) => void;
  selectedVariant: WorkshopVariant;
}

const StickyBar: FC<Props> = ({
  isShown,
  onVariantChange,
  selectedVariant,
}) => {
  const t = useTranslations();

  return (
    <AnimatePresence>
      {isShown && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={styles.stickyBar}
        >
          <div className={styles.inner}>
            {(['990', '180', '480'] as WorkshopVariant[]).map((v) => (
              <motion.button
                key={v}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onVariantChange(v)}
                className={`${styles.btn} ${selectedVariant === v ? styles.active : ''}`}
              >
                {v === '990'
                  ? t('stickyBar.workshop')
                  : v === '180'
                    ? t('stickyBar.hours180')
                    : t('stickyBar.hours480')}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyBar;
