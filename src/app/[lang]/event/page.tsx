import { unstable_setRequestLocale } from 'next-intl/server';
import Intro from '@/components/Intro/Intro';
import Gallery from '@/components/Gallery/Gallery';
import Contact from '@/components/Contact/Contact';
import About from '@/components/About/About';
import Mission from '@/components/Mission/Mission';
import Button from '@/components/Shared/Button/Button';
import { useTranslations } from 'next-intl';
import Event from '@/components/Event/Event';
import FirstLook from '@/components/FirstLook/FirstLook';

export default function EventPage({ params: { lang } }: any) {
  unstable_setRequestLocale(lang);
  const t = useTranslations();
  return (
    <main>
      <Intro />
      <FirstLook />
      <Event />
      <Contact />
      <Gallery />
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Button
          style={{ margin: '20px auto 40px auto' }}
          colored
          text={t('buttons.seat')}
        />
      </div>
      <About />
      <Mission />
    </main>
  );
}
