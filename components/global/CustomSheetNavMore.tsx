import React from 'react'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Slider } from '../ui/slider'

type Props = {}

export default function CustomSheetNavMore({}: Props) {
  return (
    <div className=' h-full overflow-auto flex-1 relative'>
        <div className='p-3 text-xl mt-8 sticky top-0 bg-white border-b'>
            <h2>All Stickers</h2>
        </div>
        <div className='p-3 space-y-2'>
            {
                new Array(20).fill(0).map((_,i) => 
                (
                <Card key={i} className='text-gray-500 text-lg p-2 flex gap-4 items-center'>
                    <img className='h-16 aspect-square rounded' src='http://localhost:3000/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fstickify-storage%2Fstickers%2Fva9zm4ig42a-mvtckomg5f-tkx1ygz5rwe.png&w=256&q=75'></img>
                    <div className='flex flex-1'>
                        <Popover>
                            <PopoverTrigger>
                                <Button variant={"ghost"}>15 cm</Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Slider step={1} min={2} max={20}/>
                            </PopoverContent>
                        </Popover>
                        <Button variant={"ghost"}>die cut</Button>
                        <Button className='ml-auto' variant={"outline"}>8</Button>
                    </div>
                </Card>
                )
                )
            }
        </div>
    </div>
  )
}