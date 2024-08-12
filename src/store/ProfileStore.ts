import { create } from 'zustand';

interface ProfileState {
  email: string | null;
  emailVerified: boolean;
  organizationId: string | null;
  postageBatchStatus: null | 'CREATING' | 'CREATED' | 'FAILED_TO_CREATE' | 'FAILED_TO_TOP_UP' | 'FAILED_TO_DILUTE';
  setProfile: (profile: ProfileState) => void;
  setEmailVerified: (verified: boolean) => void;
  clear: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
  email: null,
  emailVerified: false,
  postageBatchStatus: null,
  organizationId: null,
  setProfile: (profile: ProfileState) => set(() => profile),
  setEmailVerified: (verified: boolean) => set(() => ({ emailVerified: verified })),
  clear: () =>
    set(() => ({
      email: null,
      organizationId: null,
      emailVerified: false,
      postageBatchStatus: null,
    })),
}));
