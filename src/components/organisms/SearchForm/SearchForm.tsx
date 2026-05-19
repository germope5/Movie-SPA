import { useState } from 'react';
import { useMovieStore } from '../../../store/useMovieStore';
import { Button } from '../../atoms/Button/Button';
import { Input } from '../../atoms/Input/Input';
import styles from './SearchForm.module.css';

export const SearchForm = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [year, setYear] = useState('');
  
  const { fetchMovies, isLoading } = useMovieStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) fetchMovies(title, type, year);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.grid}>
        <div className={styles.fieldFull}>
          <label className={styles.label}>Título de la película/serie</label>
          <Input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Ej. Batman, Matrix..." 
            required 
          />
        </div>
        
        <div className={styles.field}>
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

        <div className={styles.field}>
          <label className={styles.label}>Año</label>
          <Input 
            type="number" 
            value={year} 
            onChange={(e) => setYear(e.target.value)} 
            placeholder="Ej. 2023" 
          />
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="submit" disabled={isLoading || !title.trim()}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </Button>
      </div>
    </form>
  );
};