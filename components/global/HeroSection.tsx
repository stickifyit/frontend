"use client"
import React from 'react'
import { Button } from '../ui/button'
import { HeroImages } from '@/constant/constants'
import {ArrowRight} from "lucide-react"
import Image from 'next/image'
import { HeroLinksImages } from '@/constant/constants'
import Link from 'next/link'
import {motion} from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

type Props = {}

const HeroSection = (props: Props) => {
  return (
    <>
    <div className='min-h-[55vh] bg-gray-50 flex '>

    <div className='w-full py-12 '>
      <div className='container px-4 h-full items-center flex gap-0 lg:gap-4 flex-col-reverse lg:flex-row mx-auto'>
        <motion.div 
        className=' h-full lg:text-start flex-1 text-center lg:items-start flex flex-col gap-6 md:justify-center'>
          <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className='md:text-6xl text-3xl max-w-3xl uppercase font-inter'>Turn Your Designs into Stunning Reality</motion.h1>
          <motion.h1 initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.4}} className='text-lg md:text-2xl opacity-75 max-w-3xl font-thin'>Experience the joy of holding your creativity with our high-quality printed stickers</motion.h1>
          <div className='flex gap-4 flex-col md:flex-row items-center'>
            <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.6}}>
            <Link href={"/services/stickers"}>
                <Button size={'lg'} variant={"secondary"} className='uppercase flex gap-2   text-lg'>Explore Sheets</Button>
            </Link>
            </motion.div>
            <motion.div initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.8}}>
            <Link href={"/mysheet"}>
                <Button size={'lg'} variant={"outline"} className='uppercase flex gap-2  text-lg '>Make your sheet <ArrowRight size={16}/></Button>
            </Link>
            </motion.div>
          </div>
        </motion.div>
        <motion.div 
            initial={{opacity:0,y: -200,x:0,scale:1}}
            animate={{opacity:1,y: 0,x:14,scale:.9}}

        className='flex items-center max-w-lg justify-center py-8 md:py-0 relative'>
          <Image src={HeroImages.carrot} alt='logo' className='absolute top-0 -left-20 drop-shadow-lg animate-updown-slow1' width={200} height={200}/>
          <Image src={HeroImages.doughnut} alt='logo' className='z-20 drop-shadow-xl  animate-updown' width={500} height={500}/>
          <Image src={HeroImages.watermelon} alt='logo' className='absolute top-0 right-0 drop-shadow-lg  animate-updown-slow' width={200} height={200}/>
        </motion.div>
      </div>
    </div>
    </div>

    <div className=''>
        <div className='container px-4 justify-center py-4 mx-auto md:flex gap-2 md:gap-6 grid grid-cols-2 md:flex-row items-center'>
            {
            [
                {name:"custom stickers",img:HeroLinksImages.Stickers,href:"stickers"},
                // {name:"custom labels",img:HeroLinksImages.Label,href:"labels"},
                {name:"custom shirts",img:HeroLinksImages.T_Shirt,href:"t-shirts"},
                {name:"custom cup",img:HeroLinksImages.Cup,href:"cup"},
            ].map(({name,img,href},index)=>
            <motion.div key={name}
                initial={{opacity:0,y:100,scale:0.6}}
                animate={{opacity:1,y:0,scale:1}}
                transition={{delay:0.1*index+0.8}}
                className='w-fit h-full flex flex-col gap-4 drop-shadow-md items-center'
            >
              <Link href={"/services/"+href} className='w-fit p-2 hover:scale-105 duration-300 rounded-2xl border bg-white '>
                  <Image src={img} alt={name} width={200} height={200}/>
                  <h2 className='text-center text-xl'>{name}</h2>
              </Link>
            </motion.div>
            )
            }
        </div>
    </div>
      <div className='container p-4 py-8'>
        <div className='flex flex-col gap-4 md:flex-row max-w-5xl mx-auto'>
          {
            [
                {
                  title:"Hot Picks",
                  content: "🔥 Hot Picks! Explore our trendiest stickers, tees, and cup prints. Limited stock! Shop Now.",
                },
                {
                  title:"Create Your Style",
                  content: "🎨 Create your own style with our custom stickers sheets. Shop Now.",
                }
            ].map(({title,content},index)=>(
                <Card key={title} className='flex-1'>
                    <CardHeader>
                        <CardTitle className='text-2xl font-medium'>
                          {title}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {content}
                    </CardContent>
                </Card>
            ))
          }
        </div>
    </div>
    </>
  )
}

export default HeroSection