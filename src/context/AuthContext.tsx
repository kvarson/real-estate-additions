// Authentication context for user management

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useLocalStorage<string | null>('auth_token', null);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Check if user is authenticated on app load
    const checkAuth = async () => {
      if (token) {
        try {
          // Here you would typically validate the token with your API
          // For now, we'll simulate this
          const mockUser: User = {
            id: '1',
            name: 'Admin User',
            email: 'admin@alians.az',
            role: 'admin'
          };
          setUser(mockUser);
        } catch (error) {
          console.error('Auth check failed:', error);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [token, setToken]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Here you would make an API call to authenticate
      // For now, we'll simulate this
      if (email === 'admin@alians.az' && password === 'password') {
        const mockUser: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@alians.az',
          role: 'admin'
        };
        const mockToken = 'mock_jwt_token';
        
        setUser(mockUser);
        setToken(mockToken);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Here you would make an API call to register
      // For now, we'll simulate this
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: 'user'
      };
      const mockToken = 'mock_jwt_token';
      
      setUser(mockUser);
      setToken(mockToken);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
