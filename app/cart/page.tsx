"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CupPrice, PriceByPrice, SheetPrice, TShirtPrice, deliveryPriceConst, getPrice } from '@/lib/price';
import { useCart } from '@/store/cart';
import { useSheet } from '@/store/customSheet';
import { X } from 'lucide-react';
import { Caprasimo } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import {motion} from "framer-motion"

type Props = {}

function Page({}: Props) {
    const {cart,setCart} = useCart()
    const [cartPrice,setCartPrice] = useState(0);
    const [deliveryPrice,setDeliveryPrice] = useState(deliveryPriceConst);
    const [totalPrice,setTotalPrice] = useState(0);


    useEffect(()=>{
        setDeliveryPrice(
            cartPrice > 100 ? 0 : deliveryPrice
        )
    },[cartPrice,setDeliveryPrice,setTotalPrice])
    useEffect(
        ()=>{
            setTotalPrice(
                cartPrice + deliveryPriceConst
            )
        },[cartPrice,deliveryPrice]
    )

    const getCartPrice = ()=>{
        let price = 0;
        for (const item of cart) {
            if(item.data.type == "custom sheet"){
                price += SheetPrice * item.quantity
            }else if(item.data.type == "sticker sheet"){
                price += SheetPrice * item.quantity
            }else if( item.data.type == "t-shirt"){
                 price += TShirtPrice * item.quantity
            }else if( item.data.type == "cup"){
                price += CupPrice * item.quantity
            }
        }
        return PriceByPrice(price)
    }


    useEffect(()=>{
        setCartPrice(getCartPrice())
    },[cart,setCartPrice,getPrice])
  return (
    <div className=' container h-[calc(100vh-100px)]'>
        <div className='relative flex h-full px-4 overflow-y-auto gap-12 '>
                <div className='flex flex-1 mt-12 flex-col gap-2 py-8 max-w-2xl '>
                <h1 className='text-7xl bg-slate-50 p-4 pt-10 sticky top-0 z-10 rounded-b-2xl'>Cart</h1>
                { 
                        cart.map((item,i)=>{
                            return (
                                <motion.div 
                                initial={{opacity:0,x:-100}}
                                animate={{opacity:1,x:0}}
                                transition={
                                    {
                                        duration:0.2,
                                        delay:i*0.1
                                    }
                                }
                                key={i} className='flex gap-6 items-center border rounded-md p-4 bg-white shadow-sm'>
                                    <Image width={100} height={100} alt="" src={item.image as string} className='w-24 drop-shadow-xl -rotate-3 h-24 object-contain rounded'  />
                                    <div >
                                        <div className='text-lg '>{item.data.type}</div>
                                        <div className=''> {item.quantity} item{item.quantity>1?'s':''}</div>
                                    </div>
                                    <div className='ml-auto p-2 text-lg'>
                                    <Button size="icon" variant={"outline"} onClick={()=>{setCart(cart.filter((c,_i)=>i!==_i))}}><X/></Button>
                                    </div>
                                </motion.div>
                            )
                        })
                    }
                    {/* <div className='sticky bottom-0 bg-[#fffa] p-2 rounded-xl shadow border'>
                        <Button size="lg">Clean Cart</Button>
                    </div> */}
                </div>
                <motion.div initial={{opacity:0,y:-100}} animate={{opacity:1,y:0}}  className='flex-1 flex'>
                <Card className='flex-1 sticky top-[20px] p-8 h-fit mt-12 bg-white '>
                    <div className='flex gap-4 items-center border-b  pb-2 mb-2 justify-between max-w-[300px]'>
                        <div>
                            <span className='text-xl '>Price</span>
                            <h1 className='text-3xl '>{cartPrice.toFixed(1)} Dh</h1>
                        </div>
                        <div className='text-3xl'>+</div>
                        <div>
                            <span className='text-xl '>delivery</span>
                            <h1 className='text-3xl '>{deliveryPrice.toFixed(1)} Dh</h1>
                        </div>
                    </div>
                    <span className='text-xl '>Total Price</span>
                    <h1 className='text-6xl '>{(cartPrice + deliveryPrice).toFixed(2)} Dh</h1>
                    <div className='pt-8'>
                        <Link href={"/checkout"}>
                        <Button size="lg" className='w-full' variant={"secondary"}>CheckOut</Button>
                        </Link>
                    </div>
                </Card>
                </motion.div>
        </div>
    </div>
  )
}

export default Page