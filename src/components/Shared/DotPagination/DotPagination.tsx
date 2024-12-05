import { CSSProperties, FC } from 'react';
import styles from './DotPagination.module.scss';

type DotProps = {
  index: number;
  active?: boolean;
  colored?: boolean;
};

const Dot: FC<DotProps> = ({ colored, index, active }) => {
  return (
    <button
      className={`${colored ? styles.colored : ''} ${
        active ? styles.dotActive : styles.dot
      }`}
    />
  );
};

interface Props {
  count: number;
  style?: CSSProperties;
  colored?: boolean;
}

const DotPagination: FC<Props> = ({ colored, count, style }) => {
  const arr = Array.from(Array(count).keys());
  return (
    <div style={style} className={styles.container}>
      {arr.map((item: any, i: number) => (
        <Dot colored={colored} key={i} index={i} active={i === 0} />
      ))}
    </div>
  );
};

export default DotPagination;
