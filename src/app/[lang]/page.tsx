import Intro from '@/components/Intro/Intro';
import Header from '@/components/Header/Header';
import HowToUse from '@/components/HowToUse/HowToUse';
import About from '@/components/About/About';
import { unstable_setRequestLocale } from 'next-intl/server';

export default function HomePage({ params: { lang } }: any) {
  unstable_setRequestLocale(lang);
  return (
    <div>
      <Header />
      <main>
        <Intro />
        <HowToUse />
        <About />
      </main>
      <footer></footer>
    </div>
  );
}
