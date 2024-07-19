import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '../store/ProfileStore';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/Api';

export default function ProfileRoute() {
  const navigate = useNavigate();

  const { isPending, isError, data, isSuccess, error } = useQuery({
    queryKey: ['profile'],
    queryFn: api.getProfile,
  });

  // const { email, setProfile } = useProfileStore();

  return (
    isSuccess && (
      <>
        <div>
          <span>Hello {data.email}</span>
        </div>
      </>
    )
  );
}
