import PublicLayout from '../PublicLayout';
import { Container, Skeleton, Space } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/Api.ts';
import Markdown from 'marked-react';

export default function PrivacyRoute() {
  const { data, isPending } = useQuery({
    queryKey: ['privacy'],
    queryFn: api.getPrivacyPolicy,
  });

  return (
    <PublicLayout>
      <Container my={40}>
        {isPending ? <Skeleton height={150} mt={25} radius="xs" /> : <Markdown>{data}</Markdown>}
      </Container>
      <Space h={'xl'} />
      <Space h={'xl'} />
    </PublicLayout>
  );
}
