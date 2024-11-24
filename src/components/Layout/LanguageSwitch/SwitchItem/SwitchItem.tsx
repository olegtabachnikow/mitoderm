import { CSSProperties, FC } from 'react';
import styles from './SwitchItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  url: string;
  style?: CSSProperties;
  imageSrc: string;
}

const SwitchItem: FC<Props> = ({ url, style, imageSrc }) => {
  return (
    <Link className={styles.link} style={style} href={url}>
      <Image src={imageSrc} alt='flag' width={20} height={20} />
      <span className={styles.text}>{url.replaceAll('/', '')}</span>
    </Link>
  );
};

export default SwitchItem;
