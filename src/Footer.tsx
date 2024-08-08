import { Anchor, Flex, Group, Text } from '@mantine/core';
import { Logo } from './Logo.tsx';
import { NavLink as RouterNavLink } from 'react-router-dom';

export function Footer() {
  return (
    <>
      <Flex p={20} justify={'space-between'}>
        <Logo ml={10} c={'dimmed'} size={24} />
        <Flex gap={'xs'} align={'center'}>
          <Anchor size={'sm'} component={RouterNavLink} to={'/contact'}>
            Contact
          </Anchor>

          <Text size={'sm'} c={'gray.5'}>
            |
          </Text>

          <Anchor size={'sm'} component={RouterNavLink} to={'/privacy'}>
            Privacy
          </Anchor>

          <Text size={'sm'} c={'gray.5'}>
            |
          </Text>

          <Anchor size={'sm'} component={RouterNavLink} to={'/terms-of-service'}>
            Terms of Service
          </Anchor>
        </Flex>
      </Flex>
    </>
  );
}
