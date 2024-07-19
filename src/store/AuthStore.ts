import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  email: string;
  organizationId: string;
}

export const useAuthStore = create<AuthState | any>(
  persist(
    (set, get) => ({
      accessToken: '',
      setAccessToken: (token: string) => set(() => ({ accessToken: token })),
      signedIn: () => !!get().accessToken,
    }),
    {
      name: 'authStorage',
    },
  ),
);
