import { unstable_setRequestLocale } from 'next-intl/server';
import Intro from '@/components/Intro/Intro';
import HowCanBeUsed from '@/components/HowCanBeUsed/HowCanBeUsed';
import About from '@/components/About/About';
import Solution from '@/components/Solution/Solution';
import Form from '@/components/Form/Form';

export default function HomePage({ params: { lang } }: any) {
  unstable_setRequestLocale(lang);
  return (
    <main>
      <Intro />
      <HowCanBeUsed />
      <About />
      <Solution />
      <Form />
    </main>
  );
}
