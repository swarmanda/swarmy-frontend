import { Navigate, Outlet } from 'react-router-dom';
import LoggedInLayout from '../LoggedInLayout.tsx';
import { useAuthStore } from '../store/AuthStore.ts';

export default function ProtectedRoute() {
  const signedIn = useAuthStore((state) => state.signedIn());
  console.log('rendering protected route');
  if (!signedIn) {
    return <Navigate to={'/login'} />;
  }

  return (
    <LoggedInLayout>
      <Outlet />
    </LoggedInLayout>
  );
}
