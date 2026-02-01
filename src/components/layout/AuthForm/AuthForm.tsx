'use client';

import { useState, FC, Dispatch, SetStateAction } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
  setIsAuthFormOpen: Dispatch<SetStateAction<boolean>>;
}

const AuthForm: FC<AuthFormProps> = ({ setIsAuthFormOpen }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      // const result = await fetch('/api/auth/register', {
      //   method: 'POST',
      //   body: JSON.stringify({ email, password }),
      // }).then((res) => res.json());

      setLoading(false);

      if (result?.error) {
        setError(result.error);
      } else {
        router.refresh();
        setIsAuthFormOpen(false);
      }
    } catch (err: any) {
      setLoading(false);
      setError('Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className=""
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className=""
      />
      <button type="submit" disabled={loading} className="">
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p className="">{error}</p>}
    </form>
  );
};

export default AuthForm;
