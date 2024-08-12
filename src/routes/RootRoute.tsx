import { Outlet } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { useAuthStore } from '../store/AuthStore.ts';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/Api.ts';
import React from 'react';
import { useProfileStore } from '../store/ProfileStore.ts';
import PublicLayout from '../PublicLayout.tsx';
import { Center, Loader } from '@mantine/core';

export default function RootRoute() {
  const { setProfile } = useProfileStore();
  const { accessToken } = useAuthStore();
  console.log('rendering root route');
  const {
    data: profileData,
    isFetching,
    isLoading,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
    enabled: !!accessToken,
  });

  React.useEffect(() => {
    if (profileData) {
      setProfile(profileData);
    }
  }, [isFetching]);

  return (
    <>
      <Notifications />
      {isLoading ? (
        <PublicLayout>
          <Center p={'xl'}>
            <Loader mt={'xl'} />
          </Center>
        </PublicLayout>
      ) : (
        <Outlet />
      )}

      {/*<Outlet />*/}
      {/*<ReactQueryDevtools initialIsOpen={false} />*/}
    </>
  );
}
