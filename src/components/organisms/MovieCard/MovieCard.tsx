// Componente de tarjeta de película que muestra información básica
//  y permite marcar como favorito
import { useState } from 'react';
import { useMovieStore } from '../../../store/useMovieStore';
import { Button } from '../../atoms/Button/Button';
import sinPortada from '../../../assets/sin_portada.jpg';
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

  // Usar imagen local como fallback cuando OMDb no provee póster o falla la carga
  const initialPoster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : sinPortada;
  const [imgSrc, setImgSrc] = useState<string>(initialPoster);


// Renderizamos la tarjeta con la información de la película y un botón para 
// marcar como favorito
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={imgSrc}
          alt={`Póster de ${movie.Title}`}
          className={styles.poster}
          onError={() => {
            if (imgSrc !== sinPortada) setImgSrc(sinPortada);
          }}
        />
        <button 
          className={styles.favoriteButton} 
          onClick={() => toggleFavorite(movie)}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      
      {/* Contenido de la tarjeta */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title} title={movie.Title}>{movie.Title}</h3>
          <span className={styles.year}>{movie.Year}</span>
        </div>
        
        <p className={styles.genre}>{movie.Genre !== 'N/A' ? movie.Genre : 'Género desconocido'}</p>
        
        <p className={styles.plot}>
          {movie.Plot !== 'N/A' ? movie.Plot : 'Sinopsis no disponible.'}
        </p>
        
        {/* Botón para más información */}
        <div className={styles.footer}>
          <Button onClick={() => onMoreInfo(movie)}>
            Más info
          </Button>
        </div>
      </div>
    </article>
  );
};