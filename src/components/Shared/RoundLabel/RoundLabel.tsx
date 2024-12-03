import { FC } from 'react';
import styles from './RoundLabel.module.scss';

interface Props {
  text: string;
}

const RoundLabel: FC<Props> = ({ text }) => {
  return <div className={styles.container}>{text}</div>;
};

export default RoundLabel;
