"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getAuthToken, getAuthUser, clearAuth } from '@/app/utils/auth';

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
  const [admin, setAdmin] = useState<AuthContextType['admin']>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Check authentication on mount and when localStorage changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = getAuthToken();
      const user = getAuthUser();
      
      if (token && user) {
        setIsAuthenticated(true);
        setAdmin(user);
      } else {
        setIsAuthenticated(false);
        setAdmin(null);
      }
      setIsInitialized(true);
    };

    checkAuthStatus();

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'milesforhope-admin-token' || e.key === 'milesforhope-admin-info') {
        checkAuthStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Handle redirection based on auth state
  useEffect(() => {
    if (!isInitialized) return;

    const isLoginPage = pathname === '/admin/login';
    const isAdminRoute = pathname?.startsWith('/admin');

    if (!isAuthenticated && isAdminRoute && !isLoginPage) {
      router.replace('/admin/login');
    } else if (isAuthenticated && isLoginPage) {
      router.replace('/admin');
    }
  }, [isAuthenticated, pathname, router, isInitialized]);

  const login = (email: string, adminData: any) => {
    setIsAuthenticated(true);
    setAdmin(adminData);
  };

  const logout = () => {
    clearAuth(); // Clear all auth data
    setIsAuthenticated(false);
    setAdmin(null);
    router.replace('/admin/login');
  };

  const checkAuth = () => {
    const token = getAuthToken();
    const user = getAuthUser();
    const isValid = !!token && !!user;
    
    // Update state if it doesn't match current state
    if (isValid !== isAuthenticated) {
      setIsAuthenticated(isValid);
    }
    if (user !== admin) {
      setAdmin(user);
    }
    
    return isValid;
  };

  const value = {
    isAuthenticated,
    admin,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 