import { create } from 'zustand';

interface ProfileState {
  email: string | null;
  emailVerified: boolean;
  organizationId: string | null;
  postageBatchStatus: null | 'CREATING' | 'CREATED' | 'FAILED_TO_CREATE' | 'FAILED_TO_TOP_UP' | 'FAILED_TO_DILUTE';
  setProfile: (profile: ProfileState) => void;
  clearProfile: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  email: null,
  emailVerified: false,
  postageBatchStatus: null,
  organizationId: null,
  setProfile: (profile: ProfileState) => set(() => profile),
  clearProfile: () => set(() => ({ email: null, organizationId: null })),
}));
