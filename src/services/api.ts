// Este archivo define las funciones para interactuar con la API de OMDB,
import axios from 'axios';

// Claves y URLs de la API, así como la interfaz para los detalles de las películas
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/';

// Interfaz que representa los detalles de una película obtenidos de la API
export interface MovieDetail {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Genre: string;
  Plot: string;
  Type: string;
}

// Parámetros para la búsqueda de películas (incluido el género)
export const searchMovies = async (title: string, type?: string, year?: string, genre?: string): Promise<MovieDetail[]> => {
  try {
    const searchParams = new URLSearchParams({
      apikey: API_KEY,
      s: title,
      ...(type && { type }),
      ...(year && { y: year }),
    });

    const searchResponse = await axios.get(`${BASE_URL}?${searchParams.toString()}`);
    
    if (searchResponse.data.Response === 'False') {
      throw new Error(searchResponse.data.Error);
    }

    const basicResults = searchResponse.data.Search;

    const detailedMoviesPromises = basicResults.map(async (movie: { imdbID: string }) => {
      const detailResponse = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}&plot=full`);
      return detailResponse.data;
    });

    const detailedMovies = await Promise.all(detailedMoviesPromises);

    // Filtramos por género en el cliente
    if (genre) {
      // Convertimos todo a minúsculas para que la búsqueda sea insensible a mayúsculas
      const filteredMovies = detailedMovies.filter((movie) => 
        movie.Genre !== 'N/A' && movie.Genre.toLowerCase().includes(genre.toLowerCase())
      );
      
      // Si el filtro dejó la lista vacía, lanzamos un error claro para el usuario
      if (filteredMovies.length === 0) {
        throw new Error(`No se encontraron títulos de "${genre}" para esta búsqueda.`);
      }
      
      return filteredMovies;
    }

    return detailedMovies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};