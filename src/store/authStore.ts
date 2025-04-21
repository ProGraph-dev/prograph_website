import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../services/api';

interface AuthState {
  token: string | null;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      
      login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/login', { email, password });
          const { token, user } = response.data;
          
          // Store token in localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', token);
          }
          
          set({ 
            token, 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Login failed', 
            isLoading: false 
          });
        }
      },
      
      register: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await api.post('/auth/register', { name, email, password });
          const { token, user } = response.data;
          
          // Store token in localStorage
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', token);
          }
          
          set({ 
            token, 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } catch (error: any) {
          set({ 
            error: error.response?.data?.message || 'Registration failed', 
            isLoading: false 
          });
        }
      },
      
      logout: () => {
        // Remove token from localStorage
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
        
        set({ 
          token: null, 
          user: null, 
          isAuthenticated: false 
        });
      },
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage', // name of the item in localStorage
      partialize: (state) => ({ 
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      }),
    }
  )
);