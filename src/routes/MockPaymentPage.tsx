import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  Center,
  Container,
  Divider,
  rem,
  Space,
  Stack,
  Title,
} from '@mantine/core';
import { api } from '../api/Api.ts';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

export default function MockPaymentPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  async function completePayment() {
    const txId = searchParams.get('merchantTransactionId');
    if (!txId) {
      console.log(searchParams);
      notifications.show({
        title: 'No merchant transaction param.',
        message: '',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        color: 'red',
      });
      return;
    }

    try {
      await api.sendFakePaymentWebhook(txId);

      notifications.show({
        title: 'Payment successful',
        message: `click to navigate back`,
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        color: 'green',
      });
    } catch (e) {
      console.error(e);
      notifications.show({
        title: 'Payment failed',
        message: ``,
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        color: 'red',
      });
    }
  }

  function navigateBack() {
    const txId = searchParams.get('merchantTransactionId');
    if (!txId) {
      console.log(searchParams);
      notifications.show({
        title: 'No merchant transaction param.',
        message: '',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        color: 'red',
      });
      return;
    }
    navigate(`/app/billing?txid=${txId}&status=success`);
  }

  return (
    <Container size={420} my={40}>
      <Center>
        <Stack>
          <Title ta="center">Payment form</Title>
          <Divider />
          <Space h={'sm'}></Space>

          <Button onClick={completePayment}>Complete Payment</Button>
          <Button onClick={navigateBack}>Navigate back</Button>
        </Stack>
      </Center>
    </Container>
  );
}
