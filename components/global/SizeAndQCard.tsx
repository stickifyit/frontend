'use client'
import React, { useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { productsSizes, qs, sizes } from '@/constant/sizesAndQ';
import { useSizeAndQ } from '@/store/sizeAndQ';
import { useCanvasProps } from '@/store/canvasProps';
import { handleUpload, handleUploadSticker } from '@/lib/uploadImage';
import { useParams } from 'next/navigation';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCart } from '@/store/cart';
import { toast } from '../ui/use-toast';
import { handleDraw } from '@/lib/canvas';
import { ToastAction } from '../ui/toast';
import { Product, getProductInfo } from '@/constant/allProductControlers';
import { Stick } from 'next/font/google';
type Props = {}

const SizeAndQCard = (props: Props) => {
    const params = useParams();
    const {q,size,setQ,setSize} = useSizeAndQ()
    const {file,radius,color,image} = useCanvasProps()
    const [loading,setLoading] = React.useState(false)
    const {addToCart} = useCart() 
    const [product,setProduct] = React.useState<Product|null>()

  const handelAddToCart =async()=>{
    setLoading(true)
      if(!file||!color||!q||!size) return setLoading(false)
      const type= params.product
      try {
      const canvas = await handleDraw(params as any,file,type as string,radius,color,.2)

      addToCart({
        canvas,
        file:file,
        radius,
        color,
        quantity:q,
        size,
        service:params.service as string,
        type:params.product as string
      })
      toast({
        title: "Item Added",
        description: 'Your item has been added to the cart.',
        action: (
          <ToastAction altText="Try again">close</ToastAction>
        ),
        dir: "bottom-center",
      })
      setLoading(false)
      } catch (error) {
        console.log(error)
      }
  }

  useEffect(()=>{
    setProduct(getProductInfo(params?.service as string,params?.product as string))
    setSize(
      getProductInfo(params?.service as string,params?.product as string)?.sizes[0] as string
      )
  },[setProduct,params?.product,params?.service,setSize])
  return (
        <Card className="ml-auto h-fit">
          <CardHeader></CardHeader>
          <CardContent className="min-w-[400px] h-fit">
            <CardTitle>Select a Size</CardTitle>
            <div className="my-6">
            <Select value={size} onValueChange={e=>setSize(e)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {
                product?.sizes?.map((size) => (
                  <SelectItem key={size} value={size}> 
                    {size} {
                      params?.service === "stickers" ? "cm":
                      ""
                    }
                  </SelectItem>
                ))
                }
              </SelectContent>
            </Select>

            </div>
            <CardTitle>Select a quantity</CardTitle>
            <div className="my-6">
              <RadioGroup value={String(q)} onValueChange={e=>setQ(Number(e))}>
                {
                new Array(5).fill(0)
                .map((_,q) => (
                  <div key={q} className="flex items-center space-x-2">
                    <RadioGroupItem value={`${q+1}`} id={`option-${q+1}`} />
                    <Label className="flex w-full" htmlFor={`option-${q+1}`}>
                      <div className="flex-[2]">{(product?.quantities[product.sizes.indexOf(size)]??0)*(q+1)} {
                        params?.service === "stickers" ?  "sticker": "t-shirt"
                      }</div>
                      <div className="flex-[1]">{(q+1) * 40}Dh</div>
                      <div className="text-green-700 flex-[1] justify-end flex">
                        {14}%
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button disabled={!image||loading} onClick={handelAddToCart} size="lg" className="w-full">
              {
                loading? "Uploading..." : "Add to cart"
              }
            </Button>
          </CardContent>
        </Card>
  )
}

export default SizeAndQCard