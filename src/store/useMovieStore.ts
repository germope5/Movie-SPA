// Este archivo define el estado global de la aplicación usando Zustand,
//  incluyendo la lógica para buscar películas y gestionar favoritos.
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { searchMovies } from '../services/api';
import type { MovieDetail } from '../services/api';

// Creamos un tipo para guardar la búsqueda activa
interface SearchParams {
  title: string;
  type?: string;
  year?: string;
  genre?: string;
}
interface MovieState {
  movies: MovieDetail[];
  favorites: MovieDetail[];
  isLoading: boolean;
  error: string | null;
  // Nuevos estados de paginación
  currentPage: number;
  totalResults: number;
  currentSearchParams: SearchParams | null;
  
  // Modificamos la firma para aceptar la página
  fetchMovies: (title: string, type?: string, year?: string, genre?: string, page?: number) => Promise<void>;
  toggleFavorite: (movie: MovieDetail) => void;
}

export const useMovieStore = create<MovieState>()(
  persist(
    (set, get) => ({
      movies: [],
      favorites: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      totalResults: 0,
      currentSearchParams: null,

fetchMovies: async (title, type, year, genre, page = 1) => {
        // Guardamos los parámetros para poder usarlos en "Siguiente/Anterior"
        set({ 
          isLoading: true, 
          error: null, 
          currentSearchParams: { title, type, year, genre } 
        });

        // Normalizar year: aceptar string|number|undefined y pasar number|undefined a la API
        let yearParam: string | undefined = undefined;
        if (typeof year === 'string') {
          const trimmed = year.trim();
          yearParam = trimmed === '' ? undefined : trimmed;
        } else if (typeof year === 'number') {
          yearParam = String(year);
        }

        try {
          // Llamar a searchMovies con el orden correcto: (title, type, year, page, genre)
          const { movies, totalResults } = await searchMovies(title, type, yearParam, page, genre);
          set({ 
            movies, 
            totalResults, 
            currentPage: page, 
            isLoading: false,
            currentSearchParams: { title, type, year: yearParam, genre }
          });
        } catch (err: any) {
          set({ error: err.message || 'Error al buscar películas', isLoading: false, movies: [] });
        }
      },

      toggleFavorite: (movie) => {
        // ... (el código de toggleFavorite se queda exactamente igual)
        const currentFavorites = get().favorites;
        const isFavorite = currentFavorites.some((fav) => fav.imdbID === movie.imdbID);
        
        if (isFavorite) {
          set({ favorites: currentFavorites.filter((fav) => fav.imdbID !== movie.imdbID) });
        } else {
          const movieWithDate = { ...movie, addedAt: new Date().toISOString() };
          set({ favorites: [...currentFavorites, movieWithDate] });
        }
      },
    }),
    {
      name: 'movie-favorites-storage',
      partialize: (state) => ({ favorites: state.favorites }),
    }
  )
);