'use client';
import { FC, useEffect } from 'react';
import styles from './GalleryWrapper.module.scss';
import useAppStore from '@/store/store';
import { useMediaQuery } from 'react-responsive';
import GalleryDesktop from '../GalleryDesktop/GalleryDesktop';
import GalleryMobile from '../GalleryMobile/GalleryMobile';

interface Props {
  itemList: Array<[string, string]>;
}

const GalleryWrapper: FC<Props> = ({ itemList }) => {
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 1224px)',
  });
  const { galleryPage, setGalleryPage, isFirstRender, setIsFirstRender } =
    useAppStore((state) => state);

  const scrollTo = () => {
    if (isFirstRender) {
      return;
    }
    const element = document.getElementById(`item${galleryPage}`);
    if (galleryPage >= itemList.length) setGalleryPage(0);
    if (galleryPage < 0) setGalleryPage(itemList.length - 1);
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    });
  };

  useEffect(() => {
    scrollTo();
  }, [galleryPage]);

  const increment = () => {
    setIsFirstRender(false);
    itemList.length >= galleryPage
      ? setGalleryPage(galleryPage + 1)
      : setGalleryPage(0);
  };
  const decrement = () => {
    setIsFirstRender(false);
    galleryPage <= 0
      ? setGalleryPage(itemList.length - 1)
      : setGalleryPage(galleryPage - 1);
  };

  return (
    <div className={styles.container}>
      {isTabletOrMobile ? (
        <GalleryMobile
          disabledLeft={
            // galleryPage === 0
            false
          }
          disabledRight={
            // galleryPage === itemList.length - 1
            false
          }
          onClickLeft={decrement}
          onClickRight={increment}
          items={itemList}
        />
      ) : (
        <GalleryDesktop
          disabledLeft={
            // galleryPage === 0
            false
          }
          disabledRight={
            // galleryPage === itemList.length - 1
            false
          }
          onClickLeft={decrement}
          onClickRight={increment}
          items={itemList}
        />
      )}
    </div>
  );
};

export default GalleryWrapper;
