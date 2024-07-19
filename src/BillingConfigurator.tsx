import { Button, Card, Container, Skeleton, Slider, Space, Table, Text, Title } from '@mantine/core';
import classes from './BillingConfigurator.module.css';
import { useQueries } from '@tanstack/react-query';
import { api } from './api/Api.ts';
import { useEffect, useState } from 'react';
import { ActivePlanCard } from './ActivePlanCard.tsx';

function min(options: any) {
  return Math.min(...options.map((o: any) => o.value));
}

function max(options: any) {
  return Math.max(...options.map((o: any) => o.value));
}

export function BillingConfigurator() {
  const [capacity, setCapacity] = useState(-1);
  const [bandwidth, setBandwidth] = useState(-1);

  const [subscriptionConfigQuery, activePlanQuery] = useQueries({
    queries: [
      {
        queryKey: ['subscription-config'],
        queryFn: api.getSubscriptionConfig,
      },

      {
        queryKey: ['active-plan'],
        queryFn: api.getActivePlan,
      },
    ],
  });
  const isLoading = subscriptionConfigQuery.isLoading || activePlanQuery.isLoading;

  useEffect(() => {
    if (subscriptionConfigQuery.isSuccess && activePlanQuery.isSuccess) {
      const config = subscriptionConfigQuery.data;

      setBandwidth(config.bandwidth.defaultOption);
      setCapacity(config.storageCapacity.defaultOption);
      console.log('Config', config);
      console.log('Active plan', activePlanQuery.data);
    }
  }, [subscriptionConfigQuery.isSuccess, activePlanQuery.isSuccess]);

  const config = subscriptionConfigQuery.data;

  function getSelectedCapacityLabel() {
    return config.storageCapacity.options.find((o) => o.value === capacity)?.label;
  }

  function getSelectedBandwidthLabel() {
    return config.bandwidth.options.find((o) => o.value === bandwidth)?.label;
  }

  async function startSubscription() {
    // todo try catch
    const result = await api.startSubscription(capacity, bandwidth);
    window.location.href = result.redirectUrl;
  }

  function getMonthlyCapacityCost() {
    const requestedCapacity = 2 ** capacity;
    return config.storageCapacity.pricePerGb * requestedCapacity;
  }

  function getMonthlyBandwidthCost() {
    const requestedBandwidth = 2 ** bandwidth;
    return config.bandwidth.pricePerGb * requestedBandwidth;
  }

  function getMonthlyTotal() {
    const total = getMonthlyCapacityCost() + getMonthlyBandwidthCost();
    return total.toFixed(2);
  }

  function adjustCapacity(capacity: number) {
    console.log(capacity)
    if(capacity < 5) {
      return
    }
    setCapacity(capacity)
  }

  return (
    <Container py="xl">
      <ActivePlanCard plan={activePlanQuery.data} isLoading={activePlanQuery.isLoading} />
      <Space h="xl"/>
      <Card shadow="md" radius="md" padding="xl">
        <Title order={2}>Subscription configurator</Title>
        <Space h="xl" />

        <Title order={4} mb={6}>
          Storage capacity
        </Title>

        {isLoading ? (
          <>
            <Skeleton height={8} width="70%" radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
          </>
        ) : (
          <>
            <Text size={'sm'} c={'dimmed'}>
              Total size of data that can be stored by Swarmy. Can be upgraded later.
            </Text>
            <Text size={'sm'} c={'dimmed'}>
              {config.currency} {config.storageCapacity.pricePerGb.toFixed(2)} per GB
            </Text>

            <Space h="md" />

            <Slider
              className={classes.slider}
              step={1}
              min={min(config.storageCapacity.options)}
              max={max(config.storageCapacity.options)}
              value={capacity}
              onChange={adjustCapacity}
              marks={config.storageCapacity.options}
              label={null}
            />
          </>
        )}

        <Space h="xl" />
        <Space h="xl" />
        <Title order={4} mb={6}>
          Bandwidth
        </Title>

        {isLoading ? (
          <>
            <Skeleton height={8} width="70%" radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
            <Skeleton height={8} mt={6} radius="xl" />
          </>
        ) : (
          <>
            <Text size={'sm'} c={'dimmed'}>
              Size of data that can be downloaded in a month. Can be upgraded later.
            </Text>
            <Text size={'sm'} c={'dimmed'}>
              {config.currency} {config.bandwidth.pricePerGb.toFixed(2)} per GB
            </Text>
            <Space h="md" />
            <Slider
              className={classes.slider}
              step={1}
              min={min(config.bandwidth.options)}
              max={max(config.bandwidth.options)}
              value={bandwidth}
              onChange={setBandwidth}
              marks={config.bandwidth.options}
              label={null}
            />
          </>
        )}

        <Space h="xl" />
        <Space h="xl" />
        <Space h="xl" />
        <Title order={4} mb={6}>
          Price
        </Title>

        {isLoading ? (
          <>
            <Skeleton height={8} mt={6} width="50%" radius="xl" />
            <Skeleton height={8} mt={6} width="50%" radius="xl" />
            <Skeleton height={8} mt={6} width="50%" radius="xl" />
          </>
        ) : (
          <Table className={classes.summaryTable}>
            <Table.Tbody>
              <Table.Tr>
                <Table.Td>Storage Capacity</Table.Td>
                <Table.Td>{getSelectedCapacityLabel()}</Table.Td>
                <Table.Td>
                  {config.currency} {getMonthlyCapacityCost().toFixed(2)} / month
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>Bandwidth</Table.Td>
                <Table.Td>{getSelectedBandwidthLabel()}</Table.Td>
                <Table.Td>
                  {config.currency} {getMonthlyBandwidthCost().toFixed(2)} / month
                </Table.Td>
              </Table.Tr>

              <Table.Tr>
                <Table.Td>
                  <Text fw={600}>Total</Text>
                </Table.Td>
                <Table.Td></Table.Td>
                <Table.Td>
                  {config.currency} {getMonthlyTotal()} / month
                </Table.Td>
              </Table.Tr>
            </Table.Tbody>
          </Table>
        )}

        <Space h="xl" />

        <Button disabled={isLoading} onClick={() => startSubscription()}>
          Subscribe
        </Button>
      </Card>
    </Container>
  );
}
