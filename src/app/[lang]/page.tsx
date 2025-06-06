import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import Intro from '@/components/Intro/Intro';
import HowCanBeUsed from '@/components/HowCanBeUsed/HowCanBeUsed';
import Gallery from '@/components/Gallery/Gallery';

const Solution = dynamic(() => import('@/components/Solution/Solution'), {
  ssr: false,
});

// const Reviews = dynamic(() => import('@/components/Reviews/Reviews'), {
//   ssr: false,
// });

// const About = dynamic(() => import('@/components/About/About'), {
//   ssr: false,
// });

const Mission = dynamic(() => import('@/components/Mission/Mission'), {
  ssr: false,
});

const CenterList = dynamic(() => import('@/components/CenterList/CenterList'), {
  ssr: false,
});

const Faq = dynamic(() => import('@/components/Faq/Faq'), {
  ssr: false,
});

const Contact = dynamic(() => import('@/components/Contact/Contact'), {
  ssr: false,
});

const Chevron = dynamic(() => import('@/components/Chevron/Chevron'));

const Synergy = dynamic(() => import('@/components/Synergy/Synergy'));

export default function HomePage({ params: { lang } }: any) {
  unstable_setRequestLocale(lang);
  return (
    <main id='mainpage'>
      <Intro />
      <Chevron />
      <Synergy />
      <HowCanBeUsed />
      <Solution />
      <Gallery />
      <Mission />
      <CenterList />
      <Faq />
      <Contact />
      {/** Unused section in current version  */}
      {/* <About /> */}
      {/* <Reviews /> */}
    </main>
  );
}
