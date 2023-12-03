"use client"
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/store/cart';
import { useSheet } from '@/store/customSheet';
import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

type Props = {}

function Page({}: Props) {
    const {cart,setCart} = useCart()
  return (
    <div className=' container h-[calc(100vh-100px)]'>
        <div className='relative flex h-full px-4 overflow-auto gap-12 '>
                <div className='flex flex-1 mt-12 flex-col gap-2 py-8 max-w-2xl'>
                <h1 className='text-7xl '>Cart</h1>
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
                    {/* <div className='sticky bottom-0 bg-[#fffa] p-2 rounded-xl shadow border'>
                        <Button size="lg">Clean Cart</Button>
                    </div> */}
                </div>
                <Card className='flex-1 sticky top-[20px] p-8 h-fit mt-12 bg-white '>
                    <div className='flex gap-4 items-center border-b  pb-2 mb-2 justify-between max-w-[300px]'>
                        <div>
                            <span className='text-xl '>Price</span>
                            <h1 className='text-3xl '>130 Dh</h1>
                        </div>
                        <div className='text-3xl'>+</div>
                        <div>
                            <span className='text-xl '>delivery</span>
                            <h1 className='text-3xl '>30 Dh</h1>
                        </div>
                    </div>
                    <span className='text-xl '>Total Price</span>
                    <h1 className='text-6xl '>160 Dh</h1>
                    <div className='pt-8'>
                        <Link href={"/checkout"}>
                        <Button size="lg" className='w-full' variant={"secondary"}>CheckOut</Button>
                        </Link>
                    </div>
                </Card>
        </div>
    </div>
  )
}

export default Page