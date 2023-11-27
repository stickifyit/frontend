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
    const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);
    useEffect(() => {

        if(sheetRef!==null){
            setW(sheetRef?.current?.offsetWidth??1) 
        }
    },[sheetRef,windowWidth])

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
    
      useEffect(() => {
        // Update windowWidth when the window is resized
        window.addEventListener('resize', handleResize);
    
        // Cleanup: remove the event listener when the component unmounts
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []); // Empty dependency array to run effect only once



  return (
    <div className='flex relative'>
        <div  style={{top:NavbarHight,height: 'calc(100vh - '+NavbarHight+')'}} className='w-[500px] bg-white flex border-r sticky overflow-y-auto'>
            <CustomSheetNavBar {...{selected,setSelected}}/>
            <CustomSheetNavMore {...{selected,setSelected}}/>
        </div>
        <div className='max-w-[50vw] flex-1 overflow-auto  m-auto min-h-screen p-4'>
            <div className='h-[50px] w-full opacity-60 left-[0] mx-auto top-[0px]   z-20 flex   justify-between'>
                {
                new Array(23).fill(0).map((_,q) => (
                <>
                {
                    q!== 0  &&
                    new Array(3) .fill(0).map((_,q2) => (
                    <div key={q2} className='text-[6px] flex justify-center flex-1'>|</div>
                    ))
                }
                <div className={"text-[8px] flex flex-1 flex-col gap-2 items-center"} key={q+1}>
                    <div>|</div>
                {q} {q===0?"":""}
                </div>
                </>
                ))
                }
            </div>
            <div  ref={sheetRef} className='relative shadow-xl border max-w-[50vw]  mx-auto bg-white aspect-[22/40]'>
                <RenderSheet w={w}/>
            </div>
        </div>
    </div>
  )
} 