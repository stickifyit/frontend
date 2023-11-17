"use client"
import React from "react";

import { useParams } from 'next/navigation'
import Image from "next/image";
import { productHeroImages } from "@/constant/productsHeroImages";
import { Circle } from "lucide-react";
import SizeAndQCard from "@/components/global/SizeAndQCard";
type Props = {
};





function Page({}: Props) {
    const params = useParams();
  return (
    <div className=" bg-secondary py-6">
      <div className="container items-end py-6 mx-auto flex gap-6 min-h-[60vh]">
        <div className="space-y-4">
          <Image src={productHeroImages[params?.product as keyof typeof productHeroImages]} alt="" width={300} height={300} className="drop-shadow-xl"></Image>
          <h1 className="text-6xl">{params?.product} stickers</h1>
          <p className="max-w-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem perspiciatis similique omnis maxime corporis. Aliquid modi hic sapiente, nobis, ipsa quod nisi tenetur non deleniti dolor temporibus explicabo quibusdam laboriosam.</p>
        </div>
      </div>
      <SizeAndQCard />
    </div>
  );
}

export default Page;
