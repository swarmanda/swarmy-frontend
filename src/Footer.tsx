import { Container, Group, Anchor, Flex } from '@mantine/core';
import { Logo } from './Logo.tsx';

const links = [
  { link: '#', label: 'Contact' },
  { link: '#', label: 'Privacy' },
];

export function Footer() {
  const items = links.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <>
      <Flex p={20} justify={'space-between'}>
        <Logo ml={10} c={'dimmed'} size={24} />
        <Group>{items}</Group>
      </Flex>
    </>
  );
}
