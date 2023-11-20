import { Button } from '@/components/ui/button'
import { customStickersImages } from '@/constant/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {ArrowRight} from "lucide-react"

type Props = {}

const page = (props: Props) => {
  return (
    <div className='min-h-screen'>
      <div className='bg-secondary py-12 '>
          <div className='container mx-auto space-y-4'>
            <h1 className=' text-5xl'>Custom Stickers</h1>
            <p className='max-w-5xl'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere dolorum recusandae voluptates dolor quas ab at dignissimos sint pariatur ut, voluptatum libero, quam minus illo repudiandae similique laudantium vel quasi.</p>
            <Button className='uppercase flex shadow-md gap-2 p-6 text-lg'> Custom Sheet<ArrowRight size={16}/></Button>
          </div>
          <div></div>
      </div>
      <div className='container mx-auto grid grid-cols-5 gap-6 p-6'>
          {
            // bumper , circle , die-cut , oval , rect , rounded , sheets , square
            [
              {name:"Die cut", href:"die-cut", img:customStickersImages.dieCut},
              {name:"Circle", href:"circle", img:customStickersImages.circle},
              {name:"Square", href:"square", img:customStickersImages.square},
              {name:"Rect", href:"rect", img:customStickersImages.rect},
              {name:"Bumper", href:"bumper", img:customStickersImages.bumper},
              {name:"Rounded", href:"rounded", img:customStickersImages.rounded},
              {name:"Oval", href:"oval", img:customStickersImages.oval},
              {name:"Sheets", href:"sheets", img:customStickersImages.sheets},
            ].map((item, index) => (
              <Link href={"/product/"+item.href} key={index} className=' p-4 rounded-2xl border bg-gray-100 flex flex-col items-center justify-center hover:bg-secondary hover:scale-105 duration-300'>
                <Image src={item.img} alt={item.name} width={250}/>
                <h3 className='text-xl text-center'>{item.name} stickers</h3>
              </Link>
            ))
          }
      </div>
    </div>
  )
}

export default page