//Componente de estado vacío para mostrar mensajes cuando no hay resultados 
// o contenido disponible.
import styles from './EmptyState.module.css';

interface EmptyProps {
  title?: string;
  description?: string;
}

export const EmptyState = ({ title = 'Sin resultados', description = 'No se encontraron elementos.' }: EmptyProps) => {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <div className={styles.icon} aria-hidden="true">🎬</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
    </div>
  );
};
