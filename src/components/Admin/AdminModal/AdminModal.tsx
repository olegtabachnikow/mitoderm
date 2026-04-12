'use client';

import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './AdminModal.module.scss';
import Image from 'next/image';
import type { WorkshopVariant, Event } from '@/types';
import { useRouter } from 'next/navigation';
import { revalidatePath } from 'next/cache';

interface FormData {
  type: WorkshopVariant;
  city: string;
  date: string;
  from: string;
  to: string;
  isAvailable: boolean;
}

interface Props {
  editingProgram: Event | null;
  setEditingProgram: (program: Event | null) => void;
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData: FormData = {
  type: '990',
  city: '',
  date: '',
  from: '',
  to: '',
  isAvailable: true,
};

function dateToDateInputValue(date: Date): string {
  const parsedDate = new Date(date);
  const y = parsedDate.getFullYear();
  const m = String(parsedDate.getMonth() + 1).padStart(2, '0');
  const day = String(parsedDate.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

const AdminModal: FC<Props> = ({
  editingProgram,
  setEditingProgram,
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(editingProgram);
    if (!editingProgram) {
      setFormData(initialFormData);
      return;
    }

    const [from = '', to = ''] = editingProgram.time.split('-');

    setFormData({
      type: String(editingProgram.category) as WorkshopVariant,
      city: editingProgram.city,
      date: dateToDateInputValue(editingProgram.date),
      from,
      to,
      isAvailable: editingProgram.isAvailable,
    });
  }, [editingProgram]);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};

    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const isValidTimeRange = (from: string, to: string) => {
      return timeToMinutes(from) < timeToMinutes(to);
    };

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.date.trim()) {
      newErrors.date = 'Date is required';
    }

    if (!formData.from.trim()) {
      newErrors.from = 'From time is required';
    } else if (!isValidTimeRange(formData.from, formData.to)) {
      newErrors.from = 'Incorrect time range';
      newErrors.to = ' ';
    }

    if (!formData.to.trim()) {
      newErrors.to = 'Time is required';
    } else if (!isValidTimeRange(formData.from, formData.to)) {
      newErrors.from = 'Incorrect time range';
      newErrors.to = ' ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    const timeRange = `${formData.from}-${formData.to}`;

    const response = await fetch('/api/events', {
      method: editingProgram ? 'PUT' : 'POST',
      body: JSON.stringify({
        _id: editingProgram?.id,
        category: formData.type,
        city: formData.city,
        date: formData.date,
        time: timeRange,
        expireAt: formData.date,
      }),
    });
    const data = await response.json();
    console.log(data);

    setIsSubmitting(false);

    setFormData({
      type: '990',
      city: '',
      date: '',
      from: '',
      to: '',
      isAvailable: true,
    });

    setEditingProgram(null);

    router.refresh();
    onClose();
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={styles.backdrop}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className={styles.modalWrap}
          >
            <div className={styles.modal}>
              <div className={styles.header}>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className={styles.closeBtn}
                >
                  <Image
                    src="/images/icons/x.svg"
                    width={24}
                    height={24}
                    alt="close"
                    className={styles.closeIcon}
                  />
                </motion.button>

                <h2 className={styles.title}>Add Program</h2>
                <p className={styles.subtitle}>
                  Enter the details and we will get back to you in advance
                </p>

                <div className={styles.decor1} />
                <div className={styles.decor2} />
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.field}>
                  <label className={styles.label}>
                    <span>Type</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className={`${styles.input} ${styles.select} ${errors.type && styles.inputError}`}
                  >
                    <option value="990">990</option>
                    <option value="180">180</option>
                    <option value="480">480</option>
                  </select>
                  {errors.type && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={styles.errorText}
                    >
                      {errors.type}
                    </motion.p>
                  )}
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>
                    <span>City</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className={`${styles.input} ${errors.city && styles.inputError}`}
                    placeholder="Enter city"
                  />
                  {errors.city && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={styles.errorText}
                    >
                      {errors.city}
                    </motion.p>
                  )}
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className={`${styles.input} ${errors.date && styles.inputError}`}
                    placeholder="Enter date"
                  />
                  {errors.date && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={styles.errorText}
                    >
                      {errors.date}
                    </motion.p>
                  )}
                </div>
                <div className={styles.timeRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>
                      <span>From</span>
                    </label>
                    <input
                      type="time"
                      step={900}
                      value={formData.from}
                      onChange={(e) => handleChange('from', e.target.value)}
                      className={`${styles.input} ${errors.from && styles.inputError}`}
                    />
                    {errors.from && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.errorText}
                      >
                        {errors.from}
                      </motion.p>
                    )}
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>
                      <span>To</span>
                    </label>
                    <input
                      type="time"
                      step={900}
                      value={formData.to}
                      onChange={(e) => handleChange('to', e.target.value)}
                      className={`${styles.input} ${errors.to && styles.inputError}`}
                    />
                    {errors.to && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={styles.errorText}
                      >
                        {errors.to}
                      </motion.p>
                    )}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className={`${styles.submitBtn} ${isSubmitting && styles.submitBtnDisabled}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className={styles.spinner} />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>{editingProgram ? 'Update' : 'Send'}</span>
                      <Image
                        src="/images/icons/submitAdminPage.svg"
                        width={16}
                        height={16}
                        alt="admin arrow right"
                        className={styles.submitIcon}
                      />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdminModal;
