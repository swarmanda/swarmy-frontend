import { Paper, Title, Text, TextInput, Button, Container, Group, Anchor, Center, Box, rem } from '@mantine/core';
import { IconArrowLeft, IconX } from '@tabler/icons-react';
import classes from './ForgotPassword.module.css';
import PublicLayout from '../PublicLayout.tsx';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';
import { api } from '../api/Api.ts';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';

export function ForgotPasswordRoute() {
  const [submitted, setSubmitted] = useState(false);
  const [sendEnabled, setSendEnabled] = useState(true);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  async function onSubmit({ email }) {
    if (submitted || !sendEnabled) {
      return;
    }
    try {
      setSendEnabled(false);
      setTimeout(() => setSendEnabled(true), 60_000);
      await api.sendResetPasswordEmail(email);
      setSubmitted(true);
    } catch (e) {
      console.error(e);
      notifications.show({
        title: 'Something went wrong',
        message: 'Please try again later',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        color: 'red',
      });
    }
  }

  if (submitted) {
    return (
      <PublicLayout>
        <Container size={450} my={30}>
          <Title className={classes.title} ta="center">
            Password reset link was sent to
          </Title>
          <Text fw={700} size={'xl'} c={'green'} ta="center">{form.getValues().email}</Text>
          <Text mt={'md'} c="dimmed" fz="sm" ta="center">
            Click the reset button in the email in the next 60 minutes to reset your password.
          </Text>
        </Container>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <Container size={460} my={30}>
        <Title className={classes.title} ta="center">
          Forgot your password?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>

        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
            <TextInput
              type="email"
              label="Your email"
              placeholder="your@email.com"
              required
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <Group justify="space-between" mt="lg" className={classes.controls}>
              <Anchor component={Link} to={'/login'} c="dimmed" size="sm" className={classes.control}>
                <Center inline>
                  <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                  <Box ml={5}>Back to the login page</Box>
                </Center>
              </Anchor>
              <Button disabled={!sendEnabled} className={classes.control} type="submit">
                Reset password
              </Button>
            </Group>
          </Paper>
        </form>
      </Container>
    </PublicLayout>
  );
}
