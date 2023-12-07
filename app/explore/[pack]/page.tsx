"use client"
import StickerDialog from '@/components/global/StickerDialog'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import axios from '@/lib/axios'
import { useSheet } from '@/store/customSheet'
import { fetchStickers } from '@/utils/fetchExplore'
import { CheckCheckIcon, CheckCircle, CheckCircle2, Edit2Icon, EditIcon, Heart, Search, Smile } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useQueries, useQuery } from 'react-query'
import TShirt from "@/public/custom-t-shirts/left-chest-canvas.png"
import Cup from "@/public/custom-cup/Untitled-1.png"
import backTShirt from "@/public/custom-t-shirts/back-side-canvas.png"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {motion} from "framer-motion"

// Import Swiper styles
import 'swiper/css';
import { useCanvasProps } from '@/store/canvasProps'


type Props = {}
const Page = (props: Props) => {
    const params = useParams()
    const {data:stickers} = useQuery("fetchStickers",()=>fetchStickers(params?.pack as string))
    const {sheet , setSheet } = useSheet()
    const router = useRouter()
    const [selected,setSelected] = React.useState(0)
    const {setImage,setImageUrl} = useCanvasProps()
  
    const getSheet = ()=>{
        if(!stickers) return 
        setSheet(new Array(24).fill(0).map((item, index) => ({
            fileType: "url",
            quantity:1,
            image: "https://storage.googleapis.com/stickify-storage/"+(stickers[index as number % stickers.length].imageURL),
            type: "die cut",
            size: 4.5 ,
            color: "white",
            id: stickers[index as number % stickers.length]._id + " x " + Math.random(),
        })))
        router.push("/mysheet")

    }


    const handleContinue =async (type:string,ser:string = "t-shirts") => {
        if(!stickers) return
        try {
            const response = await axios.post('http://localhost:3001/fetch-image', {
                url: `https://storage.googleapis.com/stickify-storage/${stickers[selected].imageURL}`,
            });
            const imageDataUrl = response.data;
            console.log(imageDataUrl)
            setImage(imageDataUrl);
            setImageUrl( `https://storage.googleapis.com/stickify-storage/${stickers[selected].imageURL}`)
            router.push('/product/'+ser+'/'+type)
          } catch (error) {
            console.error('Error fetching image:', error);
          }
    } 



  return (
    stickers &&
    <div className='min-h-screen '>
        <div className='container px-4 mx-auto'>
            {/* <div className='flex justify-between items-center'>
                <h1 className='text-4xl py-10'>Pack Stickers</h1>
                <div className='relative h-fit ml-auto'>
                    <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2'/>
                    <Input placeholder='Search sticker' className='max-w-md flex-1 pl-10'/>
                </div>
            </div> */}

            <div className='flex flex-col gap-4 py-8'>
                    <h1 className='text-4xl'>Pack stickers</h1>
                    <div className='flex items-center p-2'>
                        <div className='w-[300px] hidden md:block h-[300px] p-2 drop-shadow-2xl border-r-[3px]'>
                            <Image src={"https://storage.googleapis.com/stickify-storage/"+stickers[selected].imageURL} alt='' width={500} height={500}></Image>
                        </div>
                    <Swiper
                    spaceBetween={0}
                    slidesPerView={5.6}
                    breakpoints={
                        {
                            0:{
                                slidesPerView:3.5,
                                spaceBetween:0,
                            },
                            640:{
                                slidesPerView:3.5
                            },
                            768:{
                                slidesPerView:4.5
                            },
                            1024:{
                                slidesPerView:5.5
                            }
                        }
                    }
                    className='flex-1 sticky top-[0px]'
                    >

                        {
                            stickers?.map((item, index) => (
                            <SwiperSlide  key={item._id} className='md:p-2 p-1'>
                                <motion.div 
                                    initial={{opacity:0,y:50}}
                                    animate={{opacity:1,y:0}}
                                    transition={{delay:0.06* index,duration:0.3}}
                                    className={selected === index ? "outline rounded-xl outline-secondary" :""} onClick={()=>{setSelected(index)}}>
                                    <StickerDialog item={item}/>
                                </motion.div>
                            </SwiperSlide>
                            ))
                        }
                    </Swiper>
 
                    </div>
                   <h1 className='text-4xl'>Products</h1>
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className='grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4'>

                                <div onClick={()=>{getSheet()}} className='w-full flex flex-col gap-2 p-2 md:p-6 rounded-xl border bg-white h-fit'>
                                    <h1 className='mb-2 text-lg'>Pack Sheet</h1>
                                    <div className=' grid grid-cols-4 '>
                                        {
                                            stickers &&
                                            new Array(24).fill(0).map((item, index) => (
                                                <Image key={index} className='w-full p-1' src={"https://storage.googleapis.com/stickify-storage/"+(stickers[index as number % stickers.length].imageURL)} alt="" width={200} height={200} ></Image>
                                            ))
                                        }
                                    </div>
                                </div>

                                {/* // center chest sticker */}
                                <div onClick={()=>{handleContinue("center-chest")}} className='bg-white border flex-col rounded-xl p-2 md:p-6 flex items-center justify-center'>
                                    <h1 className='mb-2 text-lg w-full'>Center Chest</h1>
                                    <div className='flex-1 flex justify-center items-center'>
                                        <div className='relative -rotate-5'>
                                            <Image alt='' className='w-full drop-shadow-xl' width={300} height={300}  src={TShirt}></Image>
                                            <Image alt='' className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-80%]' width={40} height={40} src={"https://storage.googleapis.com/stickify-storage/"+(stickers[selected].imageURL)} ></Image>
                                        </div>
                                    </div>
                                </div>
                                {/* // left chest sticker */}
                                <div  onClick={()=>{handleContinue("left-chest")}} className='bg-white border flex-col rounded-xl  p-2 md:p-6 flex items-center justify-center'>
                                    <h1 className='mb-2 text-lg w-full'>Left Chest</h1>
                                    <div className='flex-1 flex justify-center items-center'>
                                        <div className='relative -rotate-5'>
                                            <Image alt='' className='w-full drop-shadow-xl' width={300} height={300}  src={TShirt}></Image>
                                            <Image alt='' className='absolute top-[25%] right-[30%]' width={20} height={20} src={"https://storage.googleapis.com/stickify-storage/"+(stickers[selected].imageURL)} ></Image>
                                        </div>
                                    </div>
                                </div>
                                {/* // back side sticker */}
                                <div onClick={()=>{handleContinue("back-side")}} className='bg-white border flex-col rounded-xl  p-2 md:p-6 flex items-center justify-center'>
                                    <h1 className='mb-2 text-lg w-full'>Back Side</h1>
                                    <div className='flex-1 flex justify-center items-center'>
                                        <div className='relative'>
                                            <Image alt='' className='w-full  drop-shadow-xl' width={300} height={300}  src={backTShirt}></Image>
                                            <Image alt='' className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-90%]' width={40} height={40} src={"https://storage.googleapis.com/stickify-storage/"+(stickers[selected].imageURL)} ></Image>
                                        </div>
                                    </div>
                                </div>

                                {/* // cup */}
                                <div onClick={()=>handleContinue("cup","cup")} className='bg-white border flex-col rounded-xl p-2 md:p-6 flex items-center justify-center'>
                                    <h1 className='mb-2 text-lg w-full'>Cup</h1>
                                    <div className='flex-1 flex justify-center items-center'>
                                        <div className='relative -rotate-5'>
                                            <Image alt='' className='w-full drop-shadow-xl' width={300} height={300}  src={Cup}></Image>
                                            <Image alt='' className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-40%]' width={50} height={50} src={"https://storage.googleapis.com/stickify-storage/"+(stickers[selected].imageURL)} ></Image>
                                        </div>
                                    </div>
                                </div>

                    </motion.div>
            </div>
        </div>
    </div>

  )
}



export default Page