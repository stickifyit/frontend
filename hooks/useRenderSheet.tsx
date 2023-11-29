"use client"
import React, { useEffect } from 'react'
import { SheetItem, useSheet } from '@/store/customSheet'
import fitContainer, { PlacedElement } from '@/lib/itemsSheetfitter'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

type Props = {
    w:number
}

export default function RenderSheet({w}: Props) {
    // flating the sheet
    const [finalSheet,setFinalSheet] = React.useState<SheetItem[]>([])
    const {sheet,process,setProcess,setSheet,setSelected,selected,selectItem} = useSheet()
    const [cm,setCm] = React.useState(0)
    useEffect(() => {
        if(sheet.length==0) return setProcess([])
        if(w!==0){
        // flat sheet all quantity = 1 , 
        const  flat:SheetItem[] = []
        sheet.forEach((item,i) => {
            for(let i=0;i<item.quantity;i++){
                flat.push({...item,quantity:1,size:item.size*w/22-0,fileType: item.fileType})
            }
        })
        setFinalSheet(flat)
            const Cm = w/22
            setCm(w/22)
            setProcess(fitContainer(22*Cm,40*Cm,flat))
        }
    },[sheet,w,setProcess])

    return(
    process.map((item,i) => <div onClick={(e)=>{
        // the way number 1 
        // setTimeout(() => {
        //     setSelectedSticker(item.id)
        // }, 0)
        // the way number 2 
        e.stopPropagation()
        setSelected([item.id])

    }
    } key={i} className={'absolute rounded m-0 p-1'} style={{width:item.width +"px",height:item.height +"px",top:item.y ,left:item.x}}>
        <Image width={300} height={300} src={ item.image  } 
            alt="" 
            draggable={false}
            className={'w-full hover:scale-105 aspect-square object-contain  border cursor-pointer rounded-md duration-200 p-2'+ (selected.includes(item.id)? " z-10 outline  outline-secondary":"")} />
    </div>)
    )
}