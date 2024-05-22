// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '@/types/user';

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
        const parsedUser: User = JSON.parse(userData);
        setUser(parsedUser);
    }
};

const logout = () => {
  setUser(null);
  localStorage.removeItem('user')
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType | null => {
  return useContext(AuthContext);
};
