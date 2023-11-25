import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Heart, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const page = (props: Props) => {
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
                    [
                        "https://ih1.redbubble.net/image.3361100626.1870/st,small,507x507-pad,600x600,f8f8f8.jpg",
                        "https://ih1.redbubble.net/image.1593458887.3216/st,small,507x507-pad,600x600,f8f8f8.u1.jpg"
                    ].map((item, index) => (
                        <Card key={index} className='w-full rounded-xl overflow-hidden relative'>
                            <img src={item} alt="" className='aspect-square object-cover'/>
                            <Button className='absolute top-3 right-3' size={"icon"} variant={"outline"}><Heart/></Button>
                        </Card>
                    ))
                }
            </div>
        </div>
    </div>

  )
}

export default page