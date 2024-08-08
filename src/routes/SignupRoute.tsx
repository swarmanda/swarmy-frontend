import { Link, NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import { api } from '../api/Api';
import PublicLayout from '../PublicLayout';
import { Anchor, Button, Container, Paper, PasswordInput, rem, Space, Text, TextInput, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useAuthStore } from '../store/AuthStore.ts';

export default function SignupRoute() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuthStore();
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length >= 8 ? null : 'Password should be at least 8 characters'),
      passwordConfirmation: (value, values) => (value === values.password ? null : 'Passwords do not match'),
    },
  });

  async function onSubmit({ email, password }) {
    try {
      setSubmitting(true);
      await api.signup({ email, password });
    } catch (e) {
      console.error(e);
      notifications.show({
        title: 'Signup failed',
        message: 'Please try again later',
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        color: 'red',
      });
      return;
    } finally {
      setSubmitting(false);
    }
    try {
      const token = await api.login(email, password);
      setAccessToken(token);
      navigate('/app');
    } catch (e) {
      console.error('Auto login failed', e);
      navigate('/login');
    }
  }

  return (
    <PublicLayout>
      <Container size={480} my={40}>
        <Title ta="center">Create Account</Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" component={Link} to={'/login'}>
            Sign in
          </Anchor>
        </Text>

        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="Your email"
              required
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
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

            <Text mt={'md'} c={'gray.5'} size={'xs'}>
              By signing up you agree to the
              <Anchor c={'green.5'} mx={'4'} component={RouterNavLink} to={'/terms-of-service'}>
                Terms of Service
              </Anchor>
              and
              <Anchor c={'green.5'} ml={4} component={RouterNavLink} to={'/privacy-policy'}>
                Privacy Policy
              </Anchor>.
            </Text>

            <Button disabled={submitting} fullWidth mt="lg" type="submit">
              Sign up
            </Button>
          </Paper>
        </form>
        <Space h={50}/>
      </Container>
    </PublicLayout>
  );
}
