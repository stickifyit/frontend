import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Sticker } from '@/app/(client)/explore/[pack]/page'
import { Card } from '../ui/card'
import Image from 'next/image'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { useCanvasProps } from '@/store/canvasProps'
import { useRouter } from 'next/navigation'
import axios from 'axios'
  
type Props = {
    item : Sticker
}
const services = [
    {
        name:"Sticker",
        value:"stickers",
        types:[
            {name:"die cut",value:"die-cut"},
            {name:"square",value:"square"},
            {name:"rect",value:"rect"},
            {name:"bumper",value:"bumper"},
            {name:"oval",value:"oval"},
            {name:"circle",value:"circle"},
            {name:"rounded",value:"rounded"},
        ]
    },
    {
        name:"T-Shirt",
        value:"t-shirts",
        types:[
            {name:"back side",value:"back-side"},
            {name:"left chest",value:"left-chest"},
            {name:"center chest",value:"center-chest"},
        ]
    }
]
const StickerDialog = ({item}: Props) => {
    const [service, setService] = React.useState(services[0].value)
    const [type, setType] = React.useState(services[0].types[0].value)
    const {setImage} = useCanvasProps()
    const route = useRouter()
    const handleContinue =async () => {
        try {
            const response = await axios.post('http://localhost:3001/fetch-image', {
                url: `https://storage.googleapis.com/stickify-storage/${item.imageURL}`,
            });
            const imageDataUrl = response.data;
            setImage(imageDataUrl);
            route.push('/product/'+service+'/'+type)
          } catch (error) {
            console.error('Error fetching image:', error);
          }
    }
  return (
<Dialog >
  <DialogTrigger>
        <Card className={'w-full rounded-xl relative cursor-pointer overflow-hidden duration-150  '}>
            <Image src={"https://storage.googleapis.com/stickify-storage/"+item.imageURL} alt="" width={200} height={200} className='aspect-square drop-shadow-lg w-full  object-cover p-4'/>
            <div className='p-3 text-center'>
                <h3 className='text-center font-semibold'>{item.name}</h3>
            </div>
        </Card>
  </DialogTrigger>
  <DialogContent className=''>
    <DialogHeader>
      <DialogDescription >
        <div className='flex flex-col gap-12'>
            <Image src={"https://storage.googleapis.com/stickify-storage/"+item.imageURL} alt="" width={400} height={400} className='aspect-square drop-shadow-2xl mx-auto w-[300px]  object-cover p-4'/>
            <div className='flex-[2] flex flex-col'>
                <h1 className='text-xl'>{item.name}</h1>
                <h1 className='text-2xl'>Order Sticker</h1>
                <div className='py-4  flex gap-4'>
                    
                    {/* <h3 className='text-md'>Select service</h3> */}
                    <Select value={service} onValueChange={(e)=>setService(e)}>
                    <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Service" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            services.map((item, index) => (
                                <SelectItem key={index} value={item.value}>{item.name}</SelectItem>
                            ))
                        }
                    </SelectContent>
                    </Select>
                    {/* <h3 className='text-md'>Select type</h3> */}
                    <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Service" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            services[services.findIndex(item => item.value === service)].types.map((item, index) => (
                                <SelectItem key={index} value={item.value}>{item.name}</SelectItem>
                            ))
                        }
                    </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
        <DialogClose>
            <Button variant={'outline'}>Close</Button>
        </DialogClose>
        <DialogClose>
            <Button onClick={handleContinue}>Continue</Button>
        </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>

  )
}

export default StickerDialog