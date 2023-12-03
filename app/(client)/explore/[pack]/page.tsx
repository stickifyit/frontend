"use client"
import StickerDialog from '@/components/global/StickerDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import axios from '@/lib/axios'
import { useSheet } from '@/store/customSheet'
import { fetchStickers } from '@/utils/fetchExplore'
import { CheckCheckIcon, CheckCircle, CheckCircle2, Edit2Icon, EditIcon, Heart, Search, Smile } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useQueries, useQuery } from 'react-query'

type Props = {}
const Page = (props: Props) => {
    const params = useParams()
    const {data:stickers} = useQuery("fetchStickers",()=>fetchStickers(params?.pack as string))
    const {sheet , setSheet } = useSheet()
    const router = useRouter()
  
    const getSheet = ()=>{
        if(!stickers) return 
        setSheet(new Array(24).fill(0).map((item, index) => ({
            fileType: "url",
            quantity:1,
            image: "https://storage.googleapis.com/stickify-storage/"+(stickers[index as number % stickers.length].imageURL),
            type: "die cut",
            size: 4.5 ,
            color: "white",
            id: stickers[index as number % stickers.length]._id + " x " + Math.random(),
        })))
        router.push("/mysheet")
    }
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

            <div className='flex gap-4'>
                    <div className='w-[300px] flex flex-col gap-2 p-6 rounded-xl border bg-white h-fit'>
                        <h1 className='mb-2 text-lg'>Pack Sheet</h1>
                        <div className=' grid grid-cols-4 '>
                            {
                                stickers &&
                                new Array(24).fill(0).map((item, index) => (
                                    <Image key={index} className='w-full p-1' src={"https://storage.googleapis.com/stickify-storage/"+(stickers[index as number % stickers.length].imageURL)} alt="" width={200} height={200} ></Image>
                                ))
                            }
                        </div>
                        <Button variant={"secondary"} onClick={getSheet}>Get Sheet <EditIcon/></Button>
                    </div>
                    <div className='grid flex-1 h-fit grid-cols-6 gap-3'>
                        {
                            stickers?.map((item, index) => (
                            <StickerDialog item={item} key={item._id}/>
                            ))
                        }
                    </div>
            </div>
        </div>
    </div>

  )
}



export default Page