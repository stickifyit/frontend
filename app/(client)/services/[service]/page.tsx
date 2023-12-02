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
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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

      <div className='container flex justify-between items-center'>
            <h1 className='text-5xl opacity-70'>Products</h1>
            <div className='relative h-fit ml-auto  flex gap-2'>
                <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2'/>
                <Input placeholder='Search sticker' className='w-full flex-1 pl-10'/>
            </div>
      </div>
      <div className='container mx-auto grid grid-cols-5 gap-6 mt-4 p-6'>
        {
          new Array(15).fill(0).map((item, index) => (
              <Card key={index} className='w-full rounded-xl shadow-lg overflow-hidden'>
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
          ))
        }
          {
            // bumper , circle , die-cut , oval , rect , rounded , sheets , square
            // getProductsByService(params?.service as string)?.map((item, index) => (
            //   <Link href={item.href} key={index} className=' p-4 rounded-2xl border bg-gray-100 flex flex-col items-center justify-center hover:bg-slate-200 hover:scale-105 duration-300'>
            //     <Image src={item.img} alt={item.name} width={250}/>
            //     <h3 className='text-xl capitalize text-center'>{item.name}</h3>
            //   </Link>
            // ))
          }
      </div>
    </div>
  )
}

export default Page