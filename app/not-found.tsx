"use client"
import Navbar from '@/components/global/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import sorry from "@/public/cute (1).png"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {motion} from "framer-motion"
const NotFound = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)] ">
        <motion.div
          initial={{opacity:0,y:-100,scale:0.5,rotate:0}}
          animate={{opacity:1,y:0,scale:1,rotate:3}}
          className='w-full max-w-[600px] h-fit justify-center items-center flex'
        >
        <Card className='w-full text-gray-600 shadow-2xl relative'>
          <motion.div initial={{scale:0}} animate={{scale:1,x:"30%",y:"-30%"}} transition={{delay:0.5}} className='absolute drop-shadow-xl top-0 rotate-3 right-0 translate-x-1/3 -translate-y-1/3 w-[250px] h-[250px]'>
            <Image src={sorry} alt="sorry" width={250} height={250} className=''></Image>
          </motion.div>
          <CardHeader>
            <CardTitle className=''>
              <h1 className='text-7xl font-normal'>Sorry</h1>
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <h1 className="text-3xl font-bold">Not Found</h1>
            <p>This page could not be found.</p>
            <Link href={"/"} className='block'>
            <Button>Go Home Page</Button>
            </Link>
          </CardContent>
        </Card>
        </motion.div>

      </div>
    </div>
  )
}

export default NotFound