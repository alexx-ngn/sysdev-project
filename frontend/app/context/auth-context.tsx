"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  admin: {
    id: number;
    email: string;
    name: string;
  } | null;
  login: (email: string, admin: any) => void;
  logout: () => void;
  checkAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  // Check authentication on mount
  useEffect(() => {
    const checkAuthStatus = () => {
      const authData = localStorage.getItem('milesforhope-admin-auth');
      if (authData) {
        try {
          const { timestamp } = JSON.parse(authData);
          const isSessionValid = Date.now() - timestamp < 24 * 60 * 60 * 1000;
          setIsAuthenticated(isSessionValid);
          
          if (!isSessionValid) {
            localStorage.removeItem('milesforhope-admin-auth');
          }
        } catch (e) {
          localStorage.removeItem('milesforhope-admin-auth');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
      setIsInitialized(true);
    };

    checkAuthStatus();
  }, []);

  // Handle redirection based on auth state
  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated && !isLoginPage) {
      router.replace('/admin/login');
    } else if (isAuthenticated && isLoginPage) {
      router.replace('/admin');
    }
  }, [isAuthenticated, isLoginPage, router, isInitialized]);

  const login = (email: string, admin: any) => {
    const authData = {
      timestamp: Date.now(),
      email,
      admin
    };
    localStorage.setItem('milesforhope-admin-auth', JSON.stringify(authData));
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('milesforhope-admin-auth');
    setIsAuthenticated(false);
    router.replace('/admin/login');
  };

  const checkAuth = () => {
    const authData = localStorage.getItem('milesforhope-admin-auth');
    if (authData) {
      try {
        const { timestamp, admin } = JSON.parse(authData);
        const isSessionValid = Date.now() - timestamp < 24 * 60 * 60 * 1000;
        if (isSessionValid) {
          setIsAuthenticated(true);
          return true;
        }
        localStorage.removeItem('milesforhope-admin-auth');
      } catch (e) {
        localStorage.removeItem('milesforhope-admin-auth');
      }
    }
    setIsAuthenticated(false);
    return false;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, admin: null, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 