'use client';
import { FC, useState } from 'react';
import { DoctorType } from '@/types';
import DoctorItem from './DoctorItem/DoctorItem';
import AddButton from './AddButton/AddButton';
import DoctorForm from './DoctorForm/DoctorForm';

interface Props {
  doctors: DoctorType[];
}

export const initialState: DoctorType = {
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

const DoctorList: FC<Props> = ({ doctors }) => {
  const [currentDoctor, setCurrentDoctor] = useState<DoctorType>(initialState);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <main style={{ margin: 70 }}>
      {doctors.map((el: DoctorType) => (
        <DoctorItem
          key={el._id}
          doctor={el}
          setCurrentDoctor={setCurrentDoctor}
          setIsOpen={setIsOpen}
        />
      ))}
      <AddButton setIsOpen={setIsOpen} setCurrentDoctor={setCurrentDoctor} />
      {isOpen && <DoctorForm doctor={currentDoctor} setIsOpen={setIsOpen} />}
    </main>
  );
};

export default DoctorList;
