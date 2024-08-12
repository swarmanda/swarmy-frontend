import { Avatar, Menu, rem, Text } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useAuthStore } from './store/AuthStore.ts';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from './store/ProfileStore.ts';

export default function UserMenu() {
  const navigate = useNavigate();
  const { clear: clearAuthStore } = useAuthStore();
  const { email, clear: clearProfile } = useProfileStore();

  function onLogoutPressed() {
    clearAuthStore();
    clearProfile();
    navigate('/');
  }

  return (
    <Menu shadow="md" width={250}>
      <Menu.Target>
        <Avatar variant="transparent" radius="xl" size="48" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>
          <Text size={'xs'} fw={600}>
            {email}
          </Text>
        </Menu.Label>
        <Menu.Divider />
        <Menu.Item leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />} onClick={onLogoutPressed}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
