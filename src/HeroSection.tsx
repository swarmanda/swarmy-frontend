import { Anchor, Button, Flex, Group, Space, Text } from '@mantine/core';
// import image from './image.svg';
import classes from './HeroSection.module.css';
import { SwarmLogo } from './SwarmLogo.tsx';
import { Logo } from './Logo.tsx';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { AppIcon } from './AppIcon.tsx';

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
            <Flex justify={'center'} align={'center'}>
              <AppIcon s={90} />
              <Logo w={256} mt={16} ml={10} />
            </Flex>

            <Space h={'xl'} />
            <Flex className={classes.subTitle} align={'end'}>
              <Text fz={18} fw={600} mr={10} c={'white'}>
                A
              </Text>
              <SwarmLogo className={classes.logo} height={28} />
              <Text fz={20} fw={600} c={'white'}>
                &nbsp; as a service solution
              </Text>
            </Flex>

            <Flex mt={'sm'} direction={'column'}>
              <Text fz={18} fw={400}>
                A service that makes it simple to store and retrieve media on{' '}
                <Anchor fz={18} target={'_blank'} href={'https://www.ethswarm.org/'}>
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
