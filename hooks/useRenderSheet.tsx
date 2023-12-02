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
                const width = (item.size)
                const height = item.type == "rect"||item.type == "oval" ?  item.size*(2/3) : item.type == "bumper" ?item.size*(1/3) : (item.size)

                flat.push({...item,quantity:1,width,height,fileType: item.fileType})
            }
        })
        setFinalSheet(flat)
            const Cm = w/sheetW
            setCm(w/sheetW)
            setProcess(fitContainer(sheetW,sheetH,flat,margin))
        }
    },[sheet,w,setProcess])

    return(
    process.map((item,i) => <motion.div 
        initial={{opacity:0,scale:1.2}}
        animate={{opacity:1,scale:1}}
        transition={{duration:.2}}
    onClick={(e:React.MouseEvent)=>{
        e.stopPropagation()
        // if i'm not clicking the shift btn
        if (e.shiftKey || e.ctrlKey) {
            selectItem(item.id);
          } else {
            // If the shift key is not pressed, select only the clicked item
            setSelected([item.id]);
        }

    }
    } key={item.id} className={'absolute duration-300 rounded m-0 '} style={{width:item.width*cm +"px",height:item.height*cm +"px",top:item.y*cm ,left:item.x*cm}}>
        <Image width={300} height={300} src={ item.image  } 
            alt="" 
            draggable={false}
            style={{padding: (w*.1)/20 + "px"}}
            className={'w-full circle h-full object-contain  cursor-pointer rounded-md duration-200 border'+ (selected.includes(item.id)? " z-10   border-secondary":"")} />
    </motion.div>)
    )
}