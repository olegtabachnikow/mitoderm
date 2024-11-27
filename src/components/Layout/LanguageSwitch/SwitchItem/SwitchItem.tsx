import { CSSProperties, FC } from 'react';
import styles from './SwitchItem.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';

interface Props {
  url: string;
  style?: CSSProperties;
  imageSrc: string;
}

const SwitchItem: FC<Props> = ({ url, style, imageSrc }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  return (
    <Link
      className={`${styles.link} ${isTabletOrMobile && styles.linkMobile}`}
      style={style}
      href={url}
    >
      <Image
        src={imageSrc}
        alt='flag'
        width={isTabletOrMobile ? 16 : 20}
        height={isTabletOrMobile ? 16 : 20}
      />
      <span className={styles.text}>{url.replaceAll('/', '')}</span>
    </Link>
  );
};

export default SwitchItem;
