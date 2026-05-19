import { useMovieStore } from './store/useMovieStore';
import { MainLayout } from './components/templates/MainLayout/MainLayout';
import { SearchForm } from './components/organisms/SearchForm/SearchForm';

function App() {
  const { movies, isLoading, error } = useMovieStore();

  // 1. Componente del Encabezado (Slot para el Header)
  const headerContent = (
    <>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', letterSpacing: '-0.05em' }}>
        Movie <span style={{ color: 'var(--color-brand-primary)' }}>SPA</span>
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
        Buscador profesional de películas y series
      </p>
    </>
  );

  // 2. Componente de Resultados (Slot para el listado)
  const resultsContent = (
    <div>
      {isLoading && (
        <p style={{ color: 'var(--color-brand-primary)', textAlign: 'center', padding: '2rem' }}>
          Buscando títulos en la base de datos...
        </p>
      )}
      
      {error && (
        <div style={{ 
          backgroundColor: 'var(--color-danger-bg)', 
          color: 'white', 
          padding: 'var(--spacing-md)', 
          borderRadius: 'var(--radius-md)' 
        }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {!isLoading && !error && movies.length === 0 && (
        <p style={{ color: 'var(--color-text-secondary)', textAlign: 'center', padding: '2rem' }}>
          No hay búsquedas activas. Ingresa un título arriba para comenzar.
        </p>
      )}

      {!isLoading && movies.length > 0 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
          gap: 'var(--spacing-md)' 
        }}>
          {movies.map((movie) => (
            <div 
              key={movie.imdbID} 
              style={{ 
                backgroundColor: 'var(--color-bg-surface)', 
                padding: 'var(--spacing-sm)', 
                borderRadius: 'var(--radius-md)' 
              }}
            >
              {/* Vista previa temporal de los datos estructurados que llegan de la API */}
              <p style={{ fontWeight: 'bold' }}>{movie.Title}</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>{movie.Year} • {movie.Genre}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // 3. Componente de Favoritos (Slot para el Sidebar)
  const favoritesContent = (
    <div>
      <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: 'var(--spacing-md)' }}>
        Mis Favoritos ❤️
      </h2>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
        Próximamente: Lista persistente y ordenamiento.
      </p>
    </div>
  );

  return (
    <MainLayout
      header={headerContent}
      searchForm={<SearchForm />}
      resultsList={resultsContent}
      favoritesSidebar={favoritesContent}
    />
  );
}

export default App;