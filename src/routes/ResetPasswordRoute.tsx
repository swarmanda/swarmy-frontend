import { Button, Container, Paper, PasswordInput, rem, Title } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';
import PublicLayout from '../PublicLayout.tsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { api } from '../api/Api.ts';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

export function ResetPasswordRoute() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [searchParams] = useSearchParams();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validate: {
      password: (value) => (value.length >= 8 ? null : 'Password should be at least 8 characters'),
      passwordConfirmation: (value, values) => (value === values.password ? null : 'Passwords do not match'),
    },
  });

  async function onSubmit({ password }) {
    const token = searchParams.get('token');
    if (!token) {
      notifications.show({
        title: `Can't reset password`,
        message: 'Please request a new password reset email',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        color: 'red',
      });
      return;
    }
    try {
      setSubmitting(true);
      await api.resetPassword(password, token);
      notifications.show({
        title: 'Password reset successful!',
        message: 'Now you can log in',
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        color: 'green',
      });
      navigate('/login');
    } catch (e) {
      console.error(e);
      notifications.show({
        title: 'Password reset failed!',
        message: 'Please try again later',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        color: 'red',
      });
      return;
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <PublicLayout>
      <Container size={480} my={10}>
        <Title ta="center">Reset password</Title>

        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              key={form.key('password')}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              label="Confirm password"
              placeholder="Your password again"
              required
              mt="md"
              key={form.key('passwordConfirmation')}
              {...form.getInputProps('passwordConfirmation')}
            />

            <Button disabled={submitting} fullWidth mt="xl" type="submit">
              Submit
            </Button>
          </Paper>
        </form>
      </Container>
    </PublicLayout>
  );
}
