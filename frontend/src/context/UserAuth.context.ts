import { createContext } from "react";

export interface UserAuthContextType {
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const UserAuthContext =
  createContext<UserAuthContextType | null>(null);
