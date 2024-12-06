'use client';
import { CSSProperties, FC } from 'react';
import styles from './DotPagination.module.scss';
import useAppStore from '@/store/store';
import Dot from './Dot/Dot';

interface Props {
  count: number;
  style?: CSSProperties;
  colored?: boolean;
  gallery?: boolean;
}

const DotPagination: FC<Props> = ({ colored, count, style, gallery }) => {
  const galleryPage = useAppStore((state) => state.galleryPage);
  const arr = Array.from(Array(count).keys());
  return (
    <div style={style} className={styles.container}>
      {arr.map((item: any, i: number) => (
        <Dot
          gallery={gallery}
          colored={colored}
          key={i}
          index={i}
          active={galleryPage === i}
        />
      ))}
    </div>
  );
};

export default DotPagination;
