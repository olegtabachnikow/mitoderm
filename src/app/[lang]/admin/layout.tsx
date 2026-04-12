'use client';
import { FC } from 'react';
import styles from './layout.module.scss';
import { SessionProvider } from 'next-auth/react';
import AdminSessionWrapper from '@/components/Admin/AdminSessionWrapper/AdminSessionWrapper';

interface Props {
  children: React.ReactNode;
}

const AdminLayout: FC<Props> = ({ children }) => {
  return (
    <SessionProvider>
      <AdminSessionWrapper>{children}</AdminSessionWrapper>
    </SessionProvider>
  );
};

export default AdminLayout;
