'use client';

import { FC } from 'react';
import styles from './AgendaAccordeon.module.scss';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import useAppStore from '@/store/store';
import EventButton from '@/components/sharedUI/EventButton/EventButton';

const AgendaAccordion: FC = () => {
  const t = useTranslations();
  const { courseVariant } = useAppStore((state) => state);
  const items = t(`v${courseVariant}.topics.items`).split('|');

  return (
    <section className={styles.agenda} id="agenda">
      <div className={styles.container}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.heading}
        >
          {t(`v${courseVariant}.topics.heading`)}
        </motion.h2>
        <div className={styles.prefixLine} />

        <div className={styles.list}>
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={styles.item}
            >
              <div className={styles.imgWrapper}>
                <Image
                  src="/images/icons/ok.svg"
                  alt="ok icon"
                  width={20}
                  height={20}
                />
              </div>
              <p>{item}</p>
            </motion.div>
          ))}
        </div>

        <EventButton
          text={t(`v${courseVariant}.topics.cta`)}
          onClick={() => {}}
        />
        {/* <motion.div
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
            {t(`v${courseVariant}.topics.cta`)}
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default AgendaAccordion;
