import { FC } from 'react';
import styles from './MobileButtons.module.scss';
import ArrowButton from '../ArrowButton/ArrowButton';

interface Props {
  disabledLeft: boolean;
  disabledRight: boolean;
  onClickLeft: () => void;
  onClickRight: () => void;
}

const MobileButtons: FC<Props> = ({
  disabledLeft,
  disabledRight,
  onClickLeft,
  onClickRight,
}) => {
  return (
    <div className={styles.mobileButtons}>
      <ArrowButton
        disabled={disabledLeft}
        colored
        dark
        reversed
        onClick={onClickLeft}
      />
      <ArrowButton
        disabled={disabledRight}
        colored
        dark
        onClick={onClickRight}
      />
    </div>
  );
};

export default MobileButtons;
