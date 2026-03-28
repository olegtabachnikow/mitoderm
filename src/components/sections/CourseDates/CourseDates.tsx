'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import styles from './CourseDates.module.scss';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { Event } from '@/types';
import DesktopRow from './DesktopRow/DesktopRow';
import MobileRow from './MobileRow/MobileRow';
import useAppStore from '@/store/store';
import { Link } from '@/i18n/routing';

interface Props {
  events: Event[];
}

const CourseDates: FC<Props> = ({ events }) => {
  const [selected, setSelected] = useState('');
  const { courseVariant } = useAppStore((state) => state);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const t = useTranslations();

  const courses = events?.filter(
    (ev) => ev.category.toString() === courseVariant,
  );

  useEffect(() => {
    setSelected('');
  }, [courseVariant]);

  return (
    <section className={styles.section} dir="rtl" id="course-dates">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={styles.header}
      >
        <div className={styles.iconWrap}>
          <Image
            src="/images/icons/courseDateStar.svg"
            className={styles.starIcon}
            width={22}
            height={22}
            alt="star icon"
          />
        </div>
        <h2 className={styles.heading}>{t('courses.datesHeading')}</h2>
        <p className={styles.subtitle}>{t('courses.datesSubtitle')}</p>
      </motion.div>

      <div className={styles.rows}>
        {courses?.map((c, index) =>
          isMobile ? (
            <MobileRow
              key={c.id}
              c={c}
              isSelected={selected === c.id}
              onSelect={() => setSelected(c.id)}
              index={index}
            />
          ) : (
            <DesktopRow
              key={c.id}
              c={c}
              isSelected={selected === c.id}
              onSelect={() => setSelected(c.id)}
              index={index}
            />
          ),
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className={styles.ctaWrap}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={styles.cta}
        >
          <Link href={'/event/form'}>{t(`v${courseVariant}.topics.cta`)}</Link>
        </motion.div>
      </motion.div>

      <button
        onClick={() => {
          const eventDate = new Date('2026-04-04');
          fetch('/api/events', {
            method: 'POST',
            body: JSON.stringify({
              category: courseVariant,
              city: 'Haifa',
              date: eventDate,
              time: '14:00 - 14:30',
              expireAt: eventDate,
            }),
          });
        }}
      >
        Add Event
      </button>
    </section>
  );
};

export default CourseDates;
