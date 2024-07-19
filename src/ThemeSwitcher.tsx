import { ActionIcon } from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useThemeStore } from './store/ThemeStore.ts';

export default function ThemeSwitcher() {
  const { theme, setTheme } = useThemeStore();

  function changeTheme() {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  return (
    <ActionIcon
      onClick={changeTheme}
      variant="subtle"
      size="lg"
      aria-label="Theme"
      color={'gray'}
    >
      {theme === 'dark' ? <IconMoon stroke={1.5} /> : <IconSun stroke={1.5} />}
    </ActionIcon>
  );
}
