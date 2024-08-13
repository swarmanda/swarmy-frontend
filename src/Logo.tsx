import { Anchor, Image } from '@mantine/core';
import { NavLink as RouterNavLink } from 'react-router-dom';
import smallTextUrl from '../public/assets/swarmy-text-white-250.png';
import largeTextUrl from '../public/assets/swarmy-text-white-500.png';

interface LogoProps {
  w?: any;
  h?: any;
  color?: string;
  link?: boolean;
  rest?: any;
}

export function Logo({ w = 250, h = 56, color = 'white', link = false, ...rest }: LogoProps) {
  const textUrl = w > 250 ? largeTextUrl : smallTextUrl;
  if (link) {
    return (
      <Anchor style={{ textDecoration: 'none' }} size="sm" component={RouterNavLink} to={'/'}>
        <Image fit={'contain'} w={w} h={h} src={textUrl}  {...rest}/>
      </Anchor>
    );
  }

  return (
    <>
      <Image fit={'contain'} w={w} h={h} src={textUrl} {...rest} />
    </>
  );
}
