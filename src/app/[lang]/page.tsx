import Intro from '@/components/Intro/Intro';
import Header from '@/components/Header/Header';

export const Page = () => {
  return (
    <div>
      <Header />
      <main>
        <Intro />
      </main>
      <footer></footer>
    </div>
  );
};

export default Page;
