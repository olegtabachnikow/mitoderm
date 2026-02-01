'use client';
import { Dispatch, FC, SetStateAction } from 'react';
import { initialState } from '../DoctorList';
import { DoctorType } from '@/types';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentDoctor: Dispatch<SetStateAction<DoctorType>>;
}

const AddButton: FC<Props> = ({ setIsOpen, setCurrentDoctor }) => {
  const handleClick = () => {
    setIsOpen(true);
    setCurrentDoctor(initialState);
  };
  return <button onClick={handleClick}>Add doctor</button>;
};

export default AddButton;
