import { FC } from 'react';
import styles from './IntroSlider.module.css';
import IntroSliderButton from '../SliderButton/SliderButton';
import { useTranslations } from 'next-intl';
import ContactButton from '../ContactButton/ContactButton';

const IntroSlider: FC = () => {
  const t = useTranslations();
  return (
    <div className={styles.container}>
      <div className={styles.sliderWrapper}>
        <IntroSliderButton
          addStyles={{ marginBottom: '5%', marginLeft: '2%' }}
        />
        <div className={styles.containerInner}>
          <div className={styles.subtitle}>
            <span>{t('intro.item1.subtitleP1')}</span>
            <span className={styles.line} />
            <span>{t('intro.item1.subtitleP2')}</span>
          </div>
          <div>
            <h1 className={styles.title}>{t('intro.item1.titleP1')}</h1>
            <h2 className={styles.title}>{t('intro.item1.titleP2')}</h2>
          </div>
          <div className={styles.introText}>
            <p>{t('intro.item1.text')}</p>
            <ContactButton text={t('buttons.contact')} />
          </div>
        </div>
        <IntroSliderButton
          reverced
          addStyles={{ marginBottom: '5%', marginRight: '2%' }}
        />
      </div>
    </div>
  );
};

export default IntroSlider;
