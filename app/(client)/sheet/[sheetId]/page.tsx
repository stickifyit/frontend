'use client'
import React from 'react'
import sheet from "@/public/Untitled-1.jpg"
import Image from 'next/image'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Search, ShoppingBasketIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import testSheet from "@/public/Untitled-1.jpg"
import testSheet2 from "@/public/Untitled-3.jpg"
import testSheet3 from "@/public/Untitled-4.jpg"
import { Input } from '@/components/ui/input'
import {motion} from "framer-motion"
type Props = {}

export default function Page({}: Props) {
    const [sheetQuantity,setSheetQuantity] = React.useState(1)
  return (
    <div>
    <div className='max-w-6xl mx-auto min-h-screen py-8'>
        <div className='flex py-8 gap-8 relative '>
            <div className='flex-[2] relative'>
                <Image width={500}  src={sheet} alt="" className=' flex-[2] opacity-0 top-0 left-0 rounded-xl shadow-2xl' />
                {
                new Array(sheetQuantity).fill(0).map((item, index) => (
                    <motion.div  
                    transition={{duration:.1}}
                    className='border overflow-hidden duration-200 flex-[2] absolute top-0 left-0 rounded-xl drop-shadow-xl'
                    style={{ rotate: `${(index)*4}deg`, translateX: `${index*10}px`, translateY: `${index*10}px` }}
                    key={index}>
                        <Image width={500}  src={sheet}  alt=""  />
                    </motion.div>
                ))
                }
            </div>
            <div className='flex-[2]  sticky top-[120px] h-fit '>
                <div className='space-y-6 w-fit p-8 bg-[#fff8] rounded-xl border '>
                        <h1 className='text-5xl mb-8'>Stickers Sheet</h1>
                        <h1 className='text-3xl mb-6'>hand drawing stickers</h1>
                        <p className='text-2xl'>Size : 20cm x 30cm</p>
                        <p className='text-2xl'>Quantity :</p>
                        <RadioGroup value={String(sheetQuantity)} onValueChange={e=>setSheetQuantity(Number(e))}>
                        {
                        new Array(5).fill(0)
                        .map((_,q) => (
                            <div key={q} className="flex items-center space-x-2">
                            <RadioGroupItem value={`${q+1}`} id={`option-${q+1}`} />
                            <Label className="flex w-full" htmlFor={`option-${q+1}`}>
                                <div className="flex-[1] text-lg">{q+1} Sheet</div>
                                <div className="flex-[1] text-lg">{(q+1) * 25}Dh</div>
                                {/* <div className="text-green-700 flex-[1] justify-end flex">
                                {14}%
                                </div> */}
                            </Label>
                            </div>
                        ))}
                        </RadioGroup>
                        <div className='flex gap-4 justify-start mt-6'>
                            <Button size="lg" variant={"secondary"} className=''>Add to cart</Button>
                            <Button size="lg" variant={"outline"} className=''>Buy now</Button>
                        </div>
                </div>
            </div>
        </div>

    </div>
        <div className='container flex justify-between items-center my-8'>
            <h1 className='text-5xl opacity-70'>Products</h1>
            <div className='relative h-fit ml-auto  flex gap-2'>
                <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2'/>
                <Input placeholder='Search sticker' className='w-full flex-1 pl-10'/>
            </div>
      </div>
      <div className='container mx-auto grid grid-cols-5 gap-6 mt-4 p-6'>
        {
          new Array(15).fill(0).map((item, index) => (
            <Link href={"/sheet/1"} key={index}>
              <Card className='w-full rounded-xl shadow-lg overflow-hidden'>
                <Image width={400} height={600} className='w-full aspect-[2/3]' src={[testSheet,testSheet2,testSheet3][index % 3]} alt="" />
                <div className='p-2 px-4 items-center flex justify-between'>
                  <div>
                    <h3 className='opacity-75'>Name of sheet</h3>
                    <h5 className='opacity-75 text-sm'>something</h5>
                  </div>
                  <Button variant={"secondary"} size={"sm"}>
                    Add <ShoppingBasketIcon/>
                  </Button>
                </div>
              </Card>
            </Link>
          ))
        }
        </div>
    </div>
  )
}