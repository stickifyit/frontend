"use client"
import CustomSheetNavBar from '@/components/global/CustomSheetNavBar'
import CustomSheetNavMore from '@/components/global/CustomSheetNavMore'
import { Button } from '@/components/ui/button'
import { NavbarHight } from '@/constant/constants'
import RenderSheet from '@/hooks/useRenderSheet'
import useRenderSheet from '@/hooks/useRenderSheet'
import { useSheet } from '@/store/customSheet'
import { ChevronRight, Plus } from 'lucide-react'
import React, { useEffect, useRef } from 'react'

type Props = {}

export default function Page({}: Props) {
    const sheetRef = useRef<HTMLDivElement|null>(null)
    const {sheet,setSelectedSticker} = useSheet()
    const [w,setW] = React.useState(1)
    const [selected , setSelected] = React.useState<number|null>(null)
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
    <div className='flex'  style={{height: 'calc(100vh - '+NavbarHight+')'}}>
        <div  style={{top:NavbarHight,height: 'calc(100vh - '+NavbarHight+')'}} className=' bg-white flex border-r sticky overflow-y-auto'>
            <CustomSheetNavBar {...{selected,setSelected}}/>
            {
                selected !== null &&
                <div className='w-[400px]'>
                    <CustomSheetNavMore {...{selected,setSelected}}/>
                </div>
            }
        </div>
        <div className='max-w-[50vw] flex-1 m-auto px-10 pb-10   relative h-full overflow-auto'>
                <div className='h-[50px] w-full opacity-60 left-[0] mx-auto top-[0px] sticky  z-20 flex   justify-between'>
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
                <div  onClick={() => {setSelectedSticker("")}} ref={sheetRef} className=' shadow-2xl border relative  mx-auto bg-white aspect-[22/40]'>
                    <RenderSheet w={w}/>
                </div>
            </div>
    </div>
  )
} 