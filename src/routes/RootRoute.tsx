import { Outlet } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { useAuthStore } from '../store/AuthStore.ts';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/Api.ts';
import React from 'react';
import { useProfileStore } from '../store/ProfileStore.ts';

export default function RootRoute() {
  const { setProfile } = useProfileStore();
  const { accessToken } = useAuthStore();
  console.log('rendering root route');
  const {
    isLoading,
    isError,
    data: profileData,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
    enabled: !!accessToken,
  });

  React.useEffect(() => {
    if (profileData) {
      setProfile(profileData);
    }
  }, [profileData]);

  return (
    <>
      <Notifications />
      {/*{isLoading ? "Loading" : <Outlet/> }*/}
      <Outlet />
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
    </>
  );
}
