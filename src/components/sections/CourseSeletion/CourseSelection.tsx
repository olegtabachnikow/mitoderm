'use client';

import { useEffect, useRef, FC } from 'react';
import styles from './CourseSelection.module.scss';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import type { WorkshopVariant } from '@/types';
import { courses, variantToIndex } from '@/constants';

interface Props {
  onRegisterClick: () => void;
  onVisibilityChange: (isVisible: boolean) => void;
  selectedVariant: WorkshopVariant;
  onVariantChange: (variant: WorkshopVariant) => void;
}

const gradientClasses: Record<string, string> = {
  'from-[#c4a764] to-[#a68a4d]': styles.gradient1,
  'from-[#dfba74] to-[#be800c]': styles.gradient2,
  'from-[#be800c] to-[#9a6600]': styles.gradient3,
};

const CourseSelection: FC<Props> = ({
  selectedVariant,
  onRegisterClick,
  onVisibilityChange,
  onVariantChange,
}) => {
  const t = useTranslations('courses');
  const indexToVariant: WorkshopVariant[] = ['990', '180', '480'];
  const selectedCourse = variantToIndex[selectedVariant];
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (onVisibilityChange) onVisibilityChange(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [onVisibilityChange]);

  return (
    <section ref={sectionRef} className={styles.courses}>
      <div className={styles.bg1} />
      <div className={styles.bg2} />
      <div className={styles.inner}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.headingWrap}
        >
          <h2 className={styles.heading}>{t('heading')}</h2>
        </motion.div>
        <div className={styles.list}>
          {courses.map((course, index) => {
            const isSelected = selectedCourse === course.id;
            const isFeatured = course.featured;
            const courseItems = t(`${course.key}.items`).split('|');
            const gradientClass =
              gradientClasses[course.colorKey] || styles.gradient2;
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onClick={() => onVariantChange(indexToVariant[course.id])}
                animate={{
                  scale: isSelected ? 1.08 : 1,
                  zIndex: isSelected ? 3 : 2,
                }}
                transition={{
                  opacity: { duration: 0.6, delay: index * 0.15 },
                  y: { duration: 0.6, delay: index * 0.15 },
                  scale: { duration: 0.3 },
                  zIndex: { duration: 0 },
                }}
                className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
              >
                <div className={`${styles.cardOverlay} ${gradientClass}`} />
                <div className={styles.badgeWrap}>
                  <div className={`${styles.badge} ${gradientClass}`}>
                    {t(`${course.key}.badge`)}
                  </div>
                  {isFeatured && (
                    <div className={styles.recommended}>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: 'spring' }}
                        className={styles.recommendedBadge}
                      >
                        {t('recommended')}
                      </motion.div>
                    </div>
                  )}
                </div>
                <div className={styles.imageWrap}>
                  <Image
                    src={course.image}
                    alt={t(`${course.key}.title`)}
                    fill
                    className={styles.image}
                    style={{ objectPosition: 'center 20%' }}
                  />
                  <div className={`${styles.imageOverlay} ${gradientClass}`} />
                </div>
                <div className={styles.body}>
                  <h3 className={styles.title}>{t(`${course.key}.title`)}</h3>
                  <p className={styles.subtitle}>
                    {t(`${course.key}.subtitle`)}
                  </p>
                  <div className={styles.items}>
                    {courseItems.map((item, i) => (
                      <div key={i} className={styles.item}>
                        <span className={styles.itemDot} />
                        <p className={styles.itemText}>{item}</p>
                      </div>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRegisterClick();
                    }}
                    className={`${styles.registerBtn} ${gradientClass}`}
                  >
                    {t('register')}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CourseSelection;
