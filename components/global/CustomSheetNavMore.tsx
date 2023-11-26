import React from 'react'
import { Card } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CustomSheetItemCard from './CustomSheetItemCard'
import { useSheet } from '@/store/customSheet'

type Props = {}

export default function CustomSheetNavMore({}: Props) {
    const {sheet, setSheet} = useSheet()
  return (
    <div className=' h-full overflow-auto flex-1 relative'>
        <div className='p-3 text-xl mt-8 sticky top-0 bg-white border-b'>
            <h2>All Stickers</h2>
        </div>
        <div className='p-3 space-y-2'>
            {
               sheet.map((item,i) => 
                (
                    <CustomSheetItemCard item={item} key={i}/>
                )
                )
            }
        </div>
    </div>
  )
}