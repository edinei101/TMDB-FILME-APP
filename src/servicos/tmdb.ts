import { TMDB_API_KEY } from '@env';

export interface Filme {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

export const buscarFilmes = async (query: string): Promise<Filme[]> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${query}`
    );
    const data = await response.json();
    return data.results as Filme[];
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    return [];
  }
};