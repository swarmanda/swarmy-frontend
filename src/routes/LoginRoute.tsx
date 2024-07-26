import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/Api';
import PublicLayout from '../PublicLayout';
import {
  Anchor,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  rem,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconX } from '@tabler/icons-react';
import { useAuthStore } from '../store/AuthStore.ts';
import { useForm } from '@mantine/form';

export default function LoginRoute() {
  const navigate = useNavigate();
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value ? null : 'Invalid password'),
    },
  });

  const { setAccessToken } = useAuthStore();

  async function onLoginPressed({ email, password }) {
    try {
      const token = await api.login(email, password);
      setAccessToken(token);
      navigate('/app');
    } catch (e) {
      console.error(e);
      notifications.show({
        title: 'Login failed',
        message:
          e.response.status === 401 ? 'Invalid email or password' : e.message,
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        color: 'red',
      });
    }
  }

  return (
    <PublicLayout>
      <Container size={420} my={40}>
        <Title ta="center">Welcome!</Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component={Link} to={'/signup'}>
            Create account
          </Anchor>
        </Text>

        <form onSubmit={form.onSubmit((values) => onLoginPressed(values))}>
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
            <Group justify="end" mt="lg">
              {/*<Checkbox label="Remember me"/>*/}
              <Anchor component={Link} to={'/forgot-password'} size="sm">
                Forgot password?
              </Anchor>
            </Group>
            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </Paper>
        </form>
      </Container>
    </PublicLayout>
  );
}
