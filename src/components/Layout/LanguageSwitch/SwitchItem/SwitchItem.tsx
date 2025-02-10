import { CSSProperties, FC } from 'react';
import styles from './SwitchItem.module.scss';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import useAppStore from '@/store/store';

interface Props {
  url: string;
  style?: CSSProperties;
  imageSrc: string;
  text: string;
  locale: 'he' | 'en' | 'ru';
}

const SwitchItem: FC<Props> = ({ url, style, imageSrc, text, locale }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const setIsFirstRender = useAppStore((state) => state.setIsFirstRender);

  const handleClick = () => {
    setIsFirstRender(true);
  };
  return (
    <Link
      onClick={handleClick}
      className={`${styles.link} ${isTabletOrMobile && styles.linkMobile}`}
      style={style}
      href={url}
      locale={locale}
    >
      <Image
        src={imageSrc}
        alt='flag'
        width={isTabletOrMobile ? 16 : 20}
        height={isTabletOrMobile ? 16 : 20}
      />
      <span className={styles.text}>{text}</span>
    </Link>
  );
};

export default SwitchItem;
