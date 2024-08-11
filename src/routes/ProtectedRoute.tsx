import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoggedInLayout from '../LoggedInLayout.tsx';
import { useAuthStore } from '../store/AuthStore.ts';
import { useProfileStore } from '../store/ProfileStore.ts';
import VerifyEmailRoute from './VerifyEmailRoute.tsx';

export default function ProtectedRoute() {
  const signedIn = useAuthStore((state) => state.signedIn());
  const location = useLocation();
  const { emailVerified } = useProfileStore();
  console.log('rendering protected route');
  if (!signedIn) {
    return <Navigate to={'/login'} />;
  }

  if (!emailVerified) {
    if (location.pathname != '/app/verify') {
      return <Navigate to={'/app/verify'} />;
    } else {
      return (
        <LoggedInLayout sidebar={false}>
          <VerifyEmailRoute />
        </LoggedInLayout>
      );
    }
  }

  return (
    <LoggedInLayout sidebar={true}>
      <Outlet />
    </LoggedInLayout>
  );
}
