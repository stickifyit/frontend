import React from 'react'
import { Button } from '../ui/button'
import { useSheet } from '@/store/customSheet';
import CustomSheetItemCard from './CustomSheetItemCard';

type Props = {}

export default function LayoutBar({}: Props) {
  const { sheet, setSheet } = useSheet();
  return (
    <div className=" h-full overflow-auto flex-1 relative">
      <div className="p-3 flex mb-4 justify-between items-center text-xl mt-10 z-20 shadow-xl shadow-[#33333307] sticky top-0 bg-white border-b">
        <h2>All Stickers</h2>
      </div>
      <div className="p-3 space-y-2">
        {sheet.map((item, i) => (
          <CustomSheetItemCard item={item} key={i} />
        ))}
      </div>
    </div>
  )
}