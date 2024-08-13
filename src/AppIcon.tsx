import { Image } from '@mantine/core';
import imageUrl from '../public/assets/swarmy-icon.svg';

interface IconProps {
  s?: number;
  rest?: any;
}

export function AppIcon({ s = 250, ...rest }: IconProps) {
  return <Image fit={'contain'} w={s} h={s} src={imageUrl} {...rest} />;
}
