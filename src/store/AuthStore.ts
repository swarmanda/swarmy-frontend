import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  organizationId: string | null;
  setAccessToken: (token: string) => void;
  signedIn: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: '',
      organizationId: null,
      setAccessToken: (token: string) => set(() => ({ accessToken: token })),
      signedIn: () => !!get().accessToken,
    }),
    {
      name: 'authStorage',
    },
  ),
);
