import {
  Button,
  Icon,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  InputLeftElement,
  Input,
  VStack,
  Box,
  HStack,
  chakra,
  Center,
  Spinner,
  Flex,
  useToast,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FC, useState } from 'react';
import { HiOutlinePlus, HiOutlineSearch } from 'react-icons/hi';
import { useMutation, useQuery } from 'react-query';
import { useDebounce } from 'react-use';
import { addToWatch, addToWatching } from '../API/addToList';
import { getAllAnime } from '../API/all';
import { AnimeSearchProps } from '../utils/GenericTypes';

const AddToList: FC<{ type: string }> = ({ type }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(searchValue);
    },
    1000,
    [searchValue]
  );

  // Fetch
  const { isLoading, data } = useQuery(
    ['allAnime', debouncedValue],
    () => getAllAnime(debouncedValue),
    {
      enabled: !!debouncedValue,
    }
  );

  const toast = useToast();

  // Add to watchlist
  const { mutate: addToWatchingHandler, isLoading: addToWatchingLoading } =
    useMutation(addToWatching, {
      onSuccess(data) {
        toast({
          description: 'Added successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      },
    });

  const { mutate: addToWatchHandler, isLoading: addToWatchLoading } =
    useMutation(addToWatch, {
      onSuccess(data) {
        toast({
          description: 'Added successfully',
          status: 'success',
          duration: 9000,
          isClosable: true,
          position: 'top-right',
        });
      },
    });

  return (
    <>
      <Button variant={'ghost'} onClick={onOpen} ml='auto' my='auto'>
        <Icon mr={1} as={HiOutlinePlus} w='20px' h='20px' />
        <Text as='span' fontSize={'sm'}>
          Add to List
        </Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size='lg'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader mt={8}>
            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                // eslint-disable-next-line
                children={<Icon as={HiOutlineSearch} />}
              />
              <Input
                type='search'
                placeholder='Search anime to add...'
                value={searchValue}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
            </InputGroup>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={4} overflowY='auto' maxH='500px'>
            {isLoading && (
              <Center my={24}>
                <Spinner />
              </Center>
            )}

            {data && (
              <VStack align={'start'} spacing={5} h='full'>
                {data?.data?.map((animData: AnimeSearchProps) => {
                  return (
                    <chakra.button key={animData?.mal_id} w='full'>
                      <HStack spacing={3}>
                        {/* Image */}
                        <Box>
                          <Box w='100px' h='100px' pos='relative'>
                            <Image
                              alt={animData?.title}
                              src={animData?.images?.webp?.large_image_url}
                              objectFit='cover'
                              layout='fill'
                            />
                          </Box>
                        </Box>

                        {/* content */}
                        <Flex flexDir={'column'}>
                          <Text
                            textAlign={'left'}
                            // fontSize={'lg'}
                            fontWeight='semibold'
                            noOfLines={1}
                          >
                            {animData?.title_english ?? animData?.title}{' '}
                            {animData?.title_japanese &&
                              `(${animData?.title_japanese})`}
                          </Text>
                          <HStack spacing={2}>
                            <Text fontSize={'sm'} as='span'>
                              {new Date(animData?.aired?.from).getFullYear()}
                            </Text>
                            <Box w={1} h={1} bg='white' rounded={'full'}></Box>
                            <Text fontSize={'sm'} as='span'>
                              {animData?.airing ? 'Airing' : 'Completed'}
                            </Text>
                          </HStack>

                          <Button
                            mt={4}
                            leftIcon={<HiOutlinePlus />}
                            isLoading={
                              addToWatchingLoading || addToWatchLoading
                            }
                            w='fit-content'
                            size='xs'
                            onClick={() => {
                              if (type === 'toWatch') {
                                addToWatchHandler([
                                  {
                                    fields: {
                                      titleEnglish:
                                        animData?.title ??
                                        animData?.title_english,
                                      titleJapanese:
                                        animData?.title ??
                                        animData?.title_japanese,
                                      description: animData?.synopsis,
                                      minsPerEpisode: animData?.duration,
                                      episodeCount:
                                        animData?.episodes?.toString(),
                                      airedFrom: animData?.aired?.from,
                                      airedTo: animData?.aired?.to,
                                      currentlyAiring:
                                        animData?.airing?.toString(),
                                      imageUrl:
                                        animData?.images?.webp?.large_image_url,
                                    },
                                  },
                                ]);
                              }

                              if (type === 'watching') {
                                addToWatchingHandler([
                                  {
                                    fields: {
                                      titleEnglish:
                                        animData?.title ??
                                        animData?.title_english,
                                      titleJapanese:
                                        animData?.title ??
                                        animData?.title_japanese,
                                      description: animData?.synopsis,
                                      minsPerEpisode: animData?.duration,
                                      episodeCount:
                                        animData?.episodes?.toString(),
                                      airedFrom: animData?.aired?.from,
                                      airedTo: animData?.aired?.to,
                                      currentlyAiring:
                                        animData?.airing?.toString(),
                                      imageUrl:
                                        animData?.images?.webp?.large_image_url,
                                    },
                                  },
                                ]);
                              }
                            }}
                          >
                            Add
                          </Button>
                        </Flex>
                      </HStack>
                    </chakra.button>
                  );
                })}
              </VStack>
            )}
          </ModalBody>

          {/* <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddToList;
