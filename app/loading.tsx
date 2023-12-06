import { Loader } from 'lucide-react'
import React from 'react'
import loader from "@/public/loader.gif"
import Image from 'next/image'
type Props = {}

export default function loading({}: Props) {
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-100px)]'>
        {/* <Image src={loader} alt="loader" width={250} height={250} className='w-[250px] aspect-square rounded-full object-cover'></Image> */}
        <Loader className='w-[30px] h-[30px] animate-spin' />
    </div>
  )
}