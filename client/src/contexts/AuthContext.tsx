import { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCurrentUser, logoutUser, type User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refetchUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  // Fetch current user with React Query
  const { data: user = null, isLoading: loading, refetch } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false, // Don't retry if not authenticated
    staleTime: 1000 * 60 * 5, // Consider fresh for 5 minutes
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      // Redirect to login
      window.location.href = '/login';
    },
    onError: () => {
      // Even if logout fails on server, clear local state and redirect
      queryClient.clear();
      window.location.href = '/login';
    },
  });

  const logout = async () => {
    await logoutMutation.mutateAsync();
  };

  const refetchUser = async () => {
    await refetch();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        refetchUser,
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
