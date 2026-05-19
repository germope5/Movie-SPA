// Componente de indicador de carga para mostrar un mensaje 
// y un spinner mientras se cargan los datos.
import styles from './Loading.module.css';

interface LoadingProps {
  message?: string;
}

export const Loading = ({ message = 'Cargando...' }: LoadingProps) => {
  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true"></div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};
