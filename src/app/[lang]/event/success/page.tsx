import { useTranslations } from 'next-intl';
import Success from '@/components/Success/Success';

export default function SuccessPage() {
  const t = useTranslations();
  return (
    <main>
      <Success />
    </main>
  );
}
