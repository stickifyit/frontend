"use client"
import CustomSheetNavBar from '@/components/global/CustomSheetNavBar'
import CustomSheetNavMore from '@/components/global/CustomSheetNavMore'
import { Button } from '@/components/ui/button'
import { NavbarHight } from '@/constant/constants'
import RenderSheet from '@/hooks/useRenderSheet'
import useRenderSheet from '@/hooks/useRenderSheet'
import { useSheet } from '@/store/customSheet'
import { Plus } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

type Props = {}

export default function Page({}: Props) {
    const sheetRef = useRef<HTMLDivElement|null>(null)
    const {sheet} = useSheet()
    const [w,setW] = React.useState(1)
    const [selected , setSelected] = React.useState(0)
    useEffect(() => {
        if(sheetRef!==null){
            setW(sheetRef?.current?.offsetWidth??1) 
        }
    },[sheetRef])
  return (
    <div className='flex relative'>
        <div  style={{top:NavbarHight,height: 'calc(100vh - '+NavbarHight+')'}} className='w-[500px] bg-white flex border-r sticky overflow-y-auto'>
            <CustomSheetNavBar {...{selected,setSelected}}/>
            <CustomSheetNavMore {...{selected,setSelected}}/>
        </div>
        <div className='container flex-1 overflow-auto  m-auto min-h-screen p-4'>
            <div  ref={sheetRef} className='relative shadow-xl border max-w-[70vw]  mx-auto bg-white aspect-[22/40]'>
                <RenderSheet w={w}/>
            </div>
        </div>
    </div>
  )
} 