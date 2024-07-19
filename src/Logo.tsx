import { Title } from '@mantine/core';

interface LogoProps {
  size?: number;
  color?: string;
}

export function Logo({ size = 50, color = 'white', ...rest }: LogoProps) {
  return (
    <>
      <Title c={color} size={size} mb={10} {...rest}>
        Swarmy
      </Title>
    </>
  );
}
