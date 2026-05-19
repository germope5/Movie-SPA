// Componente de alerta de error para mostrar mensajes de error 
// con un botón de reintento opcional.
import styles from './ErrorAlert.module.css';
import { Button } from '../../atoms/Button/Button';

interface ErrorProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorAlert = ({ title = 'Error', message = '', onRetry }: ErrorProps) => {
  return (
    <div className={styles.container} role="alert">
      <div>
        <strong className={styles.title}>{title}</strong>
        <p className={styles.message}>{message}</p>
      </div>
      {onRetry && <Button variant="danger" ariaLabel="Reintentar" onClick={onRetry}>Reintentar</Button>}
    </div>
  );
};
