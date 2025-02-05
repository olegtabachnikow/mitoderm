'use client';
import { FC } from 'react';
import { useSearchParams } from 'next/navigation';

const Success: FC = () => {
  const params = useSearchParams();
  const name = params.get('name');
  const email = params.get('email');
  const phone = params.get('phone');
  return (
    <div>
      <span>{name}</span>
      <span>{email}</span>
      <span>{phone}</span>
    </div>
  );
};

export default Success;
