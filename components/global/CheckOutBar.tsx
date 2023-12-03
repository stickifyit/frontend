import React from 'react'
import { Button } from '../ui/button'
import { ShoppingBagIcon, ShoppingBasket } from 'lucide-react'
import { useSheet } from '@/store/customSheet'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useCart } from '@/store/cart'
import { sizes } from '@/constant/sizesAndQ'
import { toast } from '../ui/use-toast'
import { sheetPricing } from '@/constant/pricing'
import { useRouter } from 'next/navigation'

type Props = {}

function CheckOutBar({}: Props) {
    const {sheet,process,setSheet,sheetQuantity,setSheetQuantity} = useSheet()
    const router = useRouter()
    const {addToCart} = useCart()



  // adding the sheet to cart

  const handleAddToCart = () => {
    addToCart({
      quantity:sheetQuantity,
      image:sheet[0].image as string,
      data:{
            type:'custom sheet',
            data:process.map(item => {
              return ({
                x: item.x,
                y: item.y,
                image: item.image as string,
                width: item.width,
                height: item.height,
                type: item.item.type,
                radius: item.item.radius,
                id: item.item.id,
                size: item.item.size
              })
            }),
      }
    }) 
    console.log(process)
    setSheet([]) 
    toast(
      {
        title: "added to cart",
        description: "your order has been placed",
        dir: "bottom-center",
      }
    ) 
    router.push("/cart")
  }





  return (
    <div className=" h-full overflow-auto flex-1  relative">
        <div className="p-3 flex mb-4 justify-between items-center text-xl mt-10 z-20 shadow-xl shadow-[#33333307] sticky top-0 bg-white border-b">
            <h2 className='capitalize'>About order</h2>
        </div>
        {
          sheet.length > 0 &&
            <div className='p-3 space-y-4'>
                <h2 className='text-5xl'>Yaay!</h2>
                <p className=' opacity-75 text-lg'>what a sheet ,<br/> you can now add it to your cart</p>

                  <RadioGroup value={String(sheetQuantity)} onValueChange={e=>setSheetQuantity(Number(e))}>
                    {
                    new Array(6).fill(0)
                    .map((_,q) => (
                      <div key={q} className="flex items-center space-x-2">
                        <RadioGroupItem value={`${q+1}`} id={`option-${q+1}`} />
                        <Label className="flex w-full" htmlFor={`option-${q+1}`}>
                          <div className="flex-[1]">{q+1} Sheet</div>
                          <div className="flex-[1]">{sheetPricing[q]} Dh</div>
                          {/* <div className="text-green-700 flex-[1] justify-end flex">
                            {14}%
                          </div> */}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                <div className='flex items-center gap-2 justify-between'>
                    <h2 className='text-2xl capitalize'>{sheetQuantity*25} dh</h2>
                    <Button onClick={handleAddToCart} disabled={!(sheet.length>0)} className='sticky bottom-0' size="lg">Add to cart <ShoppingBasket/></Button>
                </div>
            </div>
        }
    </div>

  )
}

export default CheckOutBar