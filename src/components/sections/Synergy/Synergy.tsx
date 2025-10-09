import { FC } from 'react';
import styles from './Synegry.module.scss';
import { useTranslations } from 'next-intl';
import Button from '../../sharedUI/Button/Button';

interface Props {
  page?: 'hair';
}

const Synergy: FC<Props> = ({ page }) => {
  const t = useTranslations();
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <span className={styles.title}>{t('synergy.title')}</span>
        <div className={styles.items}>
          <div className={styles.item}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: 220,
                height: 180,
                objectFit: 'cover',
                borderRadius: '24px',
              }}
            >
              <source src='/videos/synergy1.webm' type='video/webm' />
              Your browser does not support the video tag.
            </video>
            <span className={styles.subtitle}>{t('synergy.item1.title')}</span>
            <span className={styles.bullet}>{t('synergy.item1.text1')}</span>
            <span className={styles.bullet}>{t('synergy.item1.text2')}</span>
            <span className={styles.bullet}>{t('synergy.item1.text3')}</span>
          </div>
          <div className={styles.item}>
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: 220,
                height: 180,
                objectFit: 'cover',
                borderRadius: '24px',
              }}
            >
              <source src='/videos/synergy2.webm' type='video/webm' />
              Your browser does not support the video tag.
            </video>
            <span className={styles.subtitle}>{t('synergy.item2.title')}</span>
            <span className={styles.bullet}>{t('synergy.item2.text')}</span>
          </div>
          {page === 'hair' ? (
            <div className={styles.item}>
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: 220,
                  height: 180,
                  objectFit: 'cover',
                  borderRadius: '24px',
                }}
              >
                <source src='/videos/synergy4.mp4' type='video/webm' />
                Your browser does not support the video tag.
              </video>
              <span className={styles.subtitle}>
                {t('synergy.item4.title')}
              </span>
              <span className={styles.bullet}>{t('synergy.item4.text1')}</span>
              <span className={styles.bullet}>{t('synergy.item4.text2')}</span>
              <span className={styles.bullet}>{t('synergy.item4.text3')}</span>
            </div>
          ) : (
            <div className={styles.item}>
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: 220,
                  height: 180,
                  objectFit: 'cover',
                  borderRadius: '24px',
                }}
              >
                <source src='/videos/synergy3.webm' type='video/webm' />
                Your browser does not support the video tag.
              </video>
              <span className={styles.subtitle}>
                {t('synergy.item3.title')}
              </span>
              <span className={styles.bullet}>{t('synergy.item3.text')}</span>
            </div>
          )}
        </div>
      </div>
      <Button formPage='main' text={t('buttons.contactForPrice')} />
    </section>
  );
};

export default Synergy;
