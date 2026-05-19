import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { searchMovies } from '../services/api';
import type { MovieDetail } from '../services/api';

interface MovieState {
  movies: MovieDetail[];
  favorites: MovieDetail[];
  isLoading: boolean;
  error: string | null;
  fetchMovies: (title: string, type?: string, year?: string) => Promise<void>;
  toggleFavorite: (movie: MovieDetail) => void;
}

export const useMovieStore = create<MovieState>()(
  persist(
    (set, get) => ({
      movies: [],
      favorites: [],
      isLoading: false,
      error: null,

      fetchMovies: async (title, type, year) => {
        set({ isLoading: true, error: null });
        try {
          const results = await searchMovies(title, type, year);
          set({ movies: results, isLoading: false });
        } catch (err: any) {
          set({ error: err.message || 'Error al buscar películas', isLoading: false });
        }
      },

      toggleFavorite: (movie) => {
        const currentFavorites = get().favorites;
        const isFavorite = currentFavorites.some((fav) => fav.imdbID === movie.imdbID);
        
        if (isFavorite) {
          set({ favorites: currentFavorites.filter((fav) => fav.imdbID !== movie.imdbID) });
        } else {
          // Guardamos la fecha en que se añadió para futuros filtros
          const movieWithDate = { ...movie, addedAt: new Date().toISOString() };
          set({ favorites: [...currentFavorites, movieWithDate] });
        }
      },
    }),
    {
      name: 'movie-favorites-storage', // Guarda los favoritos en LocalStorage automáticamente 
      partialize: (state) => ({ favorites: state.favorites }), // Solo persistimos la lista de favoritos
    }
  )
);