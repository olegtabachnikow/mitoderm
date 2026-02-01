import { unstable_setRequestLocale } from 'next-intl/server';
import { getDoctors } from '@/lib/mongodb';
import DoctorList from '@/components/sections/DoctorList/DoctorList';

export default async function DoctorsPage({ params: { lang } }: any) {
  unstable_setRequestLocale(lang);
  const doctors = await getDoctors();
  return <DoctorList doctors={doctors} />;
}
