import { useQueries } from '@tanstack/react-query';
import { api } from '../api/Api.ts';
import { QuotaMetricsCard } from '../QuotaMetricsCard.tsx';
import { SimpleGrid } from '@mantine/core';
import classes from './AnalyticsRoute.module.css';

export default function AnalyticsRoute() {
  const [metricsQuery, planQuery] = useQueries({
    queries: [
      {
        queryKey: ['quota-metrics'],
        queryFn: api.getQuotaMetrics,
      },

      {
        queryKey: ['active-plan'],
        queryFn: api.getActivePlan,
      },
    ],
  });

  const isLoading = metricsQuery.isLoading || planQuery.isLoading;

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <h1>Analytics</h1>

      <SimpleGrid
        className={classes.grid}
        cols={{ base: 1, md: 2 }}
        spacing={{ base: 10, sm: 'xl' }}
        verticalSpacing={{ base: 'md', sm: 'xl' }}
      >
        <QuotaMetricsCard
          title={'Storage'}
          description={'Total bytes uploaded'}
          value={metricsQuery.data.uploadedFilesSize}
          limit={planQuery.data.quotas.uploadSizeLimit}
          valueType={'BYTES'}
        />
        <QuotaMetricsCard
          title={'Uploads'}
          description={'Number of files uploaded'}
          value={metricsQuery.data.uploadedFilesCount}
          limit={planQuery.data.quotas.uploadCountLimit}
          valueType={'COUNT'}
        />
        <QuotaMetricsCard
          title={'Bandwidth'}
          description={'Total bytes downloaded'}
          value={metricsQuery.data.downloadedFilesSize}
          limit={planQuery.data.quotas.downloadSizeLimit}
          valueType={'BYTES'}
        />
        <QuotaMetricsCard
          title={'Downloads'}
          description={'Number of files downloaded'}
          value={metricsQuery.data.downloadedFilesCount}
          limit={planQuery.data.quotas.downloadCountLimit}
          valueType={'COUNT'}
        />
      </SimpleGrid>

      {/*<div>*/}
      {/*    {JSON.stringify(metricsQuery.data, null, 2)}*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*    {JSON.stringify(planQuery.data, null, 2)}*/}
      {/*</div>*/}
    </>
  );
}
