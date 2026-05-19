import { useState, useMemo } from 'react';
import { useMovieStore } from '../../../store/useMovieStore';
import { Input } from '../../atoms/Input/Input';
import styles from './FavoritesSidebar.module.css';
import sinPortada from '../../../assets/sin_portada.jpg';

type SortOption = 'date' | 'title' | 'genre';

export const FavoritesSidebar = () => {
  const { favorites, toggleFavorite } = useMovieStore();
  const [sortBy, setSortBy] = useState<SortOption>('date');

  // useMemo memoiza el resultado del ordenamiento. 
  // Solo se vuelve a calcular si cambian los favoritos o el criterio de orden.
  const sortedFavorites = useMemo(() => {
    // Se realiza una copia superficial del arreglo para no mutar el estado global accidentalmente
    return [...favorites].sort((a, b) => {
      if (sortBy === 'title') {
        return a.Title.localeCompare(b.Title);
      }
      
      if (sortBy === 'genre') {
        // Manejamos los casos donde la API no devuelve género enviándolos al final ('Z')
        const genreA = a.Genre !== 'N/A' ? a.Genre : 'Z';
        const genreB = b.Genre !== 'N/A' ? b.Genre : 'Z';
        return genreA.localeCompare(genreB);
      }
      
      if (sortBy === 'date') {
        // En la Fase 3 agregamos 'addedAt' al guardar. Lo usamos para ordenar del más reciente al más antiguo.
        const dateA = (a as any).addedAt ? new Date((a as any).addedAt).getTime() : 0;
        const dateB = (b as any).addedAt ? new Date((b as any).addedAt).getTime() : 0;
        return dateB - dateA;
      }
      
      return 0;
    });
  }, [favorites, sortBy]);

  if (favorites.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2 className={styles.title}>Mis Favoritos ❤️</h2>
        <p className={styles.emptyText}>Aún no has agregado películas a tu lista.</p>
      </div>
    );
  }

  return (
    <div className={styles.sidebarContainer}>
      <h2 className={styles.title}>Mis Favoritos ❤️ ({favorites.length})</h2>
      
      <div className={styles.controls}>
        <label className={styles.label}>Ordenar por:</label>
        <Input 
          as="select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          options={[
            { label: 'Agregado recientemente', value: 'date' },
            { label: 'Orden alfabético (A-Z)', value: 'title' },
            { label: 'Género', value: 'genre' }
          ]}
        />
      </div>

      <div className={styles.list}>
        {sortedFavorites.map((movie) => (
          <div key={movie.imdbID} className={styles.favoriteItem}>
            <img 
              src={movie.Poster !== 'N/A' ? movie.Poster : sinPortada} 
              alt={movie.Title} 
              className={styles.miniPoster} 
            />
            <div className={styles.itemInfo}>
              <h4 className={styles.itemTitle}>{movie.Title}</h4>
              <span className={styles.itemMeta}>{movie.Year} • {movie.Genre}</span>
            </div>
            <button 
              className={styles.removeBtn} 
              onClick={() => toggleFavorite(movie)}
              aria-label={`Quitar ${movie.Title} de favoritos`}
              title="Quitar de favoritos"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};