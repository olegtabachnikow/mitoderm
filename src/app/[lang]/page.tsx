'use client';
import Intro from '@/components/Intro/Intro';
import Header from '@/components/Header/Header';
import HowToUse from '@/components/HowToUse/HowToUse';
import About from '@/components/About/About';

export const HomePage = () => {
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

export default HomePage;
