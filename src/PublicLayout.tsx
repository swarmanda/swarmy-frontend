import { Anchor, AppShell, Button, Flex, Group, Space, Text } from '@mantine/core';
import { Link, NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import { IconApps, IconLogin } from '@tabler/icons-react';
import { Logo } from './Logo.tsx';
import { Footer } from './Footer.tsx';
import { useAuthStore } from './store/AuthStore.ts';
import { CookieConsent } from 'react-cookie-consent';
import UserMenu from './UserMenu.tsx';
import { useProfileStore } from './store/ProfileStore.ts';
import { AppIcon } from './AppIcon.tsx';

export default function PublicLayout({ children }) {
  const signedIn = useAuthStore((state) => state.signedIn());
  const { emailVerified } = useProfileStore();
  const location = useLocation();

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Flex justify="space-between" align="center" ml={10}>
          <Anchor style={{ textDecoration: 'none' }} size="sm" component={RouterNavLink} to={'/'}>
            <Group gap={8}>
              <AppIcon s={40} />
              <Logo w={100} mt={4} />
            </Group>
          </Anchor>
          <Flex mr={20} mih={60} gap="md" justify="end" align="center" direction="row" wrap="wrap">
            {signedIn ? (
              <Button disabled={!emailVerified} component={Link} to={'/app'} rightSection={<IconApps size={20} />}>
                App
              </Button>
            ) : (
              <Button component={Link} to={'/login'} rightSection={<IconLogin size={20} />}>
                Sign in
              </Button>
            )}

            {signedIn && <UserMenu />}
          </Flex>
        </Flex>
      </AppShell.Header>

      <AppShell.Main {...(location.pathname === '/' ? { p: 0 } : {})}>
        {children}
        <Space h={'xl'} />
      </AppShell.Main>
      <CookieConsent
        buttonStyle={{
          background: 'rgb(12, 159, 86)',
          color: 'white',
          fontWeight: 700,
          borderRadius: '5px',
          fontSize: '13px',
        }}
      >
        <Text size={'md'}>
          This website uses cookies to enhance the user experience. You can see our policy
          <Anchor ml={4} component={RouterNavLink} to={'/privacy'}>
            here
          </Anchor>
          .
        </Text>
      </CookieConsent>

      <AppShell.Footer>
        <Footer />
      </AppShell.Footer>
    </AppShell>
  );
}
