import type { Profile } from "../types/auth";
import type { Movie } from "../types/Movies";
import { api } from "./api";

export const favoritesApi = {
  async getFavorites(): Promise<Movie[]> {
    try {
      const response = await api.get("/favorites");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get favorites: ${error}`);
    }
  },
  async addFavorite(movieId: string): Promise<Profile> {
    try {
      const response = await api.post("/favorites", { id: movieId });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to add favorite: ${error}`);
    }
  },
  async removeFavorite(movieId: string): Promise<Profile> {
    try {
      const response = await api.delete(`/favorites/${movieId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to remove favorite: ${error}`);
    }
  },
};
