// Componente de paginación para navegar entre páginas de resultados

import { useMovieStore } from '../../../store/useMovieStore';
import { Button } from '../../atoms/Button/Button';

export const Pagination = () => {
  const { 
    currentPage, 
    totalResults, 
    fetchMovies, 
    currentSearchParams, 
    isLoading 
  } = useMovieStore();

  // La API de OMDb devuelve siempre de a 10 resultados por página
  const totalPages = Math.ceil(totalResults / 10);

  // Si no hay resultados o solo hay 1 página, ocultamos la paginación
  if (totalPages <= 1) return null;

  const handlePrev = () => {
    if (currentSearchParams && currentPage > 1) {
      const { title, type, year, genre } = currentSearchParams;
      fetchMovies(title, type, year, genre, currentPage - 1);
      // Hacemos scroll suave hacia arriba al cambiar de página
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentSearchParams && currentPage < totalPages) {
      const { title, type, year, genre } = currentSearchParams;
      fetchMovies(title, type, year, genre, currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      gap: '1rem', 
      marginTop: '2rem' 
    }}>
      <Button 
        onClick={handlePrev} 
        disabled={currentPage === 1 || isLoading}
      >
        &larr; Anterior
      </Button>
      
      <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
        Página {currentPage} de {totalPages}
      </span>
      
      <Button 
        onClick={handleNext} 
        disabled={currentPage === totalPages || isLoading}
      >
        Siguiente &rarr;
      </Button>
    </div>
  );
};