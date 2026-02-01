import { unstable_setRequestLocale } from 'next-intl/server';
import { getDoctors } from '@/lib/mongodb';
import DoctorListSessionWrapper from '@/components/sections/DoctorList/DoctorListSessionWrapper/DoctorListSessionWrapper';

export default async function DoctorsPage({ params: { lang } }: any) {
  unstable_setRequestLocale(lang);
  const doctors = await getDoctors();
  return <DoctorListSessionWrapper doctors={doctors} />;
}
