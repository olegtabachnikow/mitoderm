'use client';
import { Dispatch, FC, SetStateAction, useState, useEffect } from 'react';
import styles from './DoctorForm.module.scss';
import { useRouter } from 'next/navigation';
import { DoctorType } from '@/types';
import AdminFormSubmitButton from '@/components/Admin/AdminFormSubmitButton/AdminFormSubmitButton';
import { motion } from 'motion/react';

export const initialFormData: DoctorType = {
  _id: '',
  name: '',
  city: '',
  area: 'מרכז',
  profession: '1',
  contact: '',
  instagram: '',
  createdAt: '',
  updatedAt: '',
};

interface Props {
  doctor: DoctorType | null;
  setDoctor: Dispatch<SetStateAction<DoctorType | null>>;
  isOpen: boolean;
  onClose: () => void;
}

type DoctorFormField =
  | 'name'
  | 'city'
  | 'area'
  | 'profession'
  | 'contact'
  | 'instagram';

const DoctorForm: FC<Props> = ({ doctor, setDoctor, onClose, isOpen }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState<DoctorType>(
    doctor || initialFormData,
  );
  const [errors, setErrors] = useState<
    Partial<Record<DoctorFormField, string>>
  >({});

  useEffect(() => {
    if (!doctor) {
      setFormData(initialFormData);
      return;
    }

    setFormData({
      _id: doctor._id,
      name: doctor.name,
      city: doctor.city,
      area: doctor.area,
      profession: doctor.profession,
      contact: doctor.contact,
      instagram: doctor.instagram,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
    });
  }, [doctor]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const field = name as DoctorFormField;

    setFormData((prev) => ({
      ...prev,
      [field]: value as DoctorType[DoctorFormField],
    }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<DoctorFormField, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.contact.trim()) {
      newErrors.contact = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAdd = async () => {
    const { _id, ...doctorData } = formData;
    const res = await fetch('/api/doctors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(doctorData),
    });
    const data = await res.json();
    data && router.refresh();
  };

  const handleEdit = async () => {
    const res = await fetch('/api/doctors', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    router.refresh();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    if (formData._id.length) {
      handleEdit();
    } else handleAdd();

    setIsSubmitting(false);

    setFormData(initialFormData);

    setDoctor(null);

    router.refresh();
    onClose();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="username">
        Full name
      </label>
      <input
        id="username"
        name="name"
        type="text"
        placeholder="Full name"
        onChange={handleChange}
        defaultValue={doctor?.name || ''}
      />
      {errors.name && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.errorText}
        >
          {errors.name}
        </motion.p>
      )}
      <label className={styles.label} htmlFor="city">
        City
      </label>
      <input
        id="city"
        name="city"
        type="text"
        placeholder="City"
        onChange={handleChange}
        defaultValue={doctor?.city || ''}
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
      <label className={styles.label} htmlFor="contact">
        Phone number
      </label>
      <input
        id="contact"
        name="contact"
        type="tel"
        placeholder="Phone number"
        onChange={handleChange}
        defaultValue={doctor?.contact || ''}
      />
      {errors.contact && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={styles.errorText}
        >
          {errors.contact}
        </motion.p>
      )}
      <label className={styles.label} htmlFor="profession">
        Expertise
      </label>
      <select
        id="profession"
        name="profession"
        onChange={handleChange}
        defaultValue={doctor?.profession || '1'}
      >
        <option value="" disabled>
          Select Expertise
        </option>
        <option value="1">Facial treatments</option>
        <option value="2">Hair treatments</option>
        <option value="3">Facial & Hair Treatments</option>
      </select>
      <label className={styles.label} htmlFor="area">
        Area
      </label>
      <select id="area" name="area" onChange={handleChange}>
        <option value="" disabled>
          Select area
        </option>
        <option value="צפון">North</option>
        <option value="מרכז">Center</option>
        <option value="דרום">South</option>
      </select>
      <label className={styles.label} htmlFor="instagram">
        Instagram
      </label>
      <input
        id="instagram"
        name="instagram"
        type="text"
        placeholder="Instagram"
        onChange={handleChange}
        defaultValue={doctor?.instagram || ''}
      />
      <AdminFormSubmitButton isSubmitting={isSubmitting} isEditing={!!doctor} />
    </form>
  );
};

export default DoctorForm;
