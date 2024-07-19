import { ActionIcon, Alert, Button, Card, Group, Menu, Modal, rem, Skeleton, Space, Text, Title } from '@mantine/core';
import { IconAlertTriangle, IconCheck, IconSettings, IconTrash, IconX } from '@tabler/icons-react';
import { useState } from 'react';
import { api } from './api/Api.ts';
import { notifications } from '@mantine/notifications';

interface ActivePlanCardProps {
  isLoading: boolean;
  plan: any;
}

export function ActivePlanCard({ plan, isLoading }: ActivePlanCardProps) {
  const [modalOpened, setModalOpened] = useState(false);

  console.log('PLAN', plan);

  function getStorageCapacity() {
    const gbs = plan.quotas.uploadSizeLimit / 1024 / 1024 / 1024;
    return `${gbs.toFixed(0)} GB`;
  }

  function getBandwidth() {
    const gbs = plan.quotas.uploadSizeLimit / 1024 / 1024 / 1024;
    return `${gbs.toFixed(0)} GB`;
  }

  async function cancelSubscription(): Promise<void> {
    try {
      await api.cancelPlan();
      notifications.show({
        title: 'Success',
        message: `Plan cancelled successfully`,
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        color: 'green',
      });
      setModalOpened(false);
    } catch (e) {
      console.log(e);
      notifications.show({
        title: 'Failed to cancel plan',
        message: e.message,
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        color: 'red',
      });
    }
  }

  function isFreePlan() {
    return plan.type === 'FREE_PLAN';
  }

  function priceLabel() {
    if (isFreePlan()) {
      return '0 EUR / month';
    }
    return `${plan.currency} ${plan.amount.toFixed(2)} / ${plan.frequency.toLowerCase()}`;
  }

  return (
    <Card shadow="md" radius="md" padding="xl">
      {isLoading ? (
        <>
          <Title order={2} mb={'md'}>
            Current plan
          </Title>
          <Skeleton height={8} width="70%" radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
          <Skeleton height={8} mt={6} radius="xl" />
        </>
      ) : (
        <>
          <Group align={'center'} gap={'xs'} mb={'md'}>
            <Title order={2}>Current plan</Title>

            {!isFreePlan() && (
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon size={'sm'} c={'gray'} variant={'subtle'} mt={4}>
                    <IconSettings />{' '}
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => setModalOpened(true)}
                    color="red"
                    leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                  >
                    Cancel plan
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}

            <Modal
              size={'md'}
              centered
              opened={modalOpened}
              onClose={() => setModalOpened(false)}
              title={
                <Text size={'xl'} fw={600}>
                  Confirmation
                </Text>
              }
            >
              <Text mb={'xs'}>Are you sure you want to cancel the plan?</Text>
              <Alert py={'sm'} icon={<IconAlertTriangle />} variant={'filled'} color={'red.9'} fw={600}>
                Your existing files will be removed permanently from the network when their TTL expires.
              </Alert>

              <Alert mt={'md'} py={'sm'} icon={<IconAlertTriangle />} variant={'filled'} color={'red.9'} fw={600}>
                You won't be able to upload new files or download existing files.
              </Alert>
              <Group mt={'xl'} justify="space-between">
                <Button onClick={() => setModalOpened(false)}>No, don't cancel</Button>
                <Button bg={'red.9'} onClick={cancelSubscription}>
                  Yes, cancel
                </Button>
              </Group>
            </Modal>
          </Group>

          <Group gap={'xs'}>
            <Text fw={600}>Storage capacity: </Text> {getStorageCapacity()}
          </Group>
          <Group gap={'xs'}>
            <Text fw={600}>Bandwidth: </Text>
            {getBandwidth()}
          </Group>
          <Group gap={'xs'}>
            <Text fw={600}>Price: </Text>
            {priceLabel()}
          </Group>
        </>
      )}
    </Card>
  );
}
