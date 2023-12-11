"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {ArrowRight, Search, ShoppingBagIcon, ShoppingBasketIcon, Stars} from "lucide-react"
import { getProductsByService } from '@/constant/allProductControlers'
import { useParams } from 'next/navigation'
import stickersHero from "@/public/product pages images/stickers hero.png"
import tshirtHero from "@/public/product pages images/t-shirt hero.png"
import cup from "@/public/product pages images/hero.png"
import { Button } from '@/components/ui/button'

import testSheet from "@/public/Untitled-1.jpg"
import testSheet2 from "@/public/Untitled-3.jpg"
import testSheet3 from "@/public/Untitled-4.jpg"
import testSheet4 from "@/public/Untitled-6.jpg"
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import StickerSheetsList from '@/components/global/StickerSheetsList'
import {motion} from "framer-motion"
type Props = {}


const heroImages = {
  "stickers":stickersHero,
  "t-shirts":tshirtHero,
  "cup": cup
}
const heroParagraphs = {
  "stickers":"Transform ordinary surfaces into personalized statements with our vibrant and customizable sticker collection . Express yourself creatively with high-quality designs for every style.",
  "t-shirts":"Turn your ideas into wearable art with our bespoke custom t-shirt printing services . From single designs to bulk orders, we make fashion a canvas for your unique expression.",
  "cup":"Elevate your sipping experience with personalized flair . Choose from our curated collection to add a touch of individuality to every beverage moment.",
}

const Page = (props: Props) => {
  const params = useParams()
  return (
    <div className='min-h-screen'>
      <div className='bg- flex gap-4'>
          <div className='container px-4 flex flex-col md:flex-row md:gap-12 items-center mx-auto space-y-4 '>
            <motion.div 
                initial={{opacity:0,scale:0}}
                animate={{opacity:1,scale:1}}
                className=' drop-shadow-2xl'>
                  {/* i want to take the service and show image of it  */}
                  <Image width={450} className='w-[240px] md:w-[400px]' src={heroImages[params?.service as 'stickers'|'t-shirts' ]??''} alt=""></Image>
            </motion.div>
            <div className='space-y-4'>
              <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} className='text-5xl md:text-7xl capitalize'>{params?.service}</motion.h1>
              <motion.p initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className='max-w-2xl md:text-lg text-sm font-sans font-medium opacity-60'>{heroParagraphs[params?.service as 'stickers'|'t-shirts'|'cup' ]}</motion.p>
              <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.4}}>
              </motion.div>
            </div>
          </div>
      </div>
{

            // bumper , circle , die-cut , oval , rect , rounded , sheets , square
            params?.service == "stickers" ?
            <StickerSheetsList/>:

      <div>
        <div className='container px-4 flex justify-between items-center'>
              <h1 className='md:text-5xl text-3xl opacity-75'>Products</h1>
        </div>
        <div className='container px-4 mx-auto grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 mt-4 p-6'>
          {
            getProductsByService(params?.service as string)?.map((item, index) => (
              <motion.div key={index} initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:index*0.1}}>
              <Link href={item.href} key={index} className=' p-4 rounded-2xl border bg-gray-100 flex flex-col items-center justify-center hover:bg-slate-200 hover:scale-105 duration-300'>
                <Image src={item.img} alt={item.name} width={250}/>
                <h3 className='text-xl capitalize text-center'>{item.name}</h3>
              </Link>
              </motion.div>
            ))
          }
        </div>
      </div>
}
    </div>
  )
}

export default Page