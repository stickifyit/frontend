"use client"
import { LOGO, NavbarHight } from '@/constant/constants'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, Backpack, Menu, ShoppingBasket, X } from 'lucide-react'
import { NavbarNavigation } from './NavbarNavigation'
import Link from 'next/link'
import CartSheet from './CartSheet'
import {motion} from "framer-motion"
import { usePathname } from 'next/navigation'

type Props = {}

const Navbar = (props: Props) => {
    const [show, setShow] = React.useState(false)
  return (
    <div style={{height: NavbarHight}} className={'flex flex-col items-center border-b bg-white z-50 fixed w-full top-0'}>
        {/* <div className='h-6 text-sm w-full bg-secondary'>Stand with palestine </div> */}
        <div className='container px-4 flex items-center mx-auto flex-1 justify-between'>
            <Link href={"/"} className='flex items-center gap-4'>
                {/* <Image src={LOGO} className='w-[50px] h-[50px]' alt='logo' width={60} height={60}/> */}
                <h1 className='text-xl md:text-3xl tracking-wider text-bblack'>Stickify</h1>
            </Link>
            <div className='flex-1 pl-8 md:block hidden'>
                <NavbarNavigation/>
            </div>
            <div className='flex gap-2'>
                <CartSheet/>
                <Button size={"icon"} onClick={() => setShow(true)} className='md:hidden' variant={"outline"}>
                    <Menu/>
                </Button>
                {/* <Link href={"/mysheet"}>
                <Button className='uppercase flex gap-2' variant={"secondary"}>my bag<Backpack size={16}/></Button>
                </Link> */}
                {/* <Button className='uppercase flex gap-2'>Login<ArrowRight size={16}/></Button> */}
            </div>
        </div>
        {
            show &&
                <motion.div 
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    className='w-screen h-[100vh] bg-white md:hidden absolute top-0 left-0 z-50 p-8 flex flex-col items-start'>
                    <Button className='ml-auto' size={"icon"} onClick={()=>setShow(false)} variant={"secondary"}><X/></Button>
                    <div className='mt-8 flex gap-4 flex-1 justify-center flex-col items-start mb-10 '>
                        {
                        [
                            {name:"Home",href:"/"},
                            {name:"stickers",href:"/services/stickers"},
                            // {name:"t'shirts",href:"/services/t-shirts"},
                            // {name:"cups",href:"/services/cup"},
                            {name:"Explore",href:"/explore"},
                            {name:"contact",href:"/contact"},
                        ].map(({name,href},index)=>
                            <div key={index} className='h-fit ' onClick={()=>setShow(false)}>
                                <motion.div initial={{y:100,rotate:0,opacity:0}} animate={{y:0,rotate:-3,opacity:1}} transition={{delay:0.1*index}}>
                                    <MobileNavbarLink key={name} href={href} name={name}></MobileNavbarLink>
                                </motion.div>
                            </div>
                            )
                        }
                    </div>
                </motion.div>
        }
    </div>
  )
}


const MobileNavbarLink = ({href,name}:{href:string,name:string})=>{
    const pathName = usePathname()
    return (
        <Link href={href} className={'text-6xl uppercase drop-shadow-sm '+(pathName === href ? " bg-gray-800 px-6 text-secondary drop-shadow-xl " : "")}>{name}</Link>
    )
}

export default Navbar