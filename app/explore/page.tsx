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
import { motion } from "framer-motion"
import StickerSheetsList from '@/components/global/StickerSheetsList'
type Props = {}
const Page = (props: Props) => {
  const {data:packs} = useQuery("packs", fetchPacks)
  return (
    <div className='min-h-screen'>
        <div className='container px-4 mx-auto'>
            <div className='flex md:justify-between py-10 gap-3 md:items-center flex-col md:flex-row'>
                <h1 className='md:text-6xl text-4xl  uppercase'>Explore </h1>
                <div className=' h-fit md:ml-auto sticky top-[100px]'>
                    <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2'/>
                    <Input placeholder='Search sticker' className='max-w-md flex-1 pl-10'/>
                </div>
            </div>
            <h1 className='md:text-5xl text-3xl md:ml-6 py-8 opacity-75'>Packs</h1>
            <div className='grid md:grid-cols-6 grid-cols-2 gap-2 md:gap-3 mb-8'>
                {
                    packs?.map((item, index) => (
                        <motion.div 
                        initial={{opacity:0,y:50}}
                        animate={{opacity:1,y:0}}
                        transition={{delay:0.06* index,duration:0.3}}
                        key={index}  >
                        <Link href={"/explore/"+item._id}>
                            <div className='w-full rounded-xl overflow-hidden relative'>
                                <Image width={200} height={200} src={"https://storage.googleapis.com/stickify-storage/"+item.imageURL} alt="" className='aspect-square object-cover p-4 w-full'/>
                                <div className='p-3'>
                                    <h3 className='text-center'>{item.name}</h3>
                                </div>
                            </div>
                        </Link>
                        </motion.div>
                    ))
                }
            </div>
            {/* <StickerSheetsList/> */}
        </div>
    </div>
  )
}

export default Page