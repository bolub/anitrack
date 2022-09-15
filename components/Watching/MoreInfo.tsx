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
import {
  removeFromAbandoned,
  removeFromFinished,
  removeFromWatch,
  removeFromWatching,
} from '../../API/removeFromList';
import { updateData, updateProps } from '../../API/updateData';
import {
  addToAbandoned,
  addToFinished,
  addToWatching,
} from '../../API/addToList';
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

  const {
    mutate: removeAbandonedHandler,
    isLoading: removeFromAbandonedLoading,
  } = useMutation(removeFromAbandoned, {
    onSuccess() {
      queryClient.invalidateQueries(['allAbandoned']);

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

  const {
    mutate: removeFinishedHandler,
    isLoading: removeFromFinishedLoading,
  } = useMutation(removeFromFinished, {
    onSuccess() {
      queryClient.invalidateQueries(['allFinished']);

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

  const { mutate: removeWatchHandler, isLoading: removeFromWatchLoading } =
    useMutation(removeFromWatch, {
      onSuccess() {
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

  const { mutate: addToWatchingHandler } = useMutation(addToWatching, {
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

  const { mutate: addToFinishedHandler } = useMutation(addToFinished, {
    onSuccess(data) {
      queryClient.invalidateQueries(['allFinished']);

      toast({
        description: 'Added successfully',
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const { mutate: addToAbandonedHandler } = useMutation(addToAbandoned, {
    onSuccess(data) {
      queryClient.invalidateQueries(['allWatching']);
      queryClient.invalidateQueries(['allAbandoned']);

      toast({
        description: 'Added successfully',
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

  const shimmer = (w: any, h: any) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

  const toBase64 = (str: any) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW='700px'>
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
                    {removeFromWatchLoading ||
                    removeWatchingLoading ||
                    removeFromAbandonedLoading ||
                    removeFromFinishedLoading ? (
                      <Spinner size='sm' />
                    ) : (
                      <Icon mt='1' as={HiOutlineDotsHorizontal} />
                    )}
                  </MenuButton>

                  <MenuList>
                    {/* Start watching */}
                    {type !== 'watching' && (
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
                        {type !== 'finished' ? 'Start watching' : 'Rewatch'}
                      </MenuItem>
                    )}

                    {/* Finish */}
                    {type === 'watching' && (
                      <MenuItem
                        onClick={() => {
                          setIsMoving(true);

                          removeWatchingHandler({
                            id: data?.id,
                          });

                          addToFinishedHandler([
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
                        Finish watching
                      </MenuItem>
                    )}

                    {/* Abandon */}
                    {type !== 'finished' && type !== 'abandoned' && (
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

                          addToAbandonedHandler([
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
                        Abandon
                      </MenuItem>
                    )}

                    {/* Remove / Delete */}
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

                        if (type === 'abandoned') {
                          removeAbandonedHandler({
                            id: data?.id,
                          });
                        }

                        if (type === 'finished') {
                          removeFinishedHandler({
                            id: data?.id,
                          });
                        }
                      }}
                    >
                      Remove...forever
                    </MenuItem>
                  </MenuList>
                </Menu>
              </>
            )}
          </Flex>

          {/* Image */}
          <Box mt={6} w='full' h='455px' pos='relative' rounded={'8px'}>
            <Image
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer('auto', 455)
              )}`}
              layout='fill'
              objectFit='cover'
              src={animeData?.imageUrl}
              style={{
                borderRadius: '8px',
              }}
              alt={animeData?.titleEnglish}
              placeholder='blur'
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
