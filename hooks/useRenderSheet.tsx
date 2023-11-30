"use client"
import React, { useEffect } from 'react'
import { SheetItem, useSheet } from '@/store/customSheet'
import fitContainer, { PlacedElement } from '@/lib/itemsSheetfitter'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { Sheet } from 'lucide-react'
import { motion } from "framer-motion"
type Props = {
    w:number
}

export default function RenderSheet({w}: Props) {
    // flating the sheet
    const [finalSheet,setFinalSheet] = React.useState<SheetItem[]>([])
    const {sheet,process,setProcess,setSheet,setSelected,selected,selectItem} = useSheet()
    const [cm,setCm] = React.useState(0)
    useEffect(() => {
        const sheetW = 20
        const sheetH = 30
        const margin = 1
        if(sheet.length==0) return setProcess([])
        if(w!==0){
        // flat sheet all quantity = 1 , 
        const  flat:SheetItem[] = []
        sheet.forEach((item,i) => {
            for(let i=0;i<item.quantity;i++){
                flat.push({...item,quantity:1,size:item.size*w/20-1,fileType: item.fileType})
            }
        })
        setFinalSheet(flat)
            const Cm = w/sheetW
            setCm(w/sheetW)
            setProcess(fitContainer(sheetW*Cm,sheetH*Cm,flat,margin * Cm))
        }
    },[sheet,w,setProcess])

    return(
    process.map((item,i) => <div onClick={(e:React.MouseEvent)=>{
        e.stopPropagation()
        // if i'm not clicking the shift btn
        if (e.shiftKey || e.ctrlKey) {
            selectItem(item.id);
          } else {
            // If the shift key is not pressed, select only the clicked item
            setSelected([item.id]);
        }

    }
    } key={i} className={'absolute rounded m-0 p-1'} style={{width:item.width +"px",height:item.height +"px",top:item.y ,left:item.x}}>
        <Image width={300} height={300} src={ item.image  } 
            alt="" 
            draggable={false}
            className={'w-full hover:scale-105 aspect-square object-contain  border cursor-pointer rounded-md duration-200 p-2'+ (selected.includes(item.id)? " z-10 outline  outline-secondary":"")} />
    </div>)
    )
}