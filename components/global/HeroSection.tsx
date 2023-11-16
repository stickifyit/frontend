import React from 'react'
import { Button } from '../ui/button'
import { LOGO } from '@/constant/constants'
import {ArrowRight} from "lucide-react"
import Image from 'next/image'
import { HeroLinksImages } from '@/constant/constants'
import Link from 'next/link'

type Props = {}

const HeroSection = (props: Props) => {
  return (
    <>
    <div className='min-h-[55vh] bg-gray-50 px-4 flex items-center'>
      <div className='container h-full items-center flex gap-10 lg:gap-4 py-10 flex-col-reverse lg:flex-row mx-auto'>
        <div className=' h-full text-center lg:text-start flex-1 items-center lg:items-start flex flex-col gap-4 justify-center'>
          <h1 className='text-6xl font-extrabold max-w-3xl uppercase '>Turn Your Designs into Stunning Reality</h1>
          <h1 className='text-xl max-w-3xl uppercase '>Experience the joy of holding your creativity with our high-quality printed stickers</h1>
          <div className='flex gap-4'>
          <Button size={'lg'} className='uppercase flex gap-2'>Shop Now <ArrowRight size={16}/></Button>
          <Button size={'lg'} variant={"outline"} className='uppercase flex gap-2'>See collections</Button>
          </div>
        </div>
        <div className='flex items-center justify-center drop-shadow-2xl'>
          <Image src={LOGO} alt='logo' width={400} height={400}/>
        </div>
      </div>
    </div>
    <div className=''>
        <div className='container justify-center py-4 mx-auto flex gap-6'>
            {
            [
                {name:"custom stickers",img:HeroLinksImages.Stickers},
                {name:"custom labels",img:HeroLinksImages.Label},
                {name:"custom shirts",img:HeroLinksImages.T_Shirt},
            ].map(({name,img})=>
            <Link href={'#'} key={name} className='w-fit p-2 hover:scale-105 duration-300 rounded-2xl border bg-white '>
                <Image src={img} alt={name} width={250} height={250}/>
                <h2 className='text-center text-xl'>{name}</h2>
            </Link>)
            }
        </div>
    </div>
    </>
  )
}

export default HeroSection