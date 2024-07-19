import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'dark' | 'light';
}

export const useThemeStore = create<ThemeState | any>(
  persist(
    (set) => ({
      theme: 'dark',
      setTheme: (theme: string) => set(() => ({ theme: theme })),
    }),
    {
      name: 'themeStorage',
    },
  ),
);
