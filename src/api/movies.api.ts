import type { Movie } from "../types/Movies";
import { api } from "./api";

export const moviesApi = {
  async getMovies(): Promise<Movie[]> {
    try {
      const response = await api.get("/movie");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch movies: ${error}`);
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
};
