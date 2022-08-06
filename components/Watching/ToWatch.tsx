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
} from '@chakra-ui/react';

import AnimeComp from './AnimeComp';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import AddToList from '../AddToList';
import { AnimeWatchingProps } from '../../utils/GenericTypes';

const ToWatch: FC<{ data: AnimeWatchingProps[]; loading: boolean }> = ({
  data,
  loading,
}) => {
  return (
    <chakra.section mt={20}>
      <Container maxW='6xl'>
        {/* Header */}
        <Flex mb={2}>
          {/* title */}
          <HStack spacing={1} my='auto'>
            <Icon as={HiOutlineEye} w='20px' h='20px' />

            <chakra.h2 fontWeight={'bold'} fontSize='sm'>
              To Watch({data?.length})
            </chakra.h2>
          </HStack>

          {/* action */}
          <AddToList type='toWatch' />
        </Flex>

        {/* content */}
        <Swiper
          navigation={{
            prevEl: '.prev',
            nextEl: '.next',
          }}
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={2.2}
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
              {data?.map((animData: AnimeWatchingProps) => {
                return (
                  <SwiperSlide key={animData.id}>
                    <AnimeComp data={animData} type='toWatch' />
                  </SwiperSlide>
                );
              })}
            </>
          )}
        </Swiper>

        <Flex>
          <HStack ml='auto' mt={5}>
            <div className='prev'>
              <IconButton
                rounded={'full'}
                aria-label='Prev'
                icon={<HiOutlineChevronLeft />}
              />
            </div>
            <div className='next'>
              <IconButton
                rounded={'full'}
                aria-label='Next'
                icon={<HiOutlineChevronRight />}
              />
            </div>
          </HStack>
        </Flex>
      </Container>
    </chakra.section>
  );
};

export { ToWatch };
