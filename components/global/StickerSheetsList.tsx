import { Search, ShoppingBasketIcon } from 'lucide-react'
import React, { useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import Link from 'next/link'
import { Card } from '../ui/card'
import Image from 'next/image'
import { Button } from '../ui/button'
import { useQuery } from 'react-query'
import { fetchStickerSheets } from '@/utils/stickersSheet'
import { useCart } from '@/store/cart'
import {motion, useInView} from "framer-motion"
type Props = {}


const StickerSheetsList = (props: Props) => {

    const {data:sheets} = useQuery("fetchSheets",fetchStickerSheets)
    const {addToCart} = useCart()

  return (
    sheets &&
    <div className='container px-4'>
      <div className='flex justify-between gap-3 my-8 md:my-0 md:items-center flex-col md:flex-row'>
            <h1 className='md:text-5xl text-3xl opacity-75'>Sticker Sheets</h1>
            <div className='relative h-fit md:ml-auto  flex gap-2 w-fit'>
                <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2'/>
                <Input placeholder='Search sheet' className='w-full flex-1 pl-10'/>
            </div>
      </div>
      <div className='md:container mx-auto grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-6 mt-4 md:p-6'>
        {
          (sheets).flat(1).map((item, index) => (
            <SheetComp key={index} item={item} index={index} sheets={sheets}/>
          ))
        }
          {
          }
      </div>
</div>
  )
}



const SheetComp = ({item,index,sheets}:{item:any,index:number,sheets:any}) => {

    const {addToCart} = useCart()
    const {cart} = useCart()
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
        setTimesInCart(prev => prev+1)
    }
    const [timesInCart,setTimesInCart] = React.useState(0)
    useEffect(()=>{
        const existingItemIndex = cart.findIndex((_item) => {
                if (
                    _item.data.type === "sticker sheet"
                ) {
                    // Check if it's a sticker sheet and has the same sheetId
                    return item.name === _item.data.data.sheetId;
                } else {
                    // If the types don't match, consider them different items
                    return false;
                }
            });
        setTimesInCart(existingItemIndex > -1 ? cart[existingItemIndex].quantity : 0)
    },[cart,item.name])

  return(
    <motion.div
    initial={{opacity:0,y:50,rotate:2}}
    animate={{opacity:1,y:0,rotate:0}}
    transition={{
        duration:0.5,
        delay:index*0.1 
    }}
    >
              <Card 
            //   style={{translate:`0px ${(5 + (index % 5))*(index % 5)}px`}} 
              key={index} className='w-full rounded-xl relative shadow-lg overflow-hidden'>
                <Link href={"/sheet/"+item.name.replace(/\s+/g, '-')} >
                    <Image width={400} height={600} className='w-full rounded aspect-[2/3]' src={item.snapshot} alt="" />
                </Link>
                <div className='md:h-14 gap-2 p-2 md:p-4 md:items-center flex justify-between flex-col md:flex-row'>
                  <div>
                    <h3 className='opacity-75 text-sm'>{item.name}</h3>
                  </div>
                  <Button onClick={(e)=>handleAddToCart(index%sheets.length,e)} variant={"secondary"} size={"sm"}>
                    Add <ShoppingBasketIcon/>
                  </Button> 
                </div>
                {
                    timesInCart > 0 &&
                    <div className='bg-white text-lg text-[#333e] absolute top-1 left-1 px-3 h-8 flex justify-center items-center rounded-sm border '>{timesInCart} <span className='text-sm ml-2'> in cart</span></div>
                }
              </Card>
    </motion.div>
  )
}






export default StickerSheetsList