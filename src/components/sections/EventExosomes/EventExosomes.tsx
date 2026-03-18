'use client';

import { FC } from 'react';
import styles from './EventExosomes.module.scss';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import type { WorkshopVariant } from '@/types';

interface Props {
  variant: WorkshopVariant;
}

const EventExosomes: FC<Props> = ({ variant }) => {
  const t = useTranslations();

  const cards = [
    {
      title: t(`v${variant}.exosomes.card1Title`),
      body: t(`v${variant}.exosomes.card1Body`),
    },
    {
      title: t(`v${variant}.exosomes.card2Title`),
      body: t(`v${variant}.exosomes.card2Body`),
    },
    {
      title: t(`v${variant}.exosomes.card3Title`),
      body: t(`v${variant}.exosomes.card3Body`),
    },
  ];

  return (
    <section className={styles.exosomes}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.sectionHead}
        >
          <h2>{t(`v${variant}.exosomes.heading`)}</h2>
          <p>{t(`v${variant}.exosomes.subheading`)}</p>
        </motion.div>

        <div className={styles.grid}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className={styles.card}
            >
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p style={{ lineHeight: 1.625, color: 'rgba(255,255,255,0.9)' }}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className={styles.footer}
        >
          {t(`v${variant}.exosomes.footer`)}
        </motion.p>
      </div>
    </section>
  );
};

export default EventExosomes;
