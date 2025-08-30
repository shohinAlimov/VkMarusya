export interface successfulResult {
  result: boolean;
}

export interface User {
  email: string;
  password: string;
  name: string;
  surname: string;
}

export interface Profile {
  favorites: string[];
  surname: string;
  name: string;
  email: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export type RegisterResponse = successfulResult | User;
