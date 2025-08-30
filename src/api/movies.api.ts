import type { Movie } from "../types/Movies";
import { api } from "./api";

interface MovieFilters {
  count?: number;
  page?: number;
  title?: string;
  genre?: string;
}

export const moviesApi = {
  async getMovies(filters?: MovieFilters): Promise<Movie[]> {
    try {
      const params: MovieFilters = {};

      // Устанавливаем параметры фильтрации
      if (filters?.count !== undefined) {
        params.count = filters.count;
      } else {
        params.count = 50; // По умолчанию как указано в API
      }

      if (filters?.page !== undefined) {
        params.page = filters.page;
      }

      if (filters?.title) {
        params.title = filters.title;
      }

      if (filters?.genre) {
        params.genre = filters.genre;
      }

      const response = await api.get<Movie[]>("/movie", { params });
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении фильмов:", error);
      throw new Error("Не удалось загрузить фильмы");
    }
  },

  async getRandomMovie(): Promise<Movie> {
    try {
      const response = await api.get("/movie/random");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch random movie: ${error}`);
    }
  },

  async getTopMovies(): Promise<Movie[]> {
    try {
      const response = await api.get("/movie/top10");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch 10 top movies: ${error}`);
    }
  },

  async getMovieById(movieId: number): Promise<Movie> {
    try {
      const response = await api.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch movie: ${error}`);
    }
  },

  async getGenres(): Promise<string[]> {
    try {
      const response = await api.get("/movie/genres");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch genres: ${error}`);
    }
  },
};
