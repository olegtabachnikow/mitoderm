'use client';
import { FC } from 'react';
import styles from './AdminDoctorPage.module.scss';
import { DoctorType } from '@/types';
import { useTranslations } from 'next-intl';
import AdminAddButton from '../AdminAddButton/AdminAddButton';
import { useMediaQuery } from 'react-responsive';
import AdminListItem from '../AdminListItem/AdminListItem';

interface Props {
  doctors: DoctorType[];
}

const AdminDoctorPage: FC<Props> = ({ doctors }) => {
  const t = useTranslations();
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <main className={styles.root}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Doctors</h1>
          <p
            className={`${styles.subtitle} ${isMobile ? styles.subtitleMobile : ''}`}
          >
            Manage list of doctors
          </p>
        </div>
        <AdminAddButton
          // onClick={() => setIsModalOpen(true)}
          onClick={() => {}}
          text="Add Doctor"
        />
      </div>
      <div className={styles.doctorList}>
        {doctors.map((doctor) => (
          <AdminListItem key={doctor._id} onEdit={() => {}} onDelete={() => {}}>
            <div className={styles.doctorInfo}>
              <span className={styles.doctorInfoItem}>
                <span className={styles.doctorInfoItemLabel}>Name:</span>{' '}
                {doctor.name}
              </span>
              <span className={styles.doctorInfoItem}>
                <span className={styles.doctorInfoItemLabel}>City:</span>{' '}
                {doctor.city}
              </span>
              <span className={styles.doctorInfoItem}>
                <span className={styles.doctorInfoItemLabel}>Area:</span>{' '}
                {doctor.area}
              </span>
              <span className={styles.doctorInfoItem}>
                <span className={styles.doctorInfoItemLabel}>Profession:</span>{' '}
                {doctor.profession}
              </span>
              <span className={styles.doctorInfoItem}>
                <span className={styles.doctorInfoItemLabel}>Contact:</span>{' '}
                {doctor.contact}
              </span>
              <span className={styles.doctorInfoItem}>
                <span className={styles.doctorInfoItemLabel}>Instagram:</span>{' '}
                {doctor.instagram}
              </span>
            </div>
          </AdminListItem>
        ))}
      </div>
    </main>
  );
};

export default AdminDoctorPage;
