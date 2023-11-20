"use client"
import React, { useState,ChangeEvent,useRef,useEffect } from 'react';

import { useParams } from 'next/navigation'
import ImageNext from "next/image";
import { productHeroImages } from "@/constant/productsHeroImages";
import SizeAndQCard from "@/components/global/SizeAndQCard";
import Canvas from '@/components/global/Canvas';
import { useCanvasProps } from '@/store/canvasProps';
type Props = {
};





function Page({}: Props) {
    const params = useParams();
    const {image}  = useCanvasProps()
  return (
    <div className="">
      <div className=" bg-secondary gap-6">
        <div className="flex container  py-6 mx-auto  gap-4 items-center ">
          <ImageNext src={productHeroImages[params?.product as keyof typeof productHeroImages]} alt="" width={350} height={350} className="drop-shadow-xl"></ImageNext>
          <div className="space-y-4">
          <h1 className="text-6xl">{params?.product} stickers</h1>
          <p className="max-w-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem perspiciatis similique omnis maxime corporis. Aliquid modi hic sapiente, nobis, ipsa quod nisi tenetur non deleniti dolor temporibus explicabo quibusdam laboriosam.</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-6 container mx-auto py-8">
        <Canvas type={params?.product as keyof typeof productHeroImages}/>
        <SizeAndQCard />
      </div>
    </div>
  );
}

export default Page;
