import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  Center,
  chakra,
  List,
  ListIcon,
  ListItem,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { HiCheckCircle } from 'react-icons/hi';
import { useQuery } from 'react-query';
import { Watching } from '../components/Watching';
import { Abandoned } from '../components/Watching/Abandoned';
import { Finished } from '../components/Watching/Finished';
import { ToWatch } from '../components/Watching/ToWatch';
import {
  getAllAbandoned,
  getAllFinished,
  getAllToWatch,
  getAllWatching,
} from './../API/all';

const Home: NextPage = () => {
  const {
    isAuthenticated,
    isLoading: authLoading,
    loginWithPopup,
    user,
  } = useAuth0();

  const { data, isLoading } = useQuery(
    'allWatching',
    getAllWatching,

    { enabled: isAuthenticated }
  );
  const { data: toWatchData, isLoading: toWatchLoading } = useQuery(
    'allToWatch',
    getAllToWatch,
    { enabled: isAuthenticated }
  );
  const { data: finishedData, isLoading: finishedLoading } = useQuery(
    'allFinished',
    getAllFinished,
    { enabled: isAuthenticated }
  );
  const { data: abandonedData, isLoading: abandonedLoading } = useQuery(
    'allAbandoned',
    getAllAbandoned,
    { enabled: isAuthenticated }
  );

  return (
    <>
      <Head>
        <title>Rengoku</title>
        <meta name='description' content='Rengoku' />
        <link rel='icon' href='/LogoWhite.svg' />
      </Head>

      {authLoading && (
        <Center h='70vh'>
          <chakra.img src='https://i.pinimg.com/originals/5c/0d/b6/5c0db6d7d688da38a9d557914640a287.gif' />
        </Center>
      )}

      {!isAuthenticated && !authLoading && (
        <Center h='70vh'>
          <Box maxW={'500px'}>
            <chakra.h1 fontWeight={'bold'} fontSize='md'>
              Rengoku was created to help with my anime hobby. Helps in showing:
            </chakra.h1>

            <List spacing={3} mt={8}>
              <ListItem>
                <ListIcon as={HiCheckCircle} />
                Anime I&apos;m watching
              </ListItem>
              <ListItem>
                <ListIcon as={HiCheckCircle} />
                Anime I want to watch
              </ListItem>
              <ListItem>
                <ListIcon as={HiCheckCircle} />
                Anime I&apos;ve finished
              </ListItem>
              {/* You can also use custom icons from react-icons */}
              <ListItem>
                <ListIcon as={HiCheckCircle} />
                Anime I&apos;ve abandoned
              </ListItem>
            </List>

            <Button mt={16} onClick={() => loginWithPopup()}>
              Log In
            </Button>
          </Box>
        </Center>
      )}

      {isAuthenticated && (
        <chakra.main mt={'25px'} mb={32}>
          {/* watching */}
          <Watching data={data?.records} loading={isLoading} />
          <ToWatch data={toWatchData?.records} loading={toWatchLoading} />
          <Finished data={finishedData?.records} loading={finishedLoading} />
          <Abandoned data={abandonedData?.records} loading={abandonedLoading} />
        </chakra.main>
      )}
    </>
  );
};

export default Home;
