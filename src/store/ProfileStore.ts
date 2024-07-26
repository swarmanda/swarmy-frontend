import { create } from 'zustand';

interface ProfileState {
  email: string | null;
  organizationId: string | null;
  setProfile: (profile: ProfileState) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  email: null,
  organizationId: null,
  setProfile: (profile: ProfileState) => set(() => profile),
  clearProfile: () => set(() => ({ email: null, organizationId: null })),
}));
