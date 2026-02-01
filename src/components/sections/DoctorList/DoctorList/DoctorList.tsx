import { FC, useState, useEffect } from 'react';
import styles from './DoctorList.module.scss';
import { useSession } from 'next-auth/react';
import DoctorItem from '../DoctorItem/DoctorItem';
import AddButton from '../AddButton/AddButton';
import DoctorForm from '../DoctorForm/DoctorForm';
import { DoctorType } from '@/types';
import AuthForm from '@/components/layout/AuthForm/AuthForm';
import { signOut } from 'next-auth/react';
import DoctorListFilter from '../DoctorListFilter/DoctorListFilter';

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
  const session = useSession();
  const [currentDoctor, setCurrentDoctor] = useState<DoctorType>(initialState);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isAuthFormOpen, setIsAuthFormOpen] = useState<boolean>(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [filteredList, setFilteredList] = useState<DoctorType[]>(doctors);

  useEffect(() => {
    if (session.status === 'authenticated') {
      setLoggedIn(true);
    }
  }, [session]);

  useEffect(() => {
    setFilteredList(doctors);
  }, [doctors]);

  return (
    <div className={styles.container}>
      <DoctorListFilter doctors={doctors} setFilteredList={setFilteredList} />
      {filteredList.map((el: DoctorType) => (
        <DoctorItem
          loggedIn={loggedIn}
          key={el._id}
          doctor={el}
          setCurrentDoctor={setCurrentDoctor}
          setIsOpen={setIsOpen}
        />
      ))}
      <AddButton
        setIsOpen={setIsOpen}
        setCurrentDoctor={setCurrentDoctor}
        loggedIn={loggedIn}
        setIsAuthFormOpen={setIsAuthFormOpen}
      />
      {isOpen && <DoctorForm doctor={currentDoctor} setIsOpen={setIsOpen} />}
      {isAuthFormOpen && <AuthForm setIsAuthFormOpen={setIsAuthFormOpen} />}
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default DoctorList;
