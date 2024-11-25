import { unstable_setRequestLocale } from 'next-intl/server';
import Intro from '@/components/Intro/Intro';
import HowCanBeUsed from '@/components/HowCanBeUsed/HowCanBeUsed';
import WhatIs from '@/components/WhatIs/WhatIs';

export default function HomePage({ params: { lang } }: any) {
  unstable_setRequestLocale(lang);
  return (
    <main>
      <Intro />
      <HowCanBeUsed />
      <WhatIs />
    </main>
  );
}
