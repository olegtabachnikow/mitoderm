import { unstable_setRequestLocale } from 'next-intl/server';
import Intro from '@/components/Intro/Intro';

export default function HomePage({ params: { lang } }: any) {
  unstable_setRequestLocale(lang);
  return (
    <main>
      <Intro />
    </main>
  );
}
