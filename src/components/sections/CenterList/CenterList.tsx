import { FC, useMemo } from 'react';
import styles from './CenterList.module.scss';
import Dropdown from '../../sharedUI/Dropdown/Dropdown';
import { centerItemData } from '@/constants';
import { useTranslations } from 'next-intl';

const CenterList: FC = () => {
  const dropdownList = useMemo(() => <Dropdown data={centerItemData} />, []);
  const t = useTranslations();
  return (
    <section id='clinic' className={styles.container}>
      <span className={styles.title}>{t('faq.centerTitle')}</span>
      <div className={styles.containerInner}>{dropdownList}</div>
    </section>
  );
};

export default CenterList;
