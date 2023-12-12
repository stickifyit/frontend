import type { Metadata } from 'next'
import { Inter  ,Lilita_One } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/global/Navbar'
import { NavbarHight } from '@/constant/constants'
import { Toaster } from '@/components/ui/toaster'
import QueryProvider from '@/components/providers/QueryProvider'
import Footer from '@/components/global/Footer'

const inter = Inter({ subsets: ['latin'] })
const LilitaOne = Lilita_One({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-lilita-one',
})

export const metadata: Metadata = {
  title: 'Stickify',
  description: 'sticker sheets store',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" >
      <body className={LilitaOne.className + " " + inter.className + " tracking-wide "}>
        <QueryProvider>
            <Toaster />
            <div className='text-gray-700 bg-gray-50'>
            <Navbar/>
            <div className='' style={{marginTop:NavbarHight}}>
                {children}
            </div>
            <Footer/>
            </div>
        </QueryProvider>
      </body>
    </html>
  )
}
