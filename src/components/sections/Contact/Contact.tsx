import { FC } from 'react';
import styles from './Contact.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import ContactLink from './ContactLink/ContactLink';

const Contact: FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <section id='contact' className={styles.section}>
      <div className={styles.content}>
        <div className={styles.contacts}>
          <div className={styles.contactsItem}>
            <span className={styles.contactsItemTitle}>
              {t('contactUs.item1title')}
            </span>
            <p>
              <span className={styles.text}>{t('contactUs.phone')}</span>
              <span className={styles.text}>
                {t('contactUs.phoneText')}
                <a
                  style={{ margin: 5 }}
                  dir='ltr'
                  href=' https://wa.me/972547621889'
                  target='_blank'
                >
                  {' 0547621889 '}
                </a>
              </span>
            </p>
            <p>
              <span className={styles.text}>{t('contactUs.address')}</span>
              <span className={styles.text}>{t('contactUs.addressText')}</span>
            </p>
            <p>
              <span className={styles.text}>{t('contactUs.email')}</span>
              <a href='mailto:info@mitoderm.com' className={styles.text}>
                {t('contactUs.emailText')}
              </a>
            </p>
          </div>
          <div className={styles.contactsItem}>
            <span className={styles.contactsItemTitle}>
              {t('contactUs.item2title')}
            </span>
            <div className={styles.item2textBox}>
              <div className={styles.column}>
                <span className={`${styles.text} ${styles.item2text}`}>
                  {t('contactUs.workWeek')}
                </span>
                <span className={`${styles.text} ${styles.item2text}`}>
                  {t('contactUs.friday')}
                </span>
                <span className={`${styles.text} ${styles.item2text}`}>
                  {t('contactUs.saturday')}
                </span>
                <span className={`${styles.text} ${styles.item2text}`}>
                  {t('contactUs.followUs')}
                </span>
              </div>
              <div className={styles.column}>
                <span className={`${styles.text} ${styles.item2text}`}>
                  9:00 - 21:00
                </span>
                <span className={`${styles.text} ${styles.item2text}`}>
                  {t('contactUs.fridayText')}
                </span>
                <span className={`${styles.text} ${styles.item2text}`}>
                  {t('contactUs.closed')}
                </span>
                <div
                  className={`${styles.linkBox} ${
                    locale === 'he' && styles.he
                  }`}
                >
                  <ContactLink
                    imageLink='/images/contacts/instagram.svg'
                    url={process.env.NEXT_PUBLIC_LINK_INSTAGRAM as string}
                  />
                  <ContactLink
                    imageLink='/images/contacts/tiktok.svg'
                    url={process.env.NEXT_PUBLIC_LINK_TIKTOK as string}
                  />
                  <ContactLink
                    imageLink='/images/contacts/google.svg'
                    url={process.env.NEXT_PUBLIC_LINK_GOOGLE as string}
                  />
                  <ContactLink
                    imageLink='/images/contacts/facebook.svg'
                    url={process.env.NEXT_PUBLIC_LINK_FACEBOOK as string}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
