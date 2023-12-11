import { Check, CheckCircle, LayoutPanelTop, Shapes, Upload } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'

type Props = {
    selected:number | null
    setSelected:(i:number|null) => void
}

const iconSize = 28
const navButtons = [
    {
        name:"checkout",
        icon: <CheckCircle size={iconSize}/>
    },
    {
        name:"layout",
        icon:<LayoutPanelTop  size={iconSize}/>,
    },
    {
        name:"explore",
        icon:<Shapes size={iconSize}/>,
    },
    {
        name:"uploads",
        icon:<Upload size={iconSize}/>,
    }
]


export default function CustomSheetNavBar({selected,setSelected}: Props) {
  return (
    <div className={'md:border-r flex w-full flex-col p-2 gap-2 md:w-fit '}>
        {
            navButtons.map((button,i) => {
                return (
                    <Button onClick={()=>{setSelected(i)}} className='md:w-20 md:h-20 w-16 h-16  flex flex-col gap-2 items-center justify-center text-xs font-sans' key={button.name} variant={i===selected?"secondary":"outline"} size={"icon"}>
                        {button.icon}
                        <div className='text-[.6rem]'>{button.name}</div>
                    </Button>
                )
            })
        }
    </div>
  )
}