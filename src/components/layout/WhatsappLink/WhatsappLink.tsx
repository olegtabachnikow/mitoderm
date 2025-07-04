'use client';
import { FC } from 'react';
import styles from './WhatsappLink.module.scss';
import { useLocale } from 'next-intl';

const WhatsappLink: FC = () => {
  const locale = useLocale();
  const phone = '972547621889';

  const messages: Record<string, string> = {
    en: 'Hello, can I get information about exosomes?',
    he: 'שלום, אפשר לקבל מידע לגבי אקסוזומים?',
    ru: 'Здравствуйте, можно получить информацию об экзосомах?',
  };

  const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(
    messages[locale] || messages.en
  )}`;

  return (
    <a
      className={`${styles.link} ${locale === 'he' && styles.he}`}
      href={whatsappUrl}
      target='_blank'
      rel='noopener noreferrer'
    >
      <img src='/images/whatsappIcon.svg' alt='WhatsApp' />
    </a>
  );
};

export default WhatsappLink;
