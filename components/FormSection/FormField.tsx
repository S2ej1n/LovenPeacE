import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import styles from './FormSection.module.css';

interface FormFieldProps {
  label: string;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  registration: UseFormRegisterReturn;
}

export default function FormField({ label, error, type = 'text', placeholder, registration }: FormFieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <input
        className={`${styles.input} ${error ? styles.inputError : ''}`}
        type={type}
        placeholder={placeholder}
        {...registration}
      />
      {error && <span className={styles.error}>{error.message}</span>}
    </div>
  );
}
