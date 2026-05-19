import { useState } from 'react'; 
import { useMovieStore } from './store/useMovieStore';
import { MainLayout } from './components/templates/MainLayout/MainLayout';
import { SearchForm } from './components/organisms/SearchForm/SearchForm';
import { MovieCard } from './components/organisms/MovieCard/MovieCard';
import { MovieDetailModal } from './components/organisms/MovieDetailModal/MovieDetailModal'; 
import type { MovieDetail } from './services/api';
import { FavoritesSidebar } from './components/organisms/FavoritesSidebar/FavoritesSidebar';

function App() {
  const { movies, isLoading, error } = useMovieStore();
  
  // Estado para controlar qué película mostrar en el modal
  const [selectedMovie, setSelectedMovie] = useState<MovieDetail | null>(null);

  const headerContent = (
    <>
      <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '-0.05em' }}>
        Movie <span style={{ color: 'var(--color-brand-primary)' }}>SPA</span>
      </h1>
      </a>
      <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
        Buscador profesional de películas y series
      </p>
    </>
  );

  const resultsContent = (
    <div>
      {isLoading && (
        <p style={{ color: 'var(--color-brand-primary)', textAlign: 'center', padding: '2rem' }}>
          Buscando títulos en la base de datos...
        </p>
      )}
      
      {error && (
        <div style={{ backgroundColor: 'var(--color-danger-bg)', color: 'white', padding: 'var(--spacing-md)', borderRadius: 'var(--radius-md)' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {!isLoading && !error && movies.length === 0 && (
        <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '2rem' }}>
          No hay búsquedas activas. Ingresa un título arriba para comenzar.
        </p>
      )}

      {!isLoading && movies.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 'var(--spacing-lg)' }}>
          {movies.map((movie) => (
            <MovieCard 
              key={movie.imdbID} 
              movie={movie} 
              onMoreInfo={(movie) => setSelectedMovie(movie)} 
            />
          ))}
        </div>
      )}
    </div>
  );

  const favoritesContent = (
    <FavoritesSidebar />
  );

  return (
    <>
      <MainLayout
        header={headerContent}
        searchForm={<SearchForm />}
        resultsList={resultsContent}
        favoritesSidebar={favoritesContent}
      />

      {/* Renderizado condicional del modal accesible */}
      <MovieDetailModal 
        movie={selectedMovie} 
        onClose={() => setSelectedMovie(null)} 
      />
    </>
  );
}

export default App;