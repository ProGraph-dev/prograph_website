import { create } from 'zustand';

// Define your store types
interface AppState {
  // UI state
  isDarkMode: boolean;
  setDarkMode: (isDark: boolean) => void;
  
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Loading states
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// Create the store
export const useAppStore = create<AppState>((set) => ({
  // Initial state
  isDarkMode: false,
  user: null,
  isLoading: false,
  
  // Actions
  setDarkMode: (isDark) => set({ isDarkMode: isDark }),
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));