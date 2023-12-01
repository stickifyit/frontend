"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {ArrowRight, Stars} from "lucide-react"
import { getProductsByService } from '@/constant/allProductControlers'
import { useParams } from 'next/navigation'
import stickersHero from "@/public/product pages images/stickers hero.png"
import tshirtHero from "@/public/product pages images/t-shirt hero.png"
import { Button } from '@/components/ui/button'
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
          <div className='container flex gap-12 items-center mx-auto space-y-4 drop-shadow-2xl'>
          <div className=''>
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

      <div className='container'>
            <h1 className='text-5xl opacity-70'>Products</h1>
      </div>
      <div className='container mx-auto grid grid-cols-5 gap-6 p-6'>
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