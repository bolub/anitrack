import React from 'react';

import {
  Box,
  Container,
  Text,
  chakra,
  Button,
  useColorMode,
  HStack,
  IconButton,
  Tooltip,
} from '@chakra-ui/react';

import Image from 'next/image';
import { HiOutlineLogout, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';

import LogoBlack from './../public/LogoBlack.svg';
import LogoWhite from './../public/LogoWhite.svg';
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { logout } = useAuth0();

  return (
    <chakra.nav>
      <Container h='100px' maxW={'7xl'} display='flex'>
        <HStack>
          <Box maxW={'45px'}>
            <Image
              alt='Rengoku'
              src={colorMode === 'dark' ? LogoWhite : LogoBlack}
            />
          </Box>

          <Text
            my='auto'
            as='span'
            fontWeight={'black'}
            fontSize='sm'
            textTransform={'uppercase'}
          >
            Rengoku
          </Text>
        </HStack>

        <Button
          p={1}
          rounded='full'
          my='auto'
          ml='auto'
          onClick={toggleColorMode}
        >
          {colorMode === 'light' ? <HiOutlineMoon /> : <HiOutlineSun />}
        </Button>

        <Tooltip label='logout'>
          <IconButton
            aria-label='logout'
            my='auto'
            rounded='full'
            variant={'ghost'}
            ml={2}
            onClick={() => {
              logout();
            }}
            icon={<HiOutlineLogout />}
          />
        </Tooltip>
      </Container>
    </chakra.nav>
  );
};

export default Navbar;
