import { Anchor, rem, Title } from '@mantine/core';
import { NavLink as RouterNavLink } from 'react-router-dom';

interface LogoProps {
  size?: string;
  color?: string;
  link?: boolean;
}

export function Logo({ size = rem(50), color = 'white', link = false, ...rest }: LogoProps) {
  if (link) {
    return (
      <Anchor style={{ textDecoration: 'none' }} size="sm" component={RouterNavLink} to={'/'}>
        <Title c={color} size={size} mb={10} {...rest}>
          Swarmy
        </Title>
      </Anchor>
    );
  }

  return (
    <>
      <Title c={color} size={size} mb={10} {...rest}>
        Swarmy
      </Title>
    </>
  );
}
