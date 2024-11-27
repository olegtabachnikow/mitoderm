import { FC, ReactNode } from 'react';
import styles from './SolutionItem.module.scss';
import Image from 'next/image';

interface Props {
  imageUrl: string;
  title: string;
  children?: ReactNode;
}

const SolutionItem: FC<Props> = ({ imageUrl, title, children }) => {
  return (
    <div className={styles.container}>
      <Image src={imageUrl} width={86} height={174} alt='medicine image' />
      <p className={styles.title}>{title}</p>
      {children}
    </div>
  );
};

export default SolutionItem;
