import React, { useEffect } from 'react'
import { Card } from '../ui/card'
import { Button } from '../ui/button'

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Slider } from '../ui/slider'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from '../ui/input'
import { Minus, Plus } from 'lucide-react'
import { SheetItem, useSheet } from '@/store/customSheet'
  
type Props = {
    item:SheetItem
}

export default function CustomSheetItemCard({item}: Props) {
    const {update,selectedSticker,setSelectedSticker} = useSheet()
    useEffect(() => {
        if(item.quantity<0) update(item.id,{...item,quantity:0})
    }, [item.quantity,update,item])
  return (
    <Card onClick={()=>setSelectedSticker(item.id)} className={'text-gray-500 text-lg p-2 flex gap-4 items-center '+(selectedSticker == item.id?"bg-[#00000005] outline outline-secondary":"")}>
        <img className='h-16 aspect-square rounded' src={item.image}></img>
        <div className='flex flex-1 gap-2'>
            <Popover>
                <PopoverTrigger asChild>
                    <Button className='min-w-[80px]' variant={"outline"}>{item.size} cm</Button>
                </PopoverTrigger>
                <PopoverContent>
                    <input type='range' className='w-full' value={item.size} onChange={(e:any)=>update(item.id,{...item,size:e.target.value as number})} step={.1} min={2} max={20}/>
                </PopoverContent>
            </Popover>
            <Select value={item.type} onValueChange={(value) => update(item.id,{...item,type:value})}>
            <SelectTrigger className="flex-1">
                <SelectValue placeholder="type" />
            </SelectTrigger>
            <SelectContent className=''>

                <SelectItem value="die cut">die cut</SelectItem>
                <SelectItem value='square'>square</SelectItem>
                <SelectItem value='rounded'>rounded</SelectItem>
                <SelectItem value= 'circle'>circle</SelectItem>
                <SelectItem value= 'rect'>rect</SelectItem>
                <SelectItem value= 'bumper'>bumper</SelectItem>
                <SelectItem value= 'oval'>oval</SelectItem>
                
            </SelectContent>
            </Select>

            <Popover>
                <PopoverTrigger asChild>
                    <Button className='min-w-[60px]' variant={"outline"}>{item.quantity}</Button>
                </PopoverTrigger>
                <PopoverContent className='flex gap-2 min-w-[60px] w-fit'>
                    <Button size={"sm"} onClick={() => update(item.id,{...item,quantity:item.quantity-1})}><Minus/></Button>
                    <input type='number' className=' text-center rounded-xl w-16 ' value={item.quantity} onChange={(e:any)=>update(item.id,{...item,quantity:Number(e.target.value as number)})} />
                    <Button size={"sm"} onClick={() => update(item.id,{...item,quantity:item.quantity+1})}><Plus/></Button>
                </PopoverContent>
            </Popover>
        </div>
    </Card>
  )
}