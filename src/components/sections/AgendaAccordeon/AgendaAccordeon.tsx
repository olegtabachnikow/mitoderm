'use client';

import { FC } from 'react';
import styles from './AgendaAccordeon.module.scss';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import type { WorkshopVariant } from '@/types';

interface Props {
  variant: WorkshopVariant;
}

const AgendaAccordion: FC<Props> = ({ variant }) => {
  const t = useTranslations();
  const items = t(`v${variant}.topics.items`).split('|');

  return (
    <section className={styles.agenda}>
      <div className={styles.container}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.heading}
        >
          {t(`v${variant}.topics.heading`)}
        </motion.h2>

        <div className={styles.list}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={styles.item}
            >
              <p>{item}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className={styles.ctaWrap}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.cta}
          >
            {t(`v${variant}.topics.cta`)}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AgendaAccordion;
