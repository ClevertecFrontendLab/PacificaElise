import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import './slider-pagination.scss';

import { Pagination } from "swiper";

export const SliderPagination = ({images}) => (
      <Swiper className='slider-pagination' data-test-id='slide-big'
        modules={[Pagination]} 
        pagination={{ clickable: true }}
        >
        {
        images.map((image) => (
          <SwiperSlide key={image} data-test-id='slide-mini'> 
            <img src={image} alt='cover book'/>
          </SwiperSlide>
        ))
      }
      </Swiper>
  );
