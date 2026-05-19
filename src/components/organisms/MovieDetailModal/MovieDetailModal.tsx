import { useEffect, useRef } from 'react';
import type { MovieDetail } from '../../../services/api';
import { Button } from '../../atoms/Button/Button';
import styles from './MovieDetailModal.module.css';

interface MovieDetailModalProps {
  movie: MovieDetail | null;
  onClose: () => void;
}

export const MovieDetailModal = ({ movie, onClose }: MovieDetailModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!movie) return;

    // Navegación mediante teclado
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;

    // 1. Mover el foco al primer elemento interactivo (el botón de cerrar) al abrir
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      // 2. Cerrar con Escape
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      
      // 3. Atrapar el foco dentro del modal al usar Tab
      if (e.key === 'Tab') {
        if (e.shiftKey) { // Si presiona Shift + Tab (hacia atrás)
          if (document.activeElement === firstElement) {
            lastElement?.focus();
            e.preventDefault();
          }
        } else { // Si presiona solo Tab (hacia adelante)
          if (document.activeElement === lastElement) {
            firstElement?.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [movie, onClose]);

  if (!movie) return null;

  const anyMovie = movie as any; 
  const director = anyMovie.Director && anyMovie.Director !== 'N/A' ? anyMovie.Director : 'No disponible';
  const actors = anyMovie.Actors && anyMovie.Actors !== 'N/A' ? anyMovie.Actors : 'No disponible';
  const duration = anyMovie.Runtime && anyMovie.Runtime !== 'N/A' ? anyMovie.Runtime : '';
  const rating = anyMovie.imdbRating && anyMovie.imdbRating !== 'N/A' ? `⭐ ${anyMovie.imdbRating}` : '';

  return (
    <div 
      className={styles.overlay} 
      onClick={onClose}
      role="presentation" // ARIA: Indica que el overlay es solo visual, no interactivo en sí
    >
      <div 
        ref={modalRef}
        className={styles.modalBox} 
        onClick={(e) => e.stopPropagation()}
        
        // Etiquetas ARIA en modal
        role="dialog"
        aria-modal="true" // Le dice al lector de pantalla que el contenido exterior está oculto/inactivo
        aria-labelledby="modal-title" // Conecta el modal con su título principal
        aria-describedby="modal-plot" // Conecta el modal con la descripción (sinopsis)
      >
        <Button 
          className={styles.closeCornerButton} 
          onClick={onClose}
          ariaLabel="Cerrar detalles de la película" // Texto descriptivo para lectores de pantalla
        >
          &times;
        </Button>

        <div className={styles.metaHeader}>
          <span className={styles.badge}>{movie.Type.toUpperCase()}</span>
          {duration && <span className={styles.metaText}>{duration}</span>}
          {rating && <span className={styles.ratingText}>{rating}</span>}
        </div>

        <h2 id="modal-title" className={styles.title}>
          {movie.Title} <span className={styles.year}>({movie.Year})</span>
        </h2>

        <div className={styles.divider} />

        <div className={styles.infoGrid}>
          <div>
            <h4 className={styles.sectionTitle}>Sinopsis</h4>
            <p id="modal-plot" className={styles.plot}>
              {movie.Plot !== 'N/A' ? movie.Plot : 'Sinopsis no disponible para este título.'}
            </p>
          </div>

          <div className={styles.creditsSection}>
            <p><strong>Dirección:</strong> {director}</p>
            <p><strong>Elenco:</strong> {actors}</p>
            <p><strong>Género:</strong> {movie.Genre}</p>
          </div>
        </div>

        <div className={styles.footer}>
          <Button variant="danger" onClick={onClose} ariaLabel="Cerrar detalles de la película">
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  );
};