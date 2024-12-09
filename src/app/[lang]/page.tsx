import { unstable_setRequestLocale } from 'next-intl/server';
import Intro from '@/components/Intro/Intro';
import HowCanBeUsed from '@/components/HowCanBeUsed/HowCanBeUsed';
import About from '@/components/About/About';
import Solution from '@/components/Solution/Solution';
import Mission from '@/components/Mission/Mission';
import Faq from '@/components/Faq/Faq';
import Contact from '@/components/Contact/Contact';
import Gallery from '@/components/Gallery/Gallery';
import Reviews from '@/components/Reviews/Reviews';

export default function HomePage({ params: { lang } }: any) {
  unstable_setRequestLocale(lang);
  return (
    <main>
      <Intro />
      <HowCanBeUsed />
      <About />
      <Solution />
      <Reviews />
      <Gallery />
      <Mission />
      <Faq />
      <Contact />
    </main>
  );
}
