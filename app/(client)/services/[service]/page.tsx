"use client"
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import {ArrowRight} from "lucide-react"
import { getProductsByService } from '@/constant/allProductControlers'
import { useParams } from 'next/navigation'

type Props = {}

const Page = (props: Props) => {
  const params = useParams()
  return (
    <div className='min-h-screen'>
      <div className='bg-secondary py-12 '>
          <div className='container mx-auto space-y-4'>
            <h1 className=' text-5xl'>Custom {params?.service}</h1>
            <p className='max-w-5xl'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere dolorum recusandae voluptates dolor quas ab at dignissimos sint pariatur ut, voluptatum libero, quam minus illo repudiandae similique laudantium vel quasi.</p>
          </div>
          <div></div>
      </div>
      <div className='container mx-auto grid grid-cols-5 gap-6 p-6'>
          {
            // bumper , circle , die-cut , oval , rect , rounded , sheets , square
            getProductsByService(params?.service as string)?.map((item, index) => (
              <Link href={item.href} key={index} className=' p-4 rounded-2xl border bg-gray-100 flex flex-col items-center justify-center hover:bg-secondary hover:scale-105 duration-300'>
                <Image src={item.img} alt={item.name} width={250}/>
                <h3 className='text-xl text-center'>{item.name}</h3>
              </Link>
            ))
          }
      </div>
    </div>
  )
}

export default Page