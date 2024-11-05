'use client';
import { FC } from 'react';
import styles from './Intro.module.css';
import bg from '../../../public/images/introBG.jpeg';
import Image from 'next/image';
import IntroSlider from '../IntroSlider/IntroSlider';
import IntroSliderDots from '../IntroSliderDots/IntroSliderDots';

const Intro: FC = () => {
  return (
    <section className={styles.container}>
      <Image
        className={styles.background}
        src={bg}
        alt='few cosmetics items'
        layout='responsive'
        quality={100}
      />
      <IntroSlider />
      <IntroSliderDots />
    </section>
  );
};

export default Intro;
