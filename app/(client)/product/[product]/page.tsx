"use client"
import React, { useRef } from "react";

import { useParams } from 'next/navigation'
import Image from "next/image";
import { productHeroImages } from "@/constant/productsHeroImages";
import { Circle } from "lucide-react";
import SizeAndQCard from "@/components/global/SizeAndQCard";
import { Button } from "@/components/ui/button";
type Props = {
};





function Page({}: Props) {
    const params = useParams();
    const canvasRef = useRef(null)
  return (
    <div className="">
      <div className=" bg-secondary gap-6">
        <div className="flex container  py-6 mx-auto  gap-4 items-center ">
          <Image src={productHeroImages[params?.product as keyof typeof productHeroImages]} alt="" width={350} height={350} className="drop-shadow-xl"></Image>
          <div className="space-y-4">
          <h1 className="text-6xl">{params?.product} stickers</h1>
          <p className="max-w-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem perspiciatis similique omnis maxime corporis. Aliquid modi hic sapiente, nobis, ipsa quod nisi tenetur non deleniti dolor temporibus explicabo quibusdam laboriosam.</p>
          </div>
        </div>
      </div>
              <input type="file" />
      <div className="flex gap-6 container mx-auto py-8">
        <div className="flex-1 bg-secondary border rounded-2xl flex justify-center items-center">
              {/* <Button size={"lg"}>Upload sticker</Button> */}
              <canvas ref={canvasRef}></canvas>
        </div>
        <SizeAndQCard />
      </div>
    </div>
  );
}

export default Page;
