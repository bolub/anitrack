import React, { FC, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  chakra,
  HStack,
  Text,
  Box,
  ModalFooter,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Spinner,
  Input,
  IconButton,
  useToast,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { AnimeWatchingProps } from '../../utils/GenericTypes';
import Image from 'next/image';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import {
  HiOutlineCheck,
  HiOutlineClock,
  HiOutlineDotsHorizontal,
} from 'react-icons/hi';
import { useMutation, useQueryClient } from 'react-query';
import { removeFromWatch, removeFromWatching } from '../../API/removeFromList';
import { updateData, updateProps } from '../../API/updateData';
import { addToWatching } from '../../API/addToList';
dayjs.extend(advancedFormat);

const MoreInfo: FC<{
  disclosure: {
    isOpen: boolean;
    onClose: () => void;
  };
  data: AnimeWatchingProps;
  type: string;
}> = ({ disclosure, data, type }) => {
  const { isOpen, onClose } = disclosure;
  const [isMoving, setIsMoving] = useState(false);

  const animeData = data?.fields;

  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate: removeWatchingHandler, isLoading: removeWatchingLoading } =
    useMutation(removeFromWatching, {
      onSuccess(data) {
        queryClient.invalidateQueries(['allWatching']);

        toast({
          description: 'Removed',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      },
    });

  const { mutate: removeWatchHandler, isLoading: removeFromWatchLoading } =
    useMutation(removeFromWatch, {
      onSuccess(data) {
        queryClient.invalidateQueries(['allToWatch']);

        if (!isMoving) {
          toast({
            description: 'Removed',
            status: 'success',
            duration: 9000,
            isClosable: true,
            position: 'top-right',
          });
        }

        setIsMoving(false);
      },
    });

  const { mutate: updateWatchingHandler, isLoading: updateLoading } =
    useMutation(updateData, {
      onSuccess(data) {
        queryClient.invalidateQueries(['allWatching']);

        toast({
          description: 'Updated successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      },
    });

  const { mutate: addToWatchingHandler, isLoading: addToWatchingLoading } =
    useMutation(addToWatching, {
      onSuccess(data) {
        queryClient.invalidateQueries(['allWatching']);
        queryClient.invalidateQueries(['allToWatch']);

        toast({
          description: 'Nice addition',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      },
    });

  const [episodeWatching, setCurrentEpisode] = useState(
    animeData?.episodeWatching
  );

  const { colorMode } = useColorMode();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW='700px'>
        {/* <ModalHeader>Modal Title</ModalHeader> */}
        <ModalCloseButton />
        <ModalBody mt='52px' px={{ base: 4, md: '60px' }}>
          {/* title */}
          <Flex>
            {/* content */}
            <Box>
              <chakra.h3 fontWeight={'semibold'} fontSize='xl' textShadow='md'>
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
                    <Text fontWeight={'medium'} textShadow='md'>
                      Stopped watching at ep
                      <Input
                        variant='unstyled'
                        fontWeight={'medium'}
                        textShadow='md'
                        value={episodeWatching ?? 1}
                        onChange={(e) => {
                          setCurrentEpisode(e.target.value);
                        }}
                        w='fit-content'
                        maxW='25px'
                      />
                    </Text>

                    <Box
                      display={{ base: 'none', md: 'block' }}
                      w={2}
                      h={2}
                      bg={colorMode === 'light' ? 'black' : 'white'}
                      rounded={'full'}
                    ></Box>
                  </>
                )}
                <Text as='span' fontWeight={'medium'} textShadow='md'>
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

            {animeData.episodeWatching !== episodeWatching ? (
              <IconButton
                isLoading={updateLoading}
                onClick={() => {
                  const dataToSend: updateProps = {
                    id: data.id,
                    fields: {
                      episodeWatching,
                    },
                  };
                  updateWatchingHandler([dataToSend]);
                }}
                ml='auto'
                rounded='full'
                p={3}
                aria-label='update'
                icon={<HiOutlineCheck />}
              />
            ) : (
              <>
                <Menu autoSelect={false}>
                  <MenuButton
                    ml='auto'
                    rounded='full'
                    as={Button}
                    p={3}
                    fontSize='lg'
                    justifyContent={'center'}
                    alignItems='center'
                  >
                    {removeFromWatchLoading || removeWatchingLoading ? (
                      <Spinner size='sm' />
                    ) : (
                      <Icon mt='1' as={HiOutlineDotsHorizontal} />
                    )}
                  </MenuButton>

                  <MenuList>
                    <MenuItem
                      onClick={() => {
                        setIsMoving(true);

                        if (type === 'watching') {
                          removeWatchingHandler({
                            id: data?.id,
                          });
                        }

                        if (type === 'toWatch') {
                          removeWatchHandler({
                            id: data?.id,
                          });
                        }
                      }}
                    >
                      Remove...forever
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        removeWatchHandler({
                          id: data?.id,
                        });

                        addToWatchingHandler([
                          {
                            fields: {
                              titleEnglish: animeData?.titleEnglish,
                              titleJapanese: animeData?.titleJapanese,
                              description: animeData?.description,
                              minsPerEpisode: animeData?.minsPerEpisode,
                              episodeCount: animeData?.episodeCount,
                              // @ts-ignore
                              airedFrom: animeData?.airedFrom,
                              // @ts-ignore
                              airedTo: animeData?.airedTo,
                              currentlyAiring: animeData?.currentlyAiring,
                              imageUrl: animeData?.imageUrl,
                            },
                          },
                        ]);
                      }}
                    >
                      Start watching
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            )}
          </Flex>

          {/* Image */}
          <Box mt={6} w='full' h='455px' pos='relative' rounded={'8px'}>
            <Image
              layout='fill'
              objectFit='cover'
              src={animeData?.imageUrl}
              style={{
                borderRadius: '8px',
              }}
              alt={animeData?.titleEnglish}
            />
          </Box>

          {/* episode data */}
          <Stack direction={{ base: 'column', md: 'row' }} mt='25px'>
            <HStack>
              <HiOutlineClock />

              <Text
                as='span'
                fontSize={'sm'}
                fontWeight={'medium'}
                textShadow='md'
              >
                From {dayjs(animeData?.airedFrom).format('Do MMM YYYY')} to{' '}
                {dayjs(animeData?.airedTo).format('Do MMM YYYY')}
              </Text>
            </HStack>

            <HStack>
              <Box
                w={2}
                h={2}
                bg={colorMode === 'light' ? 'black' : 'white'}
                rounded={'full'}
              ></Box>
              <Text
                as='span'
                fontSize={'sm'}
                fontWeight={'medium'}
                textShadow='md'
              >
                {animeData?.minsPerEpisode}
              </Text>
            </HStack>
          </Stack>

          {/* content */}
          <Text mt='17px' mb={10}>
            {animeData?.description}
          </Text>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MoreInfo;
