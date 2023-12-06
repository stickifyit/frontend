'use client'
import React, { useEffect } from 'react'
import sheet from "@/public/Untitled-1.jpg"
import Image from 'next/image'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader, Search, ShoppingBasketIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import testSheet from "@/public/Untitled-1.jpg"
import testSheet2 from "@/public/Untitled-3.jpg"
import testSheet3 from "@/public/Untitled-4.jpg"
import testSheet4 from "@/public/Untitled-6.jpg"
import { Input } from '@/components/ui/input'
import {motion} from "framer-motion"
import StickerSheetsList from '@/components/global/StickerSheetsList'
import { useQuery } from 'react-query'
import { getStickerSheet } from '@/utils/stickersSheet'
import { useParams } from 'next/navigation'
import { useCart } from '@/store/cart'
import { sheetPricing } from '@/constant/pricing'
import { PriceByPrice, SheetPrice, getPrice } from '@/lib/price'
type Props = {}

export default function Page({}: Props) {
    const [sheetQuantity,setSheetQuantity] = React.useState(3)
    const param = useParams()
    const {data:sheetInfo,isLoading} = useQuery("fetchSheet",()=>getStickerSheet((param.sheetId as string).replaceAll("-"," "))) 
    const [added,setAdded] = React.useState(false);
    const {addToCart} = useCart()



    React.useEffect(()=>{
        if(added){
            setTimeout(() => {
                setAdded(false)            
            }, 2000);
        }
    },[added])


    if (isLoading) {
       return 
       <div className='w-full h-[calc(100vh-100px)] flex justify-center items-center'>
            <Loader className='w-[30px] h-[30px] animate-spin' />
       </div>
    }


    const  handleAddToCart = ()=>{
        addToCart({
            quantity:sheetQuantity,
            image: sheetInfo?.snapshot as string,
            data:{
                type:"sticker sheet",
                data:{
                    sheetId:(param.sheetId as string).replaceAll("-"," "),
                }
            }
        })
        setAdded(true)
    }


  return (
    <div>
    <div className='max-w-5xl mx-auto  pt-8'>
        <div className='flex py-8 gap-8 relative mb-12'>
            <div className='flex-[1]  relative'>
                <Image width={400} height={600} src={sheetInfo?.snapshot??""} alt="" className=' mb-12 flex-[2] opacity-0 top-0 left-0 rounded-xl shadow-2xl' />
                {
                new Array(sheetQuantity).fill(0).map((item, index) => (
                    <motion.div  
                        initial={{scale:1.1,opacity:0.8}}
                        animate={{scale:1,opacity:1}}
                        transition={{
                            duration:0.2,
                        }}
                        className='overflow-hidden border border-[#fff6] shadow-sm duration-200 flex-[2] absolute top-0 left-0 rounded-xl drop-shadow-2xl'
                        style={{ rotate: `${-((index)*3 - ((sheetQuantity-1)/2)*6)}deg`, translateX: `${index*10}px`, translateY: `${index*10}px` }}
                        key={index}>
                            <Image width={400} height={600} src={sheetInfo?.snapshot??""}  alt="" />
                    </motion.div>
                ))
                }
            </div>
            <div className='flex-[1]  sticky top-[120px] h-fit '>
                <motion.div 
                    initial={{opacity:0,x:300}}
                    animate={{opacity:1,x:0}}
                    className='space-y-6 w-full p-8 bg-[#fff8] rounded-xl border '>
                        <h1 className='text-5xl mb-8'>Stickers Sheet</h1>
                        <h1 className='text-3xl mb-6'>{sheetInfo?.name}</h1>
                        <p className='text-2xl'>Size : 20cm x 30cm</p>
                        <p className='text-2xl'>Quantity :</p>
                        <RadioGroup value={String(sheetQuantity)} onValueChange={e=>setSheetQuantity(Number(e))}>
                        {
                        new Array(6).fill(0)
                        .map((_,q) => (
                            <div key={q} className="flex items-center space-x-2">
                            <RadioGroupItem value={`${q+1}`} id={`option-${q+1}`} />
                            <Label className="flex w-full" htmlFor={`option-${q+1}`}>
                                <div className="flex-[1] text-lg">{q+1} Sheet</div>
                                <div className="flex-[1] text-lg">{PriceByPrice(SheetPrice*(q+1))} Dh</div>
                                {/* <div className="text-green-700 flex-[1] justify-end flex">
                                {14}%
                                </div> */}
                            </Label>
                            </div>
                        ))}
                        </RadioGroup>
                        <div className='flex gap-8 items-center justify-between mt-12'>
                            <h1 className='text-4xl'>{sheetPricing[sheetQuantity-1]} Dh</h1>
                            <Button onClick={handleAddToCart} size="lg" variant={"secondary"} className=' w-lg'>
                                {
                                    added ?
                                    "sheets Added"
                                    :
                                    "Add to cart"
                                }
                            </Button>
                            {/* <Button size="lg" variant={"outline"} className=''>Buy now</Button> */}
                        </div>
                </motion.div>
            </div>
        </div>
    </div>
        <StickerSheetsList/>                        
    </div>
  )
}