'use client';
import { FC, SetStateAction, Dispatch } from 'react';
import { DoctorType } from '@/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Props {
  doctor: DoctorType;
  setCurrentDoctor: Dispatch<SetStateAction<DoctorType>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DoctorItem: FC<Props> = ({ doctor, setCurrentDoctor, setIsOpen }) => {
  const router = useRouter();
  const handleDelete = async () => {
    await fetch('/api/doctors', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: doctor._id,
      }),
    });
    // const data = await res.json();
    router.refresh();
  };

  const handleEdit = () => {
    setCurrentDoctor(doctor);
    setIsOpen(true);
  };

  return (
    <div>
      <span>{`name 
    ${doctor.name} 
    city 
    ${doctor.city} 
    contact 
    ${doctor.contact} 
    instagram
    ${doctor.instagram}`}</span>
      <button onClick={handleEdit}>
        <Image src="/images/edit.svg" width={20} height={20} alt="edit icon" />
      </button>
      <button onClick={handleDelete}>
        <Image
          src="/images/delete.svg"
          width={20}
          height={20}
          alt="delete icon"
        />
      </button>
    </div>
  );
};

export default DoctorItem;
