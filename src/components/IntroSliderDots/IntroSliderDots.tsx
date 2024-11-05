import { FC, useState } from 'react';
import styles from './IntroSliderDots.module.css';

const IntroSliderDots: FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const handleClick = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <div className={styles.container}>
      <button
        onClick={() => handleClick(0)}
        className={
          currentPage === 0
            ? styles.active + ' ' + styles.button
            : styles.button
        }
      />
      <button
        onClick={() => handleClick(1)}
        className={
          currentPage === 1
            ? styles.active + ' ' + styles.button
            : styles.button
        }
      />
      <button
        onClick={() => handleClick(2)}
        className={
          currentPage === 2
            ? styles.active + ' ' + styles.button
            : styles.button
        }
      />
    </div>
  );
};

export default IntroSliderDots;
