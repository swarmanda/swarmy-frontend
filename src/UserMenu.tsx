import { Avatar, Menu, rem } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useAuthStore } from './store/AuthStore.ts';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from './store/ProfileStore.ts';

export default function UserMenu() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuthStore();
  const { clearProfile } = useProfileStore();

  function onLogoutPressed() {
    setAccessToken('');
    clearProfile();
    navigate('/');
  }

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar variant="light" radius="xl" size="48" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconLogout style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={onLogoutPressed}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
