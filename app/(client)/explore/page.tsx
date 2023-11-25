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
                <h1 className='text-6xl py-10'>Explore 😃</h1>
                <div className='relative h-fit ml-auto'>
                    <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2'/>
                    <Input placeholder='Search sticker' className='max-w-md flex-1 pl-10'/>
                </div>
            </div>

            <div className='grid grid-cols-5 gap-3'>
                {
                    [
                        "https://ooblets.com/images/VnYUVC4.jpg",
                        "https://i.pinimg.com/736x/3a/43/b6/3a43b6907339290401f22f40514fb7cc.jpg",
                        "https://ooblets.com/images/VnYUVC4.jpg",
                        "https://i.pinimg.com/736x/3a/43/b6/3a43b6907339290401f22f40514fb7cc.jpg",
                        "https://ooblets.com/images/VnYUVC4.jpg",
                        "https://i.pinimg.com/736x/3a/43/b6/3a43b6907339290401f22f40514fb7cc.jpg",
                        "https://ooblets.com/images/VnYUVC4.jpg",
                        "https://i.pinimg.com/736x/3a/43/b6/3a43b6907339290401f22f40514fb7cc.jpg",
                        "https://ooblets.com/images/VnYUVC4.jpg",
                        "https://i.pinimg.com/736x/3a/43/b6/3a43b6907339290401f22f40514fb7cc.jpg",
                        "https://ooblets.com/images/VnYUVC4.jpg",
                        "https://i.pinimg.com/736x/3a/43/b6/3a43b6907339290401f22f40514fb7cc.jpg",
                    ].map((item, index) => (
                        <Link key={index} href="/explore/packet">
                            <Card className='w-full rounded-xl overflow-hidden relative'>
                                <img src={item} alt="" className='aspect-square object-cover'/>
                                <div className='p-3'>
                                    <h3>Name of the pack</h3>
                                </div>
                                <Button className='absolute top-3 right-3' size={"icon"} variant={"outline"}><Heart/></Button>
                            </Card>
                        </Link>
                    ))
                }
            </div>

        </div>
    </div>
  )
}

export default page