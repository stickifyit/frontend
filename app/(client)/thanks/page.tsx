"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import thankYou from '@/public/cart/thank-you.png'
import Image from 'next/image'
import pin from "@/public/cart/pin.png"
import {motion} from "framer-motion"
type Props = {}

export default function page({}: Props) {
  return (
    <div className='min-h-[calc(100vh-100px)] container flex justify-center items-center'>
        <motion.div
            initial={{opacity:0,scale:0}}
            animate={{opacity:1,scale:1}}
        >
            <Card className='min-w-[600px] relative rotate-3 shadow-2xl'>
                <motion.div
                    initial={{opacity:0,scale:0,x:-100}}
                    animate={{opacity:1,scale:1,x:0}}
                    transition={{delay:0.2}}
                >
                    <Image src={thankYou} width={200} height={200} className='absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 rotate-12 drop-shadow-xl ' alt="thank you"></Image>
                </motion.div>
                <motion.div
                    initial={{opacity:0,scale:.8,y:-100}}
                    animate={{opacity:1,scale:1,y:0}}
                    transition={{delay:0.2}}
                >
                    <Image src={pin} width={100} height={100} className='absolute top-0 left-0 -translate-x-14 -translate-y-14 drop-shadow-xl ' alt="thank you"></Image>
                </motion.div>
                <CardHeader>
                    <CardTitle className='text-7xl font-thin opacity-75 uppercase'>
                        Thanks
                    </CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                    <div className='text-xl max-w-[400px] font-thin opacity-75'>
                        your order has been placed successfully , we will contact you soon 
                    </div>
                    <div>
                        <Button variant={"secondary"} size={"lg"}>Continue Shopping<ArrowRight/></Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    </div>
  )
}