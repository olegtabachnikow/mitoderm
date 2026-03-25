'use client';

import { FC, useState } from 'react';
import { motion } from 'motion/react';
import styles from './CourseDates.module.scss';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import CourseDatesCheckbox from './CourseDatesCheckbox/CourseDatesCheckbox';
import type { Course } from '@/types';
import DesktopRow from './DesktopRow/DesktopRow';
import MobileRow from './MobileRow/MobileRow';

const defaultCourses: Course[] = [
  {
    id: 1,
    city: 'תל אביב',
    date: '15.04.26',
    time: '10:00 - 14:00',
  },
  { id: 2, city: 'ירושלים', date: '22.04.26', time: '10:00 - 14:00' },
  { id: 3, city: 'חיפה', date: '29.04.26', time: '10:00 - 14:00' },
  { id: 4, city: 'באר שבע', date: '06.05.26', time: '10:00 - 14:00' },
];

interface Props {
  courses?: Course[];
  heading?: string;
  subtitle?: string;
}

const CourseDates: FC<Props> = ({
  courses = defaultCourses,
  heading = 'פרטי הקורס',
  subtitle = 'בחר מיקום ותאריך מועדף',
}) => {
  const [selected, setSelected] = useState(courses[0]?.id ?? 1);
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <section className={styles.section} dir="rtl">
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
        <h2 className={styles.heading}>{heading}</h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </motion.div>

      <div className={styles.rows}>
        {courses.map((c, index) =>
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
    </section>
  );
};

export default CourseDates;
