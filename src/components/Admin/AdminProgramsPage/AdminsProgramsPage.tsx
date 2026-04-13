'use client';

import { FC, useState } from 'react';
import type { Event } from '@/types';
import Image from 'next/image';
import styles from './AdminPrograms.module.scss';
import { useMediaQuery } from 'react-responsive';
import AdminModal from '../AdminModal/AdminModal';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface Props {
  events: Event[];
}

const AdminProgramsPage: FC<Props> = ({ events }) => {
  const t = useTranslations('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Event | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const router = useRouter();

  const getCategoryText = (category: number | string) => {
    switch (parseInt(category.toString())) {
      case 990:
        return t('stickyBar.workshop');
      case 480:
        return t('stickyBar.hours480');
      case 180:
        return t('stickyBar.hours180');
    }
  };

  const handleEdit = (program: Event) => {
    setEditingProgram(program);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProgram(null);
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this program?',
    );
    if (confirmed) {
      const response = await fetch(`/api/events`, {
        method: 'DELETE',
        body: JSON.stringify({ id }),
      });
      const data = await response.json();

      if (data._id) {
        router.refresh();
      }
    }
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.headerRow}>
          <div>
            <h1 className={styles.title}>Programs</h1>
            <p
              className={`${styles.subtitle} ${isMobile ? styles.subtitleMobile : ''}`}
            >
              Manage training programs, schedules and content
            </p>
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={() => setIsModalOpen(true)}
          >
            <Image
              src="/images/icons/plus.svg"
              alt="Add Program"
              width={16}
              height={16}
            />
            Add Program
          </button>
        </div>

        <div className={styles.eventList}>
          {events.map((prog) => {
            return (
              <div key={prog.id} className={styles.programCard}>
                <div className={styles.cardHeaderRow}>
                  <div className={styles.cardBodyMain}>
                    <div className={styles.badgeRow}>
                      <span className={styles.statusBadge}>
                        {new Date(prog.date).toLocaleDateString('he-IL')}
                      </span>
                      <span className={styles.cityBadge}>{prog.time}</span>
                    </div>
                    <h3 className={styles.programTitle}>
                      {getCategoryText(prog.category)}
                    </h3>
                    <div className={styles.metaRow}>
                      <span className={styles.metaItem}>
                        <Image
                          src="/images/icons/mapPin.svg"
                          className={styles.icon3}
                          alt="map pin"
                          width={16}
                          height={16}
                        />
                        {prog.city}
                      </span>
                    </div>
                  </div>
                  <div className={styles.cardActions}>
                    <button
                      type="button"
                      className={styles.editButton}
                      onClick={() => handleEdit(prog)}
                    >
                      <Image
                        src="/images/icons/edit.svg"
                        className={styles.iconActionButton}
                        alt="Edit"
                        width={16}
                        height={16}
                      />
                    </button>
                    <button
                      type="button"
                      className={styles.deleteButton}
                      onClick={() => handleDelete(prog.id)}
                    >
                      <Image
                        src="/images/icons/delete.svg"
                        className={styles.iconActionButton}
                        alt="Delete"
                        width={16}
                        height={16}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AdminModal
        setEditingProgram={setEditingProgram}
        editingProgram={editingProgram}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default AdminProgramsPage;
