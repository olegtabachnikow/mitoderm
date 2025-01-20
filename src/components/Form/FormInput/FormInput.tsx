import { FC, useEffect, useState } from 'react';
import styles from './FormInput.module.scss';
import { useLocale } from 'next-intl';

interface Props {
  validator: (data: string) => string;
  setFormData: (
    data: string,
    name: 'name' | 'email' | 'phone' | 'profession',
    isValid: boolean
  ) => void;
  name: 'name' | 'email' | 'phone' | 'profession';
  type: 'text' | 'tel' | 'email';
  label: string;
  placeholder: string;
}

const FormInput: FC<Props> = ({
  validator,
  setFormData,
  type,
  name,
  placeholder,
  label,
}) => {
  const [data, setData] = useState<string>('');
  const [error, setError] = useState<string>('');
  const locale = useLocale();

  const onChange = (data: string) => {
    setData(data);
    setError(validator(data));
  };

  useEffect(() => {
    setFormData(data, name, !error.length ? true : false);
  }, [error, data]);

  return (
    <label className={styles.inputLabel}>
      {label}
      <input
        autoFocus={name === 'name'}
        dir={locale === 'he' ? 'rtl' : 'ltr'}
        className={error ? styles.error : ''}
        value={data}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        name={name}
        placeholder={placeholder}
        required
      />
      <span className={styles.errorText}>{error}</span>
    </label>
  );
};

export default FormInput;
