'use client';
import { FC, useState } from 'react';
import styles from './WorkShop.module.scss';
import { motion, AnimatePresence } from 'motion/react';
import Intro from '../Intro/Intro';
import Benefit from '../Benefit/Benefit';
import CourseSelection from '../CourseSeletion/CourseSelection';
import type { WorkshopVariant } from '@/types';
import { useTranslations, useLocale } from 'next-intl';
import InviteSection from '../InviteSection/InviteSection';
import StickyBar from '@/components/sharedUI/StickyBar/StickyBar';
import AgendaAccordion from '../AgendaAccordeon/AgendaAccordeon';

interface Props {}

const WorkShop: FC<Props> = () => {
  const [variant, setVariant] = useState<WorkshopVariant>('180');
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);
  const t = useTranslations();
  const locale = useLocale();
  const isRtl = locale === 'he';
  return (
    <main className={styles.workshop}>
      <Intro />
      <Benefit variant={variant} />
      <CourseSelection
        selectedVariant={variant}
        onRegisterClick={() => {}}
        onVariantChange={setVariant}
        onVisibilityChange={(isVisible) => setShowStickyBar(!isVisible)}
      />
      <StickyBar
        isShown={showStickyBar}
        onVariantChange={setVariant}
        selectedVariant={variant}
      />
      <InviteSection variant={variant} />
      <AgendaAccordion variant={variant} />
    </main>
  );
};

export default WorkShop;
