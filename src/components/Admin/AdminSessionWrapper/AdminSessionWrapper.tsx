'use client';

import { FC } from 'react';
import AdminSidebar from '@/components/Admin/AdminSidebar/AdminSidebar';
import AdminLoginPage from '@/components/Admin/AdminLoginPage/AdminLoginPage';
import styles from './AdminSessionWrapper.module.scss';
import { signOut, useSession } from 'next-auth/react';

interface Props {
  children: React.ReactNode;
}

const AdminSessionWrapper: FC<Props> = ({ children }) => {
  const session = useSession();
  const loggedIn = session.status === 'authenticated';

  if (!loggedIn) {
    return <AdminLoginPage />;
  }

  return (
    <div className={styles.root}>
      <AdminSidebar onLogout={signOut} />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
};

export default AdminSessionWrapper;
