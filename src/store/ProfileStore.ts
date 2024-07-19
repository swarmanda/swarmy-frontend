import { create } from 'zustand';

interface ProfileState {
  email: string;
  organizationId: string;
}

export const useProfileStore = create<ProfileState | any>((set, get) => ({
  email: null,
  organizationId: null,
  setProfile: (profile: ProfileState) => set(() => profile),
  clearProfile: () => set(() => ({ email: null, organizationId: null })),
}));
