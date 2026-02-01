'use client';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DoctorType } from '@/types';

interface Props {
  doctor: DoctorType;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DoctorForm: FC<Props> = ({ doctor, setIsOpen }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<DoctorType>(doctor);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    if (formData._id.length) {
      handleEdit();
    } else handleAdd();
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Full name</label>
      <input
        id="name"
        name="name"
        type="text"
        required
        onChange={handleChange}
        aria-required="true"
        defaultValue={doctor?.name || ''}
      />
      <label htmlFor="city">City</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        onChange={handleChange}
        aria-required="true"
        defaultValue={doctor?.city || ''}
      />
      <label htmlFor="contact">Phone</label>
      <input
        id="contact"
        name="contact"
        type="tel"
        required
        onChange={handleChange}
        aria-required="true"
        defaultValue={doctor?.contact || ''}
      />
      <label htmlFor="profession">Profession</label>
      <select
        id="profession"
        name="profession"
        required
        onChange={handleChange}
        aria-required="true"
        defaultValue={doctor?.profession || '1'}
      >
        <option value="" disabled>
          Select profession
        </option>
        <option value="1">Cosmetologist</option>
        <option value="2">Trichologist</option>
      </select>
      <label htmlFor="status">Status</label>
      <label htmlFor="area">Area</label>
      <select
        id="area"
        name="area"
        required
        onChange={handleChange}
        aria-required="true"
        defaultValue={doctor?.area || 'מרכז'}
      >
        <option value="צפון">North</option>
        <option value="דרום">Center</option>
        <option value="מרכז">South</option>
      </select>
      <label htmlFor="instagram">Instagram</label>
      <input
        id="instagram"
        name="instagram"
        type="text"
        required
        onChange={handleChange}
        aria-required="true"
        defaultValue={doctor?.instagram || ''}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default DoctorForm;
