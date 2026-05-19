import axios from 'axios';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = 'https://www.omdbapi.com/'; 

export interface MovieDetail {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Genre: string;
  Plot: string;
  Type: string;
}

export const searchMovies = async (title: string, type?: string, year?: string): Promise<MovieDetail[]> => {
  try {
    // Búsqueda general 
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

    // Obtener el género y detalles con Promise.all 
    const detailedMoviesPromises = basicResults.map(async (movie: { imdbID: string }) => {
      const detailResponse = await axios.get(`${BASE_URL}?apikey=${API_KEY}&i=${movie.imdbID}`);
      return detailResponse.data;
    });

    return await Promise.all(detailedMoviesPromises);
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};