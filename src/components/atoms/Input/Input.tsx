// Componente de input reutilizable que puede renderizar
//  tanto un campo de texto como un select,
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  as?: 'input' | 'select';
  options?: { label: string; value: string }[];
}

export const Input = ({ as = 'input', options, ...props }: InputProps) => {
  if (as === 'select') {
    return (
      <select className={styles.input} {...props}>
        {options?.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    );
  }
  return <input className={styles.input} {...props} />;
};