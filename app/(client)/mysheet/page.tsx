"use client"
import CustomSheetNavBar from '@/components/global/CustomSheetNavBar'
import CustomSheetNavMore from '@/components/global/CustomSheetNavMore'
import { Button } from '@/components/ui/button'
import { NavbarHight } from '@/constant/constants'
import RenderSheet from '@/hooks/useRenderSheet'
import useRenderSheet from '@/hooks/useRenderSheet'
import fitContainer from '@/lib/itemsSheetfitter'
import { SheetItem, useSheet } from '@/store/customSheet'
import { ChevronRight, Plus } from 'lucide-react'
import React, { DragEvent, useEffect, useRef } from 'react'
import {motion} from "framer-motion"
type Props = {}

export default function Page({}: Props) {
    const sheetRef = useRef<HTMLDivElement|null>(null)
    const {sheet,setSheet,setSelected:setSelectedSticker,
        process,
        selected: selectedStickers,
    } = useSheet()
    const [w,setW] = React.useState(1)
    const [selected , setSelected] = React.useState<number|null>(0)
    const [windowWidth, setWindowWidth] = React.useState(1);




    // handle drag and drop

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
  
      const droppedFiles = Array.from(e.dataTransfer.files) as File[];
      const stickers: SheetItem[] = []
      droppedFiles.forEach((file) => {
        if(!file.type.startsWith("image")) return
        stickers.push({
          fileType:"upload",
          type:"die cut",
          size:3,
          color:"white",
          radius:0,
          id:Math.random() + " x " + Math.random(),
          quantity:1,
          image:URL.createObjectURL(file),
          file
        })
      })
    setSheet([...sheet,...stickers] )


    };
  
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };








    useEffect(() => {
        setW(0) 
        if(sheetRef!==null){
            setW(sheetRef?.current?.offsetWidth??1) 
            // alert(sheetRef?.current?.offsetWidth)
        }
    },[sheetRef,windowWidth])

    // const handleResize = () => {
    //     if (typeof window !== "undefined") {
    //     setWindowWidth(window?.innerWidth);
    //     }
    // };
    
    // useEffect(() => {
    //     if (typeof window !== "undefined") {
    //         window.addEventListener('resize', handleResize);
    //     // Cleanup: remove the event listener when the component unmounts
    //     return () => {
    //       window.removeEventListener('resize', handleResize);
    //     };
    //     }
    // }, []); // Empty dependency array to run effect only once








  return (
    <div className='flex'  style={{height: 'calc(100vh - '+NavbarHight+')'}}>
        <div  style={{top:NavbarHight,height: 'calc(100vh - '+NavbarHight+')'}} className=' bg-white flex border-r sticky overflow-y-auto'>
            <CustomSheetNavBar {...{selected,setSelected}}/>
            {
                <div className='w-[400px]'>
                    <CustomSheetNavMore {...{selected,setSelected}}/>
                </div>
            }
        </div>
        <div className=' aspect-[20/30] max-w-[800px]  h-full flex-1 overflow-auto  m-auto relative px-10 '>
            <div className='h-[50px] mt-4 w-full opacity-60 left-[0] sticky  mx-auto top-[0px]   z-20 flex   justify-between'>
                {
                new Array(21).fill(0).map((_,q) => (
                <>
                {
                    q!== 0  &&
                    new Array(1) .fill(0).map((_,q2) => (
                    <div key={q2} className='text-[6px] flex justify-center flex-1'>|</div>
                    ))
                }
                <div className={"text-[8px] flex flex-1 flex-col gap-2 items-center"} key={q+1}>
                    <div>|</div>
                {q===0 || q === 20?q:q}
                </div>
                </>
                ))
                }
                </div>
                <div
                    style={{padding:(w/20)+"px"}}
                    className=' shadow-2xl rounded-[1rem] bg-slate-100 border '
                    onClick={() => {setSelectedSticker([])}} 
                >
                <div       
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}  
                    ref={sheetRef} 
                    className='select-none  relative  mx-auto rounded-xl bg-slate-100 aspect-[18/28]'>
                    <RenderSheet w={w}/>
                </div>
                </div>
        </div>
    </div>
  )
} 