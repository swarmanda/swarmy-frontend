import PublicLayout from '../PublicLayout';
import { Container, Skeleton } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api/Api.ts';
import Markdown from 'marked-react';

export default function TermsOfServiceRoute() {
  const { data, isPending } = useQuery({
    queryKey: ['terms-of-service'],
    queryFn: api.getTermsOfService,
  });

  return (
    <PublicLayout>
      <Container my={40}>
        {isPending ? <Skeleton height={150} mt={25} radius="xs" /> : <Markdown>{data}</Markdown>}
      </Container>
    </PublicLayout>
  );
}
