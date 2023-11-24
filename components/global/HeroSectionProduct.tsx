import React from 'react'
import ImageNext from "next/image";
import { productHeroImages } from '@/constant/productsHeroImages';
import { useParams } from 'next/navigation';
import { getProductInfo } from '@/constant/allProductControlers';

type Props = {}

function HeroSection({}: Props) {
    const params = useParams();
    const product = getProductInfo(params?.service as string,params?.product as string)
  return (
      <div className=" bg-secondary gap-6">
        <div className="flex container  py-6 mx-auto  gap-4 items-center ">
          <ImageNext src={product?.img ?? ""} alt="" width={450} height={450} className="drop-shadow-xl w-[300px] h-[300px]"></ImageNext>
          <div className="space-y-4">
          <h1 className="text-6xl">{params?.product}</h1>
          <p className="max-w-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem perspiciatis similique omnis maxime corporis. Aliquid modi hic sapiente, nobis, ipsa quod nisi tenetur non deleniti dolor temporibus explicabo quibusdam laboriosam.</p>
          </div>
        </div>
      </div>
  )
}

export default HeroSection