import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'
import img from '@/public/cart/friends.png'
import Image from 'next/image'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='min-h-screen container py-8'>
        <Card className=''>
            <CardHeader>
                <CardTitle className='text-7xl font-thin opacity-75'>Checkout</CardTitle>
            </CardHeader>
            <CardContent className='  overflow-hidden flex gap-4'>
                <div className='flex-1 space-y-2'>
                    <h4 className='text-xl opacity-75'>Full Name</h4>
                    <Input className='max-w-2xl'></Input>
                    <h4 className='text-xl opacity-75'>Phone Number</h4>
                    <Input className='max-w-2xl'></Input>
                    <h4 className='text-xl opacity-75'>Full Address</h4>
                    <Input className='max-w-2xl'></Input>
                    <br />
                    <Button size={"lg"} variant="secondary" className='max-w-[800px] '>Checkout</Button>
                </div>
                <Image src={img} alt='thanks' width={350} height={350} className='translate-y-14 drop-shadow-2xl'></Image>
            </CardContent>
        </Card>
    </div>
  )
}