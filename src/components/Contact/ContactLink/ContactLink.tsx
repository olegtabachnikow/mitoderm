import Image from 'next/image';
import { FC } from 'react';
import styles from './ContactLink.module.scss';

interface Props {
  imageLink: string;
  url: string;
}

const ContactLink: FC<Props> = ({ imageLink, url }) => {
  return (
    <a className={styles.link} target='_blank' href={url}>
      <Image src={imageLink} width={25} height={25} alt='social icon' />
    </a>
  );
};

export default ContactLink;
