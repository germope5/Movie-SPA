import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger';
  children: React.ReactNode;
  ariaLabel?: string; // accesibilidad: permite pasar aria-label como prop camelCase
}

export const Button = ({ variant = 'primary', children, ariaLabel, ...props }: ButtonProps) => {
  return (
    <button className={`${styles.button} ${styles[variant]}`} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  );
};