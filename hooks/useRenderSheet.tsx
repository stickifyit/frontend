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
        setProcess([])
        // flat sheet all quantity = 1 , 
        const  flat:SheetItem[] = []
        sheet.forEach((item,i) => {
            for(let i=0;i<item.quantity;i++){
                const width = (item.size)
                const height = item.type == "rect"||item.type == "oval" ?  item.size*(2/3) : item.type == "bumper" ?item.size*(1/3) : (item.size)

                flat.push({...item,id:item.id+" "+i,quantity:1,width:width*100,height:height*100,size:item.size*100,fileType: item.fileType})
            }
        })
        console.log(process)
        setFinalSheet(flat)
        const Cm = w/sheetW
        setCm(w/sheetW)
        setProcess(fitContainer(sheetW*100,sheetH*100,flat,margin*100))
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
    } key={item.id} className={'absolute duration-300 rounded m-0 '} style={{width:item.width*cm/100 +"px",height:item.height*cm/100 +"px",top:item.y*cm/100 ,left:item.x*cm/100}}>
        <Image width={300} height={300} src={ item.image  } 
            alt="" 
            draggable={false}
            style={{padding: (w*.1)/20 + "px"}}
            className={'w-full circle h-full object-contain  cursor-pointer duration-200 '+ (selected.includes(item.id.split(" ")[0] as string)? " z-10   border-secondary":"")} />
    </motion.div>)
    )
}