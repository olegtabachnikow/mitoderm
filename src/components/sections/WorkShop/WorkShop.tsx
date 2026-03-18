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
import EventExosomes from '../EventExosomes/EventExosomes';
import EventStats from '../EventStats/EventStats';
import EventContacts from '../EventContacts/EventContacts';
import EventUnique from '../EventUnique/EventUnique';

const WorkShop: FC = () => {
  const [variant, setVariant] = useState<WorkshopVariant>('990');
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
      <AgendaAccordion variant={variant} />
      <Benefit variant={variant} />
      <EventUnique variant={variant} />
      <EventExosomes variant={variant} />
      <EventStats />
      <EventContacts />
    </main>
  );
};

export default WorkShop;
