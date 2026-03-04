'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './Benefit.module.scss';
import { WorkshopVariant } from '@/types';

interface Props {
  variant: WorkshopVariant;
}

const Benefit: FC<Props> = ({ variant }) => {
  const t = useTranslations();
  const items = t(`v${variant}.benefits`).split('|');
  const icons = [
    <Image
      src="/images/icons/award.svg"
      width={24}
      height={24}
      alt="award medal icon"
    />,
    <Image
      src="/images/icons/users.svg"
      width={24}
      height={24}
      alt="users icon"
    />,
    <Image
      src="/images/icons/bookOpened.svg"
      width={24}
      height={24}
      alt="book icon"
    />,
    <Image
      src="/images/icons/trophy.svg"
      width={24}
      height={24}
      alt="trophy icon"
    />,
    <Image
      src="/images/icons/target.svg"
      width={24}
      height={24}
      alt="target icon"
    />,
    <Image src="/images/icons/zap.svg" width={24} height={24} alt="zap icon" />,
  ];
  return (
    <section className="benefits">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-head"
        >
          <h2>{t('benefits.heading')}</h2>
          <p>{t('benefits.subtitle')}</p>
        </motion.div>

        <div className="benefits__grid">
          {items.map((item, i) => {
            const icon = icons[i % icons.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="benefits__item"
              >
                <div className="benefits__item-bg">
                  <div className="benefits__item-bg-inner" />
                </div>
                <div className="benefits__item-content">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="benefits__icon-wrap"
                  >
                    {icon}
                  </motion.div>
                  <p className="benefits__text">{item}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefit;
