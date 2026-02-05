import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { config } from '@/config';
import { getFriendlyErrorMessage } from '@/lib/errorHandler';

interface User {
  userId: string;
  email: string;
  name: string;
  picture: string;
  must_change_password: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/auth/me`, {
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      } else {
        // User not authenticated or session expired
        setUser(null);
      }
    } catch (error) {
      // Log user-friendly error for debugging
      const friendlyError = getFriendlyErrorMessage(error);
      console.error('Authentication check failed:', friendlyError.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${config.apiUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      window.location.href = '/login';
    } catch (error) {
      // Even if logout fails on server, clear local state and redirect
      const friendlyError = getFriendlyErrorMessage(error);
      console.error('Logout request failed:', friendlyError.message);
      setUser(null);
      window.location.href = '/login';
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        refetchUser: fetchUser,
      }}
    >
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
