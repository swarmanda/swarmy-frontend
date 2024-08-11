import { api } from '../api/Api.ts';
import { Button, Card, Center, rem, Text, Title } from '@mantine/core';
import { IconCheck, IconMail, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useProfileStore } from '../store/ProfileStore.ts';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function VerifyEmailRoute() {
  const [resendEnabled, setResendEnabled] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('c');
    if (code) {
      verifyAndNavigate(code);
    }
  }, [searchParams]);

  const { email } = useProfileStore();

  async function verifyAndNavigate(code: string) {
    try {
      await api.verifyEmail(code);
      // navigation.to('/app')
    } catch (e) {
      console.warn(e);
    }
  }

  async function resend() {
    setResendEnabled(false);
    setTimeout(() => setResendEnabled(true), 10_000);
    try {
      await api.resendVerificationEmail();
      notifications.show({
        title: 'Success!',
        message: 'Verification email successfully sent',
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        color: 'green',
      });
    } catch (e) {
      console.error(e);
      notifications.show({
        title: 'Failed to send verification email',
        message: 'Please contact support',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        color: 'red',
      });
    }
  }

  return (
    <Center>
      <Card mt={'xl'} shadow="xs" p="xl" maw={700}>
        <Center>
          <IconMail size={100} />
        </Center>
        <Center>
          <Title order={2}>Verify your email</Title>
        </Center>

        <Text mt={'xl'}>
          We sent an email to <b>{email}</b> to verify your email address and activate your account. The link in the
          email will expire in 24 hours.
        </Text>

        <Text my={'xl'}>
          If you can't see the email, please <b>check your spam</b> folder.
        </Text>

        <Center>
          <Button disabled={!resendEnabled} onClick={resend}>
            Resend email
          </Button>
        </Center>
      </Card>
    </Center>
  );
}
