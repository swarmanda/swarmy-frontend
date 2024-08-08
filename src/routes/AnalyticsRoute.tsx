import { useQueries } from '@tanstack/react-query';
import { api } from '../api/Api.ts';
import { UsageMetricsCard } from '../UsageMetricsCard.tsx';
import { Flex, Group, SimpleGrid, Skeleton } from '@mantine/core';
import classes from './AnalyticsRoute.module.css';

export default function AnalyticsRoute() {
  const [metricsQuery, planQuery] = useQueries({
    queries: [
      {
        queryKey: ['quota-metrics'],
        queryFn: api.getUsageMetrics,
      },

      {
        queryKey: ['active-plan'],
        queryFn: api.getActivePlan,
      },
    ],
  });

  const isLoading = metricsQuery.isLoading || planQuery.isLoading;

  if (isLoading) {
    return (
      <>
        <h1>Analytics</h1>
        <SimpleGrid
          className={classes.grid}
          cols={{ base: 1, md: 2 }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
        >
          <Skeleton height={120} mt={6} maw={500} radius="sm" />
          <Skeleton height={120} mt={6} maw={500} radius="sm" />
        </SimpleGrid>
      </>
    );
  }

  const usedStorage = metricsQuery?.data?.find(m => m.type === 'UPLOADED_BYTES')?.used || 0
  const usedBandwidth = metricsQuery?.data?.find(m => m.type === 'DOWNLOADED_BYTES')?.used || 0

  const availableStorage = metricsQuery?.data?.find(m => m.type === 'UPLOADED_BYTES')?.available || 0
  const availableBandwidth = metricsQuery?.data?.find(m => m.type === 'DOWNLOADED_BYTES')?.available || 0

  return (
    <>
      <h1>Analytics</h1>

      <SimpleGrid
        className={classes.grid}
        cols={{ base: 1, md: 2 }}
        spacing={{ base: 10, sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
      >
        <UsageMetricsCard
          title={'Storage'}
          description={'Total bytes uploaded'}
          value={usedStorage}
          limit={availableStorage}
          valueType={'BYTES'}
        />
        <UsageMetricsCard
          title={'Bandwidth'}
          description={'Total bytes downloaded'}
          value={usedBandwidth}
          limit={availableBandwidth}
          valueType={'BYTES'}
        />
      </SimpleGrid>
    </>
  );
}
