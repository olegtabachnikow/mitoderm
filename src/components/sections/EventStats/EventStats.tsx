'use client';

import { FC } from 'react';
import styles from './EventStats.module.scss';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import { StatItem } from '@/types';
import StatCard from './StatCard/StatCard';

const EventStats: FC = () => {
  const t = useTranslations('stats');

  const stats: StatItem[] = [
    { icon: 'users.svg', value: 500, suffix: '+', labelKey: 'experts' },
    { icon: 'award.svg', value: 15, suffix: '+', labelKey: 'years' },
    { icon: 'briefcase.svg', value: 50, suffix: '+', labelKey: 'workshops' },
    {
      icon: 'trendingup.svg',
      value: 98,
      suffix: '%',
      labelKey: 'satisfaction',
    },
  ];

  return (
    <section className={styles.stats}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.sectionHead}
        >
          <h2>{t('heading')}</h2>
          <p>{t('subtitle')}</p>
        </motion.div>

        <div className={styles.statsGrid}>
          {stats.map((stat, i) => (
            <StatCard
              key={i}
              stat={stat}
              delay={i * 0.1}
              label={t(stat.labelKey)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventStats;
