import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import './globals.css';
import { Rubik } from 'next/font/google';

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
  params: { locale: string };
}>) {
  const messages = await getMessages();
  return (
    <html lang={params.locale}>
      <NextIntlClientProvider messages={messages}>
        <body className={rubik.className}>{children}</body>
      </NextIntlClientProvider>
    </html>
  );
}
