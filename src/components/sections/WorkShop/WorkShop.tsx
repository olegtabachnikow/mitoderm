'use client';
import { FC, useState } from 'react';
import styles from './WorkShop.module.scss';
import Intro from '../Intro/Intro';
import Benefit from '../Benefit/Benefit';
import CourseSelection from '../CourseSeletion/CourseSelection';
import type { WorkshopVariant } from '@/types';
import InviteSection from '../InviteSection/InviteSection';
import StickyBar from '@/components/sharedUI/StickyBar/StickyBar';
import AgendaAccordion from '../AgendaAccordeon/AgendaAccordeon';

const WorkShop: FC = () => {
  const [variant, setVariant] = useState<WorkshopVariant>('180');
  const [showStickyBar, setShowStickyBar] = useState<boolean>(false);
  return (
    <main className={styles.workshop}>
      <Intro />
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
      <Benefit variant={variant} />
      <AgendaAccordion variant={variant} />
    </main>
  );
};

export default WorkShop;
