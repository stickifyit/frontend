"use client"
import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { Button } from '../ui/button'
import { Edit, ShoppingBasket, X } from 'lucide-react'
import { useCart } from '@/store/cart'
import Image from 'next/image'
import { productsSizes, qs, sizes } from '@/constant/sizesAndQ'
import { handleUploadSticker } from '@/lib/uploadImage'
import { toast } from '../ui/use-toast'
import socket from '@/lib/socket'

import cat from "@/public/cart/cat.png"
import { useParams } from 'next/navigation'
import { useSheet } from '@/store/customSheet'

type Props = {}

function CartSheet({}: Props) {
    const {cart,setCart} = useCart()
    const [loading,setLoading] = React.useState(false)
    const {sheet,setSheet} = useSheet()
    const params = useParams()
    const checkout = async ()=>{
      setLoading(true);
      for (const { image,data,quantity } of cart) {
        try {
          // const url = await handleUploadSticker(quantity, size, type, canvas,service);
          // Do something with the URL if needed
        } catch (error) {
          // Handle individual upload error if needed
        }
      }
    
      toast({
        title: "checkout done",
        description: "your order has been placed",
        dir: "bottom-center",
      });
    
      setCart([]);
      socket.emit("add order");
      setLoading(false);
    }


  return (
<Sheet>
  <SheetTrigger asChild>
                <Button size={"icon"} variant={"outline"}><ShoppingBasket /></Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Cart</SheetTitle>
    </SheetHeader>
      <SheetDescription className='flex flex-col pt-14 h-full '>
        <div className={"flex flex-col gap-2 flex-1"}>
          {
            cart.length===0 &&
            <div className='flex items-center flex-col justify-center flex-1 gap-0'>
            <Image src={cat} width={200} height={200} alt=""></Image>
            <h1 className='text-xl'>Your cart is empty</h1>
            </div>
          }
            { 
                cart.map((item,i)=>{
                    return (
                        <div key={i} className='flex gap-6 items-center border rounded-md p-4 bg-white shadow-sm'>
                            <Image width={60} height={60} alt="" src={item.image as string} className='w-14 h-14 object-contain rounded'  />
                            <div >
                                <div className='text-lg '>{item.data.type}</div>
                                <div className=''> {item.quantity} item{item.quantity>1?'s':''}</div>
                            </div>
                            <div className='ml-auto p-2 text-lg'>
                              <Button size="icon" onClick={()=>{setCart(cart.filter((c,_i)=>i!==_i))}}><X/></Button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        {
          cart.length>0 &&
            <div className='mt-auto py-6'>
                <Button onClick={checkout} size={"lg"} className='w-full hover:scale-[1.01] scale-100 duration-200'>
                  {
                    loading? "Uploading..." : "Checkout"
                  }
                </Button>
            </div>
        }
      </SheetDescription>
  </SheetContent>
</Sheet>

  )
}

export default CartSheet