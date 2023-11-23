import { LOGO, NavbarHight } from '@/constant/constants'
import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, ShoppingBasket } from 'lucide-react'
import { NavbarNavigation } from './NavbarNavigation'
import Link from 'next/link'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div style={{height: NavbarHight}} className={'flex items-center border-b bg-white z-50 fixed w-full top-0'}>
        <div className='container flex items-center mx-auto'>
            <Link href={"/"} className='flex items-center gap-4'>
                <Image src={LOGO} className='' alt='logo' width={60} height={100}/>
                <h1 className='text-2xl font-bold text-bblack uppercase'>stickify</h1>
            </Link>
            <div className='flex-1 pl-8'>
                <NavbarNavigation/>
            </div>
            <div className='flex gap-2'>
                <Button size={"icon"} variant={"outline"}><ShoppingBasket /></Button>
                <Button className='uppercase flex gap-2'>Login<ArrowRight size={16}/></Button>
            </div>
        </div>
    </div>
  )
}

export default Navbar