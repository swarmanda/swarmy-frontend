import { AppShell, Button, Flex, Grid } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import { IconLogin } from '@tabler/icons-react';
import { Logo } from './Logo.tsx';
import { Footer } from './Footer.tsx';
import { useAuthStore } from './store/AuthStore.ts';

export default function PublicLayout({ children }) {
  const signedIn = useAuthStore((state) => state.signedIn());
  const location = useLocation();
  console.log(location.pathname);

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Grid justify="space-between" align="center" ml={20}>
          <Grid.Col span={3}>
            <Link to={'/'}>
              <Logo size={30} />
            </Link>
          </Grid.Col>
          <Grid.Col span={3}>
            <Flex mr={20} mih={60} gap="md" justify="end" align="center" direction="row" wrap="wrap">
              <Button component={Link} to={signedIn ? '/app' : '/login'} rightSection={<IconLogin size={20} />}>
                Sign in
              </Button>
            </Flex>
          </Grid.Col>
        </Grid>
      </AppShell.Header>

      <AppShell.Main {...(location.pathname === '/') ? {p:0}: {}} >{children}</AppShell.Main>
      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
