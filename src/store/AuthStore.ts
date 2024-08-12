import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  organizationId: string | null;
  setAccessToken: (token: string) => void;
  signedIn: () => boolean;
  clear: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: '',
      organizationId: null,
      setAccessToken: (token: string) => set(() => ({ accessToken: token })),
      clear: () =>
        set(() => ({
          accessToken: '',
          organizationId: null,
        })),
      signedIn: () => !!get().accessToken,
    }),
    {
      name: 'authStorage',
    },
  ),
);
