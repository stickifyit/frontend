"use client"
import { Button } from '@/components/ui/button'
import { NavbarHight } from '@/constant/constants'
import { Plus } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

type Props = {}

export default function Page({}: Props) {
    const sheet = useRef<HTMLDivElement|null>(null)
    const [w,setW] = React.useState(0)
    useEffect(() => {
        if(sheet!==null){
            setW(sheet?.current?.offsetWidth??0) 
        }
    },[sheet])
  return (
    <div className='flex relative'>
        <div  style={{top:NavbarHight,height: 'calc(100vh - '+NavbarHight+')'}} className='w-[500px] bg-white border-r sticky overflow-y-auto'>
            <div className='h-screen'>
            </div>
        </div>
        <div className='container flex-1  m-auto min-h-screen p-4'>
            <div ref={sheet} className='relative shadow-xl border max-w-screen  mx-auto bg-white aspect-[1/2]'>
            </div>
        </div>
    </div>
  )
} 