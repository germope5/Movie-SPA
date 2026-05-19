import { useMovieStore } from '../../../store/useMovieStore';
import { Button } from '../../atoms/Button/Button';
import type { MovieDetail } from '../../../services/api';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: MovieDetail;
  onMoreInfo: (movie: MovieDetail) => void;
}

export const MovieCard = ({ movie, onMoreInfo }: MovieCardProps) => {
  const { favorites, toggleFavorite } = useMovieStore();
  
  // Verificamos si la película actual ya está en la lista de favoritos
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  // Manejo de póster no disponible de la OMDb API
  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450/1e293b/94a3b8?text=Sin+Póster';

  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={posterUrl} alt={`Póster de ${movie.Title}`} className={styles.poster} />
        <button 
          className={styles.favoriteButton} 
          onClick={() => toggleFavorite(movie)}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title} title={movie.Title}>{movie.Title}</h3>
          <span className={styles.year}>{movie.Year}</span>
        </div>
        
        <p className={styles.genre}>{movie.Genre !== 'N/A' ? movie.Genre : 'Género desconocido'}</p>
        
        <p className={styles.plot}>
          {movie.Plot !== 'N/A' ? movie.Plot : 'Sinopsis no disponible.'}
        </p>
        
        <div className={styles.footer}>
          <Button onClick={() => onMoreInfo(movie)}>
            Más info
          </Button>
        </div>
      </div>
    </article>
  );
};