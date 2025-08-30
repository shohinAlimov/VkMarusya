import type {
  LoginFormData,
  Profile,
  RegisterResponse,
  successfulResult,
  User,
} from "../types/auth";
import { api } from "./api";

export const authApi = {
  async login(data: LoginFormData): Promise<successfulResult> {
    try {
      const response = await api.post("/auth/login", data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to login: ${error}`);
    }
  },
  async logout(): Promise<successfulResult> {
    try {
      const response = await api.get("/auth/logout");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to logout: ${error}`);
    }
  },
  async register(data: User): Promise<RegisterResponse> {
    try {
      const response = await api.post("/user", data);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to logout: ${error}`);
    }
  },
  async getUser(): Promise<Profile> {
    try {
      const response = await api.get("/profile");
      return response.data;
    } catch (error) {
      throw new Error(`Failed to get profile: ${error}`);
    }
  },
};
