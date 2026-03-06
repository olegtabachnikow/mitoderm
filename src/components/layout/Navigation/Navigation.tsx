'use client';
import { FC } from 'react';
import styles from './Navigation.module.scss';
import { motion } from 'framer-motion';
import {
  navMainList,
  navEventList,
  navFormList,
  navDoctorList,
} from '@/constants';
import { NavItem } from '@/types';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from 'react-responsive';
import { usePathname, Link } from '@/i18n/routing';
import NavigationProductButton from './NavigationProductButton/NavigationProductButton';

const navigationVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.1, delay: i * 0.1 + 0.4 },
  }),
};

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navigation: FC<Props> = ({ isOpen, setIsOpen }) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
  const pathName = usePathname();
  const isFormPage = pathName.includes('form');
  const isSuccessPage = pathName.includes('success');
  const isDoctorPage = pathName.includes('doctors');

  let navList;

  switch (true) {
    case isFormPage || isSuccessPage:
      navList = navFormList;
      break;

    case isDoctorPage:
      navList = navDoctorList;
      break;

    case pathName.includes('event'):
      navList = navEventList;
      break;

    default:
      navList = navMainList;
  }

  const randomString = () => (Math.random() + 1).toString(36).substring(7);

  const t = useTranslations();

  const handleClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isTabletOrMobile ? (
        <motion.nav
          variants={navigationVariants}
          initial="hidden"
          animate={isOpen ? 'show' : 'hidden'}
          aria-label="Main Navigation"
          className={`${styles.mobileNavigation} ${isOpen && styles.active}`}
        >
          <NavigationProductButton isMobile handleClick={handleClick} />
          {navList.map((item: NavItem, index: number) => (
            <motion.div
              custom={index}
              variants={itemVariants}
              className={styles.linkContainerMobile}
              key={`item${index + Math.random()}`}
            >
              {!item.scrollId && !item.url ? (
                <motion.button
                  custom={index}
                  variants={itemVariants}
                  onClick={handleClick}
                  key={index + randomString()}
                  className={styles.buttonMobile}
                >
                  {t(item.text)}
                </motion.button>
              ) : (
                <motion.div variants={itemVariants} custom={index}>
                  <Link
                    onClick={handleClick}
                    href={item.url ? item.url : `#${item.scrollId}`}
                    key={index + randomString()}
                    className={styles.buttonMobile}
                  >
                    {t(item.text)}
                  </Link>
                </motion.div>
              )}
            </motion.div>
          ))}
          {pathName.length > 1 && (
            <motion.div
              custom={navList?.length}
              variants={itemVariants}
              className={styles.linkContainerMobile}
            >
              <Link
                onClick={handleClick}
                href={'/'}
                className={styles.buttonMobile}
              >
                {t('navigation.homepage')}
              </Link>
            </motion.div>
          )}
        </motion.nav>
      ) : (
        <nav
          className={`${styles.navigation} ${
            isFormPage || isSuccessPage ? styles.formPage : ''
          } ${isDoctorPage ? styles.doctorPage : ''}`}
        >
          <NavigationProductButton />
          {navList.map((item: NavItem, index: number) => (
            <div
              className={styles.linkContainer}
              key={`item${index + Math.random()}`}
            >
              {!item.scrollId && !item.url ? (
                <button
                  onClick={() => setIsOpen(false)}
                  key={index + randomString()}
                  className={styles.button}
                >
                  {t(item.text)}
                </button>
              ) : (
                <Link
                  href={item.url ? item.url : `#${item.scrollId}`}
                  key={index + randomString()}
                  className={styles.button}
                >
                  {t(item.text)}
                </Link>
              )}
            </div>
          ))}
        </nav>
      )}
    </>
  );
};

export default Navigation;
