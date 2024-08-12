import { Outlet, useNavigate } from 'react-router-dom';
import LoggedInLayout from '../LoggedInLayout.tsx';
import { useAuthStore } from '../store/AuthStore.ts';
import { useProfileStore } from '../store/ProfileStore.ts';
import { useEffect } from 'react';

export default function ProtectedRoute() {
  const navigate = useNavigate();
  const signedIn = useAuthStore((state) => state.signedIn());
  const { email, emailVerified } = useProfileStore();
  console.debug('rendering protected route');

  useEffect(() => {
    if (!signedIn) {
      navigate('/login');
    }

    //signed in, profile loaded, but email not verified
    if (email && !emailVerified) {
      console.debug('navigating to verify screen');
      navigate('/verify');
    }
  }, [signedIn, email, emailVerified]);

  return (
    <LoggedInLayout>
      <Outlet />
    </LoggedInLayout>
  );
}
