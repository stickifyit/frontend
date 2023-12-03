"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {ArrowRight, Search, ShoppingBagIcon, ShoppingBasketIcon, Stars} from "lucide-react"
import { getProductsByService } from '@/constant/allProductControlers'
import { useParams } from 'next/navigation'
import stickersHero from "@/public/product pages images/stickers hero.png"
import tshirtHero from "@/public/product pages images/t-shirt hero.png"
import { Button } from '@/components/ui/button'
import testSheet from "@/public/Untitled-1.jpg"
import testSheet2 from "@/public/Untitled-3.jpg"
import testSheet3 from "@/public/Untitled-4.jpg"
import testSheet4 from "@/public/Untitled-6.jpg"
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import StickerSheetsList from '@/components/global/StickerSheetsList'
type Props = {}


const heroImages = {
  "stickers":stickersHero,
  "t-shirts":tshirtHero
}

const Page = (props: Props) => {
  const params = useParams()
  return (
    <div className='min-h-screen'>
      <div className='bg- flex gap-4'>
          <div className='container flex gap-12 items-center mx-auto space-y-4 '>
          <div className=' drop-shadow-2xl'>
                 {/* i want to take the service and show image of it  */}
                <Image width={450} src={heroImages[params?.service as 'stickers'|'t-shirts' ]??''} alt=""></Image>
          </div>
            <div className='space-y-4'>
              <h1 className=' text-7xl capitalize'>{params?.service}</h1>
              <p className='max-w-2xl font-sans font-medium opacity-60'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere dolorum recusandae voluptates dolor quas ab at dignissimos sint pariatur ut, voluptatum libero, quam minus illo repudiandae similique laudantium vel quasi.</p>
              {
                params?.service == "stickers" &&
                  <Link className='block' href={"/mysheet"} >
                    
                    <Button size="lg" variant="secondary" className='text-white  uppercase'>Custom sheet<Stars/></Button>
                  </Link>
              }
            </div>
          </div>
      </div>
      <StickerSheetsList/>
    </div>
  )
}

export default Page