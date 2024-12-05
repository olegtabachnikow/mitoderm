'use client';
import Image from 'next/image';
import { FC } from 'react';
import styles from './ContactLink.module.scss';
import { useMediaQuery } from 'react-responsive';

interface Props {
  imageLink: string;
  url: string;
}

const ContactLink: FC<Props> = ({ imageLink, url }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  return (
    <a className={styles.link} target='_blank' href={url}>
      <Image
        src={imageLink}
        width={isTabletOrMobile ? 35 : 25}
        height={isTabletOrMobile ? 35 : 25}
        alt='social icon'
      />
    </a>
  );
};

export default ContactLink;
