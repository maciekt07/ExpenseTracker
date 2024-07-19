// src/context/AuthContext.tsx
import { createContext, useState, useEffect, ReactNode } from "react";
import { UserData } from "../types/user";
import authService from "../services/auth";

interface User {
  _id: string;
  username: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  register: (userData: UserData) => Promise<void>;
  login: (userData: Omit<UserData, "username">) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = async (userData: UserData) => {
    const registeredUser = await authService.register(userData);
    setUser(registeredUser);
  };

  const login = async (userData: Omit<UserData, "username">) => {
    const loggedInUser = await authService.login(userData);
    setUser(loggedInUser);
  };

  return (
    <AuthContext.Provider value={{ user, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
