import { FC } from 'react';
import styles from './FormInput.module.scss';

interface Props {
  value: string;
  onChange: (str: string) => void;
  name: string;
  type: 'text' | 'tel' | 'email';
  label: string;
  error: string;
  placeholder: string;
  min?: number;
  max?: number;
}

const FormInput: FC<Props> = ({
  value,
  onChange,
  type,
  name,
  placeholder,
  min,
  max,
  label,
  error,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };
  return (
    <label className={styles.inputLabel}>
      {label}
      <input
        className={error.length ? styles.error : ''}
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
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
