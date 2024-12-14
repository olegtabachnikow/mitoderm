import type { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import dynamic from 'next/dynamic';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../globals.scss';
import { Rubik } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import Footer from '@/components/Layout/Footer/Footer';

const Header = dynamic(() => import('@/components/Layout/Header/Header'), {
  ssr: false,
});

const Modal = dynamic(() => import('@/components/Layout/Modal/Modal'), {
  ssr: false,
});

const rubik = Rubik({
  weight: ['300', '400', '500', '900'],
  style: 'normal',
  display: 'swap',
  variable: '--font-Rubik',
  subsets: ['latin', 'cyrillic', 'hebrew'],
});

export async function generateStaticParams() {
  return [{ lang: 'en-US' }, { lang: 'he-IL' }, { lang: 'ru-RU' }];
}

export const metadata: Metadata = {
  title: 'MitoDerm',
  description: 'Something will be here',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  const messages = await getMessages();

  if (!routing.locales.includes(params.lang as any)) {
    notFound();
  }

  unstable_setRequestLocale(params.lang);

  return (
    <html lang={params.lang}>
      <NextIntlClientProvider messages={messages}>
        <body
          className={rubik.className}
          dir={params.lang === 'he' ? 'rtl' : 'ltr'}
        >
          <Header />
          <Modal />
          {children}
          <Footer />
        </body>
      </NextIntlClientProvider>
    </html>
  );
}
