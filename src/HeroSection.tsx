import { Button, Flex, Group, Text, Title } from '@mantine/core';
// import image from './image.svg';
import classes from './HeroSection.module.css';
import { SwarmLogo } from './SwarmLogo.tsx';
import { Logo } from './Logo.tsx';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useEffect } from 'react';

export function HeroSection() {

  useEffect(() => {
    console.debug("Drawing topology")
    VANTA.TOPOLOGY({
      el: "#hero-canvas",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: '#1ee783',
      backgroundColor: '#1d252c'
    })
  }, [])


  return (
    <Flex size="md"  className={classes.container}>

      <div id="hero-canvas" className={classes.heroCanvas}></div>

      <div className={classes.inner}>
        <div className={classes.content}>
          <Logo size={80} />

          <Flex justify={'flex-start'} align={'end'}>
            <SwarmLogo className={classes.logo} height={40} />
            <Title c={'white'} className={classes.title}>
              &nbsp; as a service
            </Title>
          </Flex>
          <Text c="dimmed" mt="md"></Text>

          <Text>Swarmy makes it simple to store and retrieve media on Swarm.</Text>

          <Group mt={30}>
            <Button radius="xl" size="md" className={classes.control} component={RouterNavLink} to={'/signup'}>
              Get started
            </Button>
          </Group>
        </div>
        {/*<Image src={image.src} className={classes.image} />*/}
      </div>
    </Flex>
  );
}


