import { Search, ShoppingBasketIcon } from 'lucide-react'
import React from 'react'
import { Input } from '../ui/input'
import Link from 'next/link'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useQuery } from 'react-query'
import { fetchStickerSheets } from '@/utils/stickersSheet'
import { useCart } from '@/store/cart'

type Props = {}

const StickerSheetsList = (props: Props) => {

    const {data:sheets} = useQuery("fetchSheets",fetchStickerSheets)
    const {addToCart} = useCart()

    const  handleAddToCart = (index:number,e:React.MouseEvent)=>{
        e.stopPropagation()
        if(!sheets) return
        addToCart({
            quantity:1,
            image: sheets[index].snapshot as string,
            data:{
                type:"sticker sheet",
                data:{
                    sheetId:(sheets[index].name as string).replaceAll("-"," "),
                }
            }
        })
    }
  return (
    sheets &&
    <div>
      <div className='container flex justify-between items-center'>
            <h1 className='text-5xl opacity-70'>Products</h1>
            <div className='relative h-fit ml-auto  flex gap-2'>
                <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2'/>
                <Input placeholder='Search sticker' className='w-full flex-1 pl-10'/>
            </div>
      </div>
      <div className='container mx-auto grid grid-cols-5 gap-6 mt-4 p-6'>
        {
          new Array(6).fill(sheets).flat(1).map((item, index) => (
              <Card 
            //   style={{translate:`0px ${(5 + (index % 5))*(index % 5)}px`}} 
              key={index} className='w-full rounded-xl shadow-lg overflow-hidden'>
                <Link href={"/sheet/"+item.name.replace(/\s+/g, '-')} >
                    <Image width={400} height={600} className='w-full aspect-[2/3]' src={item.snapshot} alt="" />
                </Link>
                <div className='h-14 px-4 items-center flex justify-between'>
                  <div>
                    <h3 className='opacity-75 text-sm'>{item.name}</h3>
                  </div>
                  <Button onClick={(e)=>handleAddToCart(index%sheets.length,e)} variant={"secondary"} size={"sm"}>
                    Add <ShoppingBasketIcon/>
                  </Button>
                </div>
              </Card>
          ))
        }
          {
          }
      </div>
</div>
  )
}

export default StickerSheetsList