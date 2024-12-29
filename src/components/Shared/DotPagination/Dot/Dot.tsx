'use client';
import { FC } from 'react';
import styles from './Dot.module.scss';
import useAppStore from '@/store/store';

type DotProps = {
  index: number;
  active?: boolean;
  colored?: boolean;
  gallery?: boolean;
};

const Dot: FC<DotProps> = ({ colored, index, active, gallery }) => {
  const { galleryPage, setGalleryPage, setIsFirstRender } = useAppStore(
    (state) => state
  );

  const handleClick = () => {
    setIsFirstRender(false);
    gallery && setGalleryPage(index);
  };

  return (
    <button
      name='pagination dot'
      onClick={handleClick}
      className={`${colored ? styles.colored : ''} ${
        active ? styles.dotActive : styles.dot
      } ${gallery && galleryPage === index ? styles.dotActive : styles.dot}`}
    />
  );
};

export default Dot;
