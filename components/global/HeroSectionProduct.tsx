import React from 'react'
import ImageNext from "next/image";
import { productHeroImages } from '@/constant/productsHeroImages';
import { useParams } from 'next/navigation';
import { getProductInfo } from '@/constant/allProductControlers';
import { Button } from '../ui/button';

type Props = {}


const heroParagraphs = {
  "stickers":"Transform ordinary surfaces into personalized statements with our vibrant and customizable sticker collection . Express yourself creatively with high-quality designs for every style.",
  "t-shirts":"Turn your ideas into wearable art with our bespoke custom t-shirt printing services . From single designs to bulk orders, we make fashion a canvas for your unique expression.",
  "cup":"Elevate your sipping experience with personalized flair . Choose from our curated collection to add a touch of individuality to every beverage moment.",
}

function HeroSection({}: Props) {
    const params = useParams();
    const product = getProductInfo(params?.service as string,params?.product as string)
  return (
      <div className="gap-6 ">
        <div className="flex flex-col md:flex-row container px-4  py-6 mx-auto  gap-4 items-center ">
          <ImageNext src={product?.hero ?? ""} alt="" width={400} height={400} className="drop-shadow-2xl -rotate-6 w-[250px] h-[250px] md:w-[350px] md:h-[350px]"></ImageNext>
          <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl capitalize">{(params?.product as string).replace("-"," ")}</h1>
              <p className="max-w-2xl text-sm md:text-md font-sans font-medium opacity-75">{heroParagraphs[(params?.service as string) as keyof typeof heroParagraphs]}</p>
          </div>
        </div>
      </div>
  )
}

export default HeroSection