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
  email: string;
  name: string;
  surname: string;
  favorites: string[];
}

export type RegisterResponse = successfulResult | User;
