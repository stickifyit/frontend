"use client"
import CustomSheetNavBar from '@/components/global/CustomSheetNavBar'
import CustomSheetNavMore from '@/components/global/CustomSheetNavMore'
import { Button } from '@/components/ui/button'
import { NavbarHight } from '@/constant/constants'
import { useSheet } from '@/store/customSheet'
import { Plus } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

type Props = {}

export default function Page({}: Props) {
    const sheetRef = useRef<HTMLDivElement|null>(null)
    const {sheet} = useSheet()
    const [w,setW] = React.useState(0)
    useEffect(() => {
        if(sheetRef!==null){
            setW(sheetRef?.current?.offsetWidth??0) 
        }
    },[sheetRef])
  return (
    <div className='flex relative'>
        <div  style={{top:NavbarHight,height: 'calc(100vh - '+NavbarHight+')'}} className='w-[500px] bg-white flex border-r sticky overflow-y-auto'>
            <CustomSheetNavBar/>
            <CustomSheetNavMore/>
        </div>
        <div className='container flex-1 overflow-auto  m-auto min-h-screen p-4'>
            <div  ref={sheetRef} className='relative shadow-xl border max-w-[70vw]  mx-auto bg-white aspect-[22/40]'>
                <div className='mx-auto w-fit '>
                {
                    sheet.map((item,i) => (
                        <div className='w-full h-full' key={i}>
                            {
                                new Array(item.quantity).fill(0).map((_,index) => (
                                    <img key={index} src={item.image} style={{width: w*item.size/22-1}} className='aspect-[1/1] border p-4 inline-block object-cover'/>
                                ))
                            }
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    </div>
  )
} 