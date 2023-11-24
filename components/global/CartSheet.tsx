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
import { ShoppingBasket } from 'lucide-react'
import { useCart } from '@/store/cart'
  

type Props = {}

function CartSheet({}: Props) {
    const {cart} = useCart()
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
                cart.map((item,i)=>{
                     const Canvas=item.canvas
                    return (
                        <div key={i} className='flex gap-6 items-center border rounded-md p-4 bg-white shadow-sm'>
                            <img src={URL.createObjectURL(item.file)} className='w-14 h-14 object-contain' alt="" />
                            <div >
                                <div className='font-bold text-lg'>{item.type}</div>
                                <div>{item.size}</div>
                            </div>
                            <div className='ml-auto p-2 text-lg'> {item.quantity}</div>
                        </div>
                    )
                })
            }
        </div>
            <div className='mt-auto py-6'>
                <Button size={"lg"} className='w-full hover:scale-[1.01] scale-100 duration-200'>Checkout</Button>
            </div>
      </SheetDescription>
  </SheetContent>
</Sheet>

  )
}

export default CartSheet