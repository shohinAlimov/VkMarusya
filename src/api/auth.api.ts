import type { successfulResult } from "../types/auth";
import { api } from "./api";

export const authApi = {
  async login(): Promise<successfulResult> {
    try {
      const response = await api.post("/auth/login");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch movies: ${error}`);
    }
  },
};
