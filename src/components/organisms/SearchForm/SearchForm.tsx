// Componente de formulario de búsqueda con campos para título, tipo, año y género
import { useState } from 'react';
import { useMovieStore } from '../../../store/useMovieStore';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import styles from './SearchForm.module.css';

// Opciones de género para el select
const GENRES = [
  { label: 'Todos', value: '' },
  { label: 'Acción', value: 'action' },
  { label: 'Comedia', value: 'comedy' },
  { label: 'Drama', value: 'drama' },
  { label: 'Terror', value: 'horror' },
  { label: 'Ciencia Ficción', value: 'sci-fi' },
  { label: 'Romance', value: 'romance' },
  { label: 'Animación', value: 'animation' }
];

// Componente de formulario de búsqueda con campos para título, tipo, año y género
export const SearchForm = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  
  const { fetchMovies, isLoading } = useMovieStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) fetchMovies(title, type, year, genre);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        {/* Campo de título */}
        <div className={styles.fieldTitle}>
          <label className={styles.label}>Título de la película/serie</label>
          <Input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Paranormal" 
            required 
          />
        </div>
        {/* Campo de tipo (película, serie o ambos) */}
        <div className={styles.fieldSmall}>
          <label className={styles.label}>Tipo</label>
          <Input 
            as="select" 
            value={type} 
            onChange={(e) => setType(e.target.value)}
            options={[
              { label: 'Todos', value: '' },
              { label: 'Película', value: 'movie' },
              { label: 'Serie', value: 'series' }
            ]}
          />
        </div>

        {/* Campo de género */}
        <div className={styles.fieldSmall}>
          <label className={styles.label}>Género</label>
          <Input 
            as="select" 
            value={genre} 
            onChange={(e) => setGenre(e.target.value)}
            options={GENRES}
          />
        </div>
        {/* Campo de año */}
        <div className={styles.fieldSmall}>
          <label className={styles.label}>Año</label>
          <Input 
            type="number" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            placeholder="Ej." 
          />
        </div>
      </div>
      {/* Acciones */}
      <div className={styles.actions}>
        <Button type="submit" disabled={isLoading || !title.trim()}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>
    </form>
  );
};