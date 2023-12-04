"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import axios from '@/lib/axios'
import { PackItem, fetchPacks } from '@/utils/fetchExplore'
import { Heart, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useQuery } from "react-query";
type Props = {}
const Page = (props: Props) => {
  const {data:packs} = useQuery("packs", fetchPacks)
  return (
    <div className='min-h-screen'>
        <div className='container mx-auto'>
            <div className='flex justify-between items-center'>
                <h1 className='text-6xl py-10 uppercase'>Explore </h1>
                <div className='relative h-fit ml-auto'>
                    <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2'/>
                    <Input placeholder='Search sticker' className='max-w-md flex-1 pl-10'/>
                </div>
            </div>

            <div className='grid grid-cols-6 gap-3'>
                {
                    packs?.map((item, index) => (
                        <Link key={index} href={"/explore/"+item._id}>
                            <div className='w-full rounded-xl overflow-hidden relative'>
                                <Image width={200} height={200} src={"https://storage.googleapis.com/stickify-storage/"+item.imageURL} alt="" className='aspect-square object-cover p-4 w-full'/>
                                <div className='p-3'>
                                    <h3 className='text-center'>{item.name}</h3>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>

        </div>
    </div>
  )
}

export default Page