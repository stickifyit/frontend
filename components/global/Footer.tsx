import React from 'react'
import Logo from "@/public/logo/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'

type Props = {}

export default function Footer  (props: Props) {
  return (
    <div 
    className='bg-slate-100 flex flex-col min-h-[30vh] mt-12'
    >
        <div className='container gap-8 flex-1 justify-between flex flex-col md:flex-row md:items-center '>
            <div className='md:p-8 py-8 flex gap-2 items-center w-fit flex-col'>
                <Image src={Logo} alt="logo" width={200} height={200} className='w-[100px] h-[100px] drop-shadow-2xl'/>
                <h1 className='text-4xl font-thin  flex items-center gap-2'>Stickify</h1>
            </div>
            <div className='flex-1'>
               <div className='md:flex justify-center gap-4 pb-8 md:pb-0 gap-y-8 grid grid-cols-2'>
                <div className='flex text-xs md:text-md flex-col gap-2 md:px-8'>
                    <h3 className='text-2xl'>Quick Links</h3>
                    <Link href={"/"}>
                        Home
                    </Link>
                    <Link href={"/contact"}>
                        Contact us
                    </Link>
                    <Link href={"/cart"}>
                        About us
                    </Link>
                    <Link href={"/cart"}>
                        Cart
                    </Link>
                </div>
                <div className='flex text-xs md:text-md flex-col gap-2 md:px-8'>
                    <h3 className='text-2xl'>Services</h3>
                    <Link href={"/services/stickers"}>
                        Sticker Sheets
                    </Link>
                    <Link href={"/mysheet"}>
                        Custom Sheet
                    </Link>
                    <Link href={"/services/t-shirts"}>
                        T{"'"}Shirt
                    </Link>
                    <Link href={"/services/cup"}>
                        Cups
                    </Link>
                </div>
                <div className='flex text-xs md:text-md flex-col gap-2 md:px-8'>
                    <h3 className='text-2xl'>Social Media</h3>
                    <Link href={"/"} className='flex items-center gap-2'>
                        <Facebook size={20}/>  Facebook
                    </Link>
                    <Link href={"/"} className='flex items-center gap-2'>
                        <Instagram size={20}/>  Instagram
                    </Link>
                </div>
                <div className='flex text-xs md:text-md flex-col gap-2 md:px-8'>
                    <h3 className='text-2xl'>Contact</h3>
                    <Link href={"/"} className='flex items-center gap-2'>
                        <Phone size={20}/>  Whatsapp
                    </Link>
                    <Link href={"/"} className='flex items-center gap-2'>
                        <Phone size={20}/>  07 89 97 86 14
                    </Link>
                    <Link href={"/"} className='flex items-center gap-2'>
                        <Mail size={20}/>  contact@stickify.com
                    </Link>
                </div>
                <div className='flex text-xs md:text-md flex-col gap-2 md:px-8'>
                    <h3 className='text-2xl'>More Links</h3>
                        <Link href={"/"} className='flex items-center gap-2'>
                            Explore
                        </Link>
                        <Link href={"/how-to-order"} className='flex items-center gap-2'>
                            How to Order
                        </Link>
                        <Link href={"#"} className='flex items-center gap-2'>
                            Price and Payment
                        </Link>
                        <Link href={"#"} className='flex items-center gap-2'>
                            privacy policy
                        </Link>
                </div>


                </div> 
            </div>
        </div>
        <div className='h-10 bg-secondary text-white text-center flex items-center justify-center font-sans text-xs md:text-md'>
            © 2023 Stickify. All rights reserved.
        </div>

    </div>
  )
}