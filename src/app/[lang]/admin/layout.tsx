'use client';

import { useState } from 'react';
import { AdminSidebar } from '@/components/Admin/AdminSidebar/AdminSidebar';
import { AdminLoginPage } from '@/components/Admin/AdminLoginPage/AdminLoginPage';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) {
    return <AdminLoginPage onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <div className="dark flex min-h-screen bg-[#0b1120]">
      <AdminSidebar onLogout={() => setLoggedIn(false)} />
      <main className="flex-1 p-8 lg:p-10 overflow-x-hidden bg-gradient-to-br from-[#0f172a] via-[#0f172a] to-[#131d35]">
        <div className="mx-auto max-w-6xl">{children}</div>
      </main>
    </div>
  );
}
