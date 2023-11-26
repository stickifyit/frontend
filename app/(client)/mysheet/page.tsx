import { Button } from '@/components/ui/button'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div>
        <div className='container mx-auto min-h-screen p-2'>
            <div className='max-h-screen mx-auto bg-white aspect-[1/2]'>
                <Button variant={"secondary"}></Button>
            </div>
        </div>
    </div>
  )
} 