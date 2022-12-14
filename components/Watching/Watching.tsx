import React, { FC } from 'react';
import {
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlineEye,
} from 'react-icons/hi';
import {
  Container,
  chakra,
  Flex,
  Icon,
  HStack,
  IconButton,
  Skeleton,
  Center,
  useBreakpointValue,
} from '@chakra-ui/react';

import AnimeComp from './AnimeComp';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import AddToList from '../AddToList';
import { AnimeWatchingProps } from '../../utils/GenericTypes';

const Watching: FC<{ data: AnimeWatchingProps[]; loading: boolean }> = ({
  data,
  loading,
}) => {
  const slidesPerView = useBreakpointValue({
    base: 1,
    md: 2.2,
  });

  return (
    <chakra.section>
      <Container maxW='6xl'>
        {/* Header */}
        <Flex mb={2}>
          {/* title */}
          <HStack spacing={1} my='auto'>
            <Icon as={HiOutlineEye} w='20px' h='20px' />

            <chakra.h2 fontWeight={'bold'} fontSize='sm'>
              Watching({data?.length})
            </chakra.h2>
          </HStack>

          {/* action */}
          <AddToList type='watching' />
        </Flex>

        {/* content */}
        <Swiper
          navigation={{
            prevEl: '.prevN',
            nextEl: '.nextN',
          }}
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={slidesPerView}
          style={{
            cursor: 'grab',
          }}
        >
          {loading ? (
            <>
              <SwiperSlide>
                <Skeleton height='466px' />
              </SwiperSlide>

              <SwiperSlide>
                <Skeleton height='466px' />
              </SwiperSlide>

              <SwiperSlide>
                <Skeleton height='466px' />
              </SwiperSlide>
            </>
          ) : (
            <>
              {data?.length > 0 ? (
                <>
                  {data?.map((animData: AnimeWatchingProps) => {
                    return (
                      <SwiperSlide key={animData.id}>
                        <AnimeComp data={animData} type='watching' />
                      </SwiperSlide>
                    );
                  })}
                </>
              ) : (
                <SwiperSlide>
                  <Center
                    display='flex'
                    bg='rgba(255, 255, 255, 0.08)'
                    h='466px'
                    textAlign={'center'}
                    w='full'
                    rounded='sm'
                  >
                    Why am I empty? ????
                  </Center>
                </SwiperSlide>
              )}
            </>
          )}
        </Swiper>

        <Flex>
          <HStack ml='auto' mt={5}>
            <div className='prevN'>
              <IconButton
                rounded={'full'}
                aria-label='Prev'
                icon={<HiOutlineChevronLeft />}
              />
            </div>
            <div className='nextN'>
              <IconButton
                rounded={'full'}
                aria-label='next'
                icon={<HiOutlineChevronRight />}
              />
            </div>
          </HStack>
        </Flex>
      </Container>
    </chakra.section>
  );
};

export { Watching };
