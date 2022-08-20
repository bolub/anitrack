import React, { FC } from 'react';
import {
  Text,
  chakra,
  Flex,
  HStack,
  Box,
  useDisclosure,
  Stack,
} from '@chakra-ui/react';
import { AnimeWatchingProps } from '../../utils/GenericTypes';
import MoreInfo from './MoreInfo';

const AnimeComp: FC<{ data: AnimeWatchingProps; type: string }> = ({
  data,
  type,
}) => {
  const animeData = data?.fields;
  const disclosure = useDisclosure();

  return (
    <>
      <Flex
        // w='561px'
        h='466px'
        backgroundImage={`url("${animeData?.imageUrl}")`}
        backgroundRepeat='no-repeat'
        backgroundSize={'cover'}
        backgroundPosition='center'
        backgroundBlendMode={'multiply'}
        bgColor='gray.400'
        px={4}
        py={4}
        onClick={disclosure.onOpen}
      >
        <Box mt='auto'>
          <chakra.h3
            fontWeight={'semibold'}
            fontSize='xl'
            noOfLines={1}
            textShadow='md'
            color='white'
          >
            {animeData?.titleEnglish}{' '}
            {animeData?.titleJapanese && `(${animeData?.titleJapanese})`}
          </chakra.h3>
          <Stack
            spacing={{ base: 0, md: 1 }}
            direction={{ base: 'column', md: 'row' }}
            alignItems='center'
          >
            {type === 'watching' && (
              <>
                <Text
                  as='span'
                  fontWeight={'medium'}
                  textShadow='md'
                  color='white'
                >
                  Stopped watching at ep {animeData?.episodeWatching ?? 1}
                </Text>
                <Box
                  display={{ base: 'none', md: 'block' }}
                  w={2}
                  h={2}
                  bg='white'
                  rounded={'full'}
                ></Box>
              </>
            )}

            <Text as='span' fontWeight={'medium'} textShadow='md' color='white'>
              {animeData?.episodeCount ? (
                <>
                  {animeData?.episodeCount} episode
                  {Number(animeData?.episodeCount) > 1 ? 's' : ''}
                </>
              ) : (
                <>Ongoing</>
              )}
            </Text>
          </Stack>
        </Box>
      </Flex>

      <MoreInfo disclosure={disclosure} data={data} type={type} />
    </>
  );
};

export default AnimeComp;
