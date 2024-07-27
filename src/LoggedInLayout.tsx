import { AppShell, Burger, Flex, NavLink, Space, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { IconChartBar, IconCode, IconFileInvoice, IconFileStack, IconHexagonPlus, IconKey } from '@tabler/icons-react';
import UserMenu from './UserMenu.tsx';

export default function LoggedInLayout({ children }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        layout="alt"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header withBorder={false}>
          <Flex justify="space-between" align="center" p={'md'}>
            <div>
              <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            </div>
            <Flex justify="flex-end" align="center" gap={12}>
              {/*<ThemeSwitcher />*/}
              <UserMenu />
            </Flex>
          </Flex>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <Space h="sm" />
          <Flex justify={'center'} align={'center'} gap={6}>
            <Title size={26}>Swarmy</Title>
            <IconHexagonPlus size={26} />
          </Flex>
          <Space h="xl" />
          {/*<NavLink*/}
          {/*    component={RouterNavLink}*/}
          {/*    to={"/app/profile"}*/}
          {/*    label="Profile"*/}
          {/*    leftSection={<IconUser size="1.5rem" stroke={1.5}/>}*/}
          {/*/>*/}
          <NavLink
            component={RouterNavLink}
            to={'/app/files'}
            label="Files"
            leftSection={<IconFileStack size="1.5rem" stroke={1.5} />}
          />
          <NavLink
            component={RouterNavLink}
            to={'/app/analytics'}
            label="Analytics"
            leftSection={<IconChartBar size="1.5rem" stroke={1.5} />}
          />
          <NavLink
            component={RouterNavLink}
            to={'/app/api-keys'}
            label="Api keys"
            leftSection={<IconKey size="1.5rem" stroke={1.5} />}
          />
          <NavLink
            component={RouterNavLink}
            to={'/app/api-guide'}
            label="Api guide"
            leftSection={<IconCode size="1.5rem" stroke={1.5} />}
          />
          <NavLink
            component={RouterNavLink}
            to={'/app/billing'}
            label="Billing"
            leftSection={<IconFileInvoice size="1.5rem" stroke={1.5} />}
          />
        </AppShell.Navbar>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </>
  );
}
