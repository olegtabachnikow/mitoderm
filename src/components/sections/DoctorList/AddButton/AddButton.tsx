'use client';
import { Dispatch, FC, SetStateAction } from 'react';
import { initialState } from '../DoctorList/DoctorList';
import { DoctorType } from '@/types';

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentDoctor: Dispatch<SetStateAction<DoctorType>>;
  setIsAuthFormOpen: Dispatch<SetStateAction<boolean>>;
  loggedIn: boolean;
}

const AddButton: FC<Props> = ({
  setIsOpen,
  setCurrentDoctor,
  loggedIn,
  setIsAuthFormOpen,
}) => {
  const handleClick = () => {
    if (!loggedIn) {
      setIsAuthFormOpen(true);
    } else {
      setIsOpen(true);
      setCurrentDoctor(initialState);
    }
  };
  return <button onClick={handleClick}>Add doctor</button>;
};

export default AddButton;
