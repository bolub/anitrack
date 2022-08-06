import { Container, Text, chakra } from '@chakra-ui/react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useQuery } from 'react-query';
import { Watching } from '../components/Watching';
import { ToWatch } from '../components/Watching/ToWatch';
import { getAllToWatch, getAllWatching } from './../API/all';

const Home: NextPage = () => {
  const { data, isLoading } = useQuery('allWatching', getAllWatching);
  const { data: toWatchData, isLoading: toWatchLoading } = useQuery(
    'allToWatch',
    getAllToWatch
  );

  return (
    <>
      <Head>
        <title>Anitrack</title>
        <meta name='description' content='Anitrack' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      {/* Navbar */}
      <chakra.nav>
        <Container h='92px' maxW={'7xl'} display='flex'>
          <Text
            my='auto'
            as='span'
            fontWeight={'black'}
            fontSize='sm'
            textTransform={'uppercase'}
          >
            anitrack
          </Text>
        </Container>
      </chakra.nav>

      <chakra.main mt={'20px'} mb={32}>
        {/* watching */}
        <Watching data={data?.records} loading={isLoading} />
        <ToWatch data={toWatchData?.records} loading={toWatchLoading} />
      </chakra.main>
    </>
  );
};

export default Home;
