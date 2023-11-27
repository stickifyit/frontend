"use client"
import StickerDialog from '@/components/global/StickerDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import axios from '@/lib/axios'
import { fetchStickers } from '@/utils/fetchExplore'
import { CheckCheckIcon, CheckCircle, CheckCircle2, Heart, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'
import { useQueries, useQuery } from 'react-query'

type Props = {}
const Page = (props: Props) => {
    const params = useParams()
    const {data:stickers} = useQuery("fetchStickers",()=>fetchStickers(params?.pack as string))
  
  return (
    <div className='min-h-screen'>
        <div className='container mx-auto'>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl py-10'>Name of packet</h1>
                <div className='relative h-fit ml-auto'>
                    <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2'/>
                    <Input placeholder='Search sticker' className='max-w-md flex-1 pl-10'/>
                </div>
            </div>

            <div className='grid grid-cols-5 gap-3'>
                {
                    stickers?.map((item, index) => (
                      <StickerDialog item={item} key={item._id}/>
                    ))
                }
            </div>
        </div>
    </div>

  )
}



export default Page