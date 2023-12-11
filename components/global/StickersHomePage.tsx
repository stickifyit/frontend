import React from 'react'
import { SheetComp } from './StickerSheetsList'
import { useQuery } from 'react-query'
import { fetchStickerSheets } from '@/utils/stickersSheet'
import { useCart } from '@/store/cart'
import { ArrowRight  } from 'lucide-react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Button } from '../ui/button'


type Props = {}

function StickersHomePage({}: Props) {
    const {data:sheets} = useQuery("fetchSheets",fetchStickerSheets)
    const {addToCart} = useCart()

  return (
    sheets &&
    <div className='md:w-full  mx-auto overflow-x-hidden px-4 container'>
        <div className='flex  w-full  justify-end relative gap-3  my-4 '>
            <Link href='/services/stickers' className=' rounded-full  w-fit  flex gap-2 items-center text-xs font-sans font-medium '>
                <Button>
                See more
                <ArrowRight size={18}/>
                </Button>
                </Link>
      </div>
      {/* <div className='relative mx-auto flex justify-center gap-2 md:gap-6 mt-4 md:p-6 w-fit '> */}
        <Swiper
            slidesPerView={4}
            className='w-full'
            breakpoints={
                {
                    0:{
                        slidesPerView:1.8,
                        spaceBetween:0,
                    },
                    640:{
                        slidesPerView:1.5
                    },
                    768:{
                        slidesPerView:4.5
                    },
                }
            }
            >
            {
            (sheets).map((item, index) => (
                <SwiperSlide key={index} className='w-full px-1 py-4 md:px-2'>
                <SheetComp key={index} item={item} index={index} sheets={sheets}/>
                </SwiperSlide>
            ))
            }
        </Swiper>
      {/* </div> */}
</div>
  )
}

export default StickersHomePage