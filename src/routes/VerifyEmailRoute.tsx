import { api } from '../api/Api.ts';
import { Button, Card, Center, rem, Text, Title } from '@mantine/core';
import { IconCheck, IconMail, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useProfileStore } from '../store/ProfileStore.ts';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PublicLayout from '../PublicLayout.tsx';

export default function VerifyEmailRoute() {
  const [resendEnabled, setResendEnabled] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { emailVerified, setEmailVerified } = useProfileStore();

  useEffect(() => {
    const code = searchParams.get('c');
    if (code) {
      verify(code);
    }
  }, []);

  const { email } = useProfileStore();

  async function verify(code: string) {
    try {
      await api.verifyEmail(code);
      notifications.show({
        title: 'Success!',
        message: 'Email verified successfully!',
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        color: 'green',
      });
      setEmailVerified(true);
    } catch (e) {
      notifications.show({
        title: 'Failed to verify',
        message: 'Please contact support',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        color: 'red',
      });
      console.warn(e);
    }
  }

  async function resend() {
    setResendEnabled(false);
    setTimeout(() => setResendEnabled(true), 20_000);
    try {
      const code = searchParams.get('c');
      await api.resendVerificationEmail(code);
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

  function getVerifiedBlock() {
    return (
      <>
        <Center>
          <Title order={2}>Email successfully verified!</Title>
        </Center>

        <Text my={'lg'}>Thank you for verifying your email. You can start using the site now.</Text>
        <Center>
          <Button onClick={() => navigate('/app/files')}>Let's start</Button>
        </Center>
      </>
    );
  }

  function getUnverifiedBlock() {
    return (
      <>
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
      </>
    );
  }

  return (
    <PublicLayout>
      <Center>
        <Card mt={'xl'} shadow="xs" p="xl" maw={700}>
          <Center>
            <IconMail size={100} />
          </Center>

          {emailVerified ? getVerifiedBlock() : getUnverifiedBlock()}
        </Card>
      </Center>
    </PublicLayout>
  );
}
