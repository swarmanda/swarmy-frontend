import { Anchor, Button, Flex, Group, rem, Space, Text } from '@mantine/core';
// import image from './image.svg';
import classes from './HeroSection.module.css';
import { SwarmLogo } from './SwarmLogo.tsx';
import { Logo } from './Logo.tsx';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useEffect } from 'react';

export function HeroSection() {
  useEffect(() => {
    console.debug('Drawing topology');
    VANTA.TOPOLOGY({
      el: '#hero-canvas',
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 3.0,
      scaleMobile: 3.0,
      color: '#1ee783',
      backgroundColor: '#1d252c',
    });
  }, []);

  return (
    <Flex>
      <div id="hero-canvas" className={classes.heroCanvas}></div>

      <div className={classes.inner}>
        <div>
          <Flex justify={'flex-start'} align={'start'} direction={'column'} className={classes.title}>
            <Logo size={rem(50)} />
            <Space h={'md'} />
            <Flex className={classes.subTitle} align={'end'}>
              <SwarmLogo className={classes.logo} height={40} />
              <Text fz={30} c={{ base: 'white' }}>
                &nbsp; as a service
              </Text>
            </Flex>

            <Flex direction={'column'}>
              <Text c="dimmed" mt="md"></Text>

              <Text fw={600}>
                A service that makes it simple to store and retrieve media on{' '}
                <Anchor target={'_blank'} href={'https://www.ethswarm.org/'}>
                  Swarm
                </Anchor>
                .
              </Text>

              <Group mt={30}>
                <Button radius="sm" size="md" className={classes.control} component={RouterNavLink} to={'/signup'}>
                  Get started
                </Button>
              </Group>
            </Flex>
          </Flex>
        </div>
        {/*<Image src={image.src} className={classes.image} />*/}
      </div>
    </Flex>
  );
}
