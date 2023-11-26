"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import axios from '@/lib/axios'
import { CheckCheckIcon, CheckCircle, CheckCircle2, Heart, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}
interface Sticker {
  _id: string;
  name: string;
  imageURL: string;
  keywords: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const Page = (props: Props) => {
    const params = useParams()
  const [stickers, setStickers] = React.useState<Sticker[]|[]>([])
  React.useEffect(() => {
    axios.post<Sticker[]>("/sticker/get-by-pack", {
      pack: params.pack
    }).then(res => {
      setStickers(res.data)
    })
  },[])
  
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
                    stickers.map((item, index) => (
                      <StickerCard item={item} key={item._id}/>
                    ))
                }
            </div>
        </div>
    </div>

  )
}


const StickerCard = ({item}: {item: Sticker}) => {
  return (
        <Card className={'w-full rounded-xl relative cursor-pointer overflow-hidden duration-150  '}>
            <Image src={"https://storage.googleapis.com/stickify-storage/"+item.imageURL} alt="" width={200} height={200} className='aspect-square w-full bg-white object-cover p-4'/>
            <div className='p-3 text-center'>
                <h3 className='text-center font-semibold'>{item.name}</h3>
            </div>
        </Card>
        )
}

export default Page