import { FC } from 'react';
import Intro from '@/components/Intro/Intro';
import Header from '@/components/Header/Header';
import HowToUse from '@/components/HowToUse/HowToUse';
import About from '@/components/About/About';

export const MainPage: FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Intro />
        <HowToUse />
        <About />
      </main>
      <footer></footer>
    </div>
  );
};

export default MainPage;
