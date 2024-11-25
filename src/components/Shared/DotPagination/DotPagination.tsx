import { CSSProperties, FC } from 'react';
import styles from './DotPagination.module.scss';

type DotProps = {
  index: number;
  active?: boolean;
};

const Dot: FC<DotProps> = ({ index, active }) => {
  return <button className={active ? styles.dotActive : styles.dot} />;
};

interface Props {
  count: number;
  style?: CSSProperties;
}

const DotPagination: FC<Props> = ({ count, style }) => {
  const arr = Array.from(Array(count).keys());
  return (
    <div style={style} className={styles.container}>
      {arr.map((item: any, i: number) => (
        <Dot key={i} index={i} active={i === 0} />
      ))}
    </div>
  );
};

export default DotPagination;
