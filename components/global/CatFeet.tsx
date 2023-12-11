import React from 'react'
import {motion} from "framer-motion"
import Image from 'next/image'
import catFeet from "@/public/cat-feet.png"
type Props = {
    children: React.ReactNode,
    time?:number
}

function CatFeet({children,time=0}: Props) {
  return (
    <motion.div
     initial={{y:-700,scale:1.2}}
     animate={{y:0,scale:1}}
     transition={{
         delay:time/1000,
         duration:.6
     }}
     className='relative '>
        <motion.div 
            initial={{y:0}}
            animate={{y:-700}}
            transition={{
                delay:1.8,
                duration:.6
            }}
            className='absolute bottom-52 z-30 left-1/2 '
        >
            <Image className=' drop-shadow-2xl w-[80px] md:w-[150px]' src={catFeet} height={150} width={150} alt={""}></Image>
        </motion.div>
        {children}
    </motion.div>
  )
}

export default CatFeet