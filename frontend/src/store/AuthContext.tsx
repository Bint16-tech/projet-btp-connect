import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  userProfile: 'pro' | 'riverain' | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUserProfile: (profile: 'pro' | 'riverain') => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<'pro' | 'riverain' | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    // Simuler une API call
    setTimeout(() => {
      setIsAuthenticated(true);
      setIsLoading(false);
    }, 1000);
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      userProfile,
      login,
      logout,
      setUserProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};