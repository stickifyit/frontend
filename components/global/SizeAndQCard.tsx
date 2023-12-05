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
import { useParams, useRouter } from 'next/navigation';

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
import { useSheet } from '@/store/customSheet';
import { getPriceByQuantity } from '@/constant/pricing';
import { CupPrice, SheetPrice, TShirtPrice, getPrice } from '@/lib/price';
type Props = {}

const SizeAndQCard = (props: Props) => {
    const params = useParams();
    const {q,size,setQ,setSize} = useSizeAndQ()
    const {file,radius,color,image,imageUrl,setImageUrl} = useCanvasProps()
    const [loading,setLoading] = React.useState(false)
    const {addToCart} = useCart() 
    const [product,setProduct] = React.useState<Product|null>()
    const {sheet,setSheet,setSheetQuantity} = useSheet()
    const route = useRouter()

  const handelAddToCart =async()=>{
    // setLoading(true)
    //   if(!image||!color||!q||!size) return setLoading(false)
    //   const type= params.product
    //   try {

      // const canvas = await handleDraw(params as any,image as string,_type as string,radius,color,2)
    //   addToCart({
      //   canvas,
      //   image:image,
      //   radius,
      //   color,
      //   quantity:q,
      //   size,
      //   service:params.service as string,
      //   type:params.product as string
      // })
      // toast({
      //   title: "Item Added",
      //   description: 'Your item has been added to the cart.',
      //   action: (
      //     <ToastAction altText="Try again">close</ToastAction>
      //   ),
      //   dir: "bottom-center",
      // })
      // setLoading(false)
      // } catch (error) {
      //   console.log(error)
      // }
      // const _size = Number(size.split("x")[0]) as number
      // const _type = params.product as string
      // const _height = _type == "rect"|| _type == "oval" ?  (_size*2)/3 : _type == "bumper" ? (_size)/3 : _size
      // const _q = Math.floor( 18 / _size ) * Math.floor(28 / _height)
      // setSheet([{
      //   fileType:"upload",
      //   type:(params.product as string).replace("-"," "),
      //   size:_size ,
      //   color,
      //   radius,
      //   id:Math.random() + " x " + Math.random(),
      //   quantity:_q,
      //   image:image as string , 
      //   file : file as File
      // }])
      // route.push("/mysheet")
      // setSheetQuantity(q)

      console.log(params.product)
      if(params?.service==="t-shirts"){
        addToCart({
          quantity:q,
          image:imageUrl,
          data:{
            type:"t-shirt",
            data:{
              image:imageUrl,
              type:params?.product as ("center-chest" | "left-chest" | "back-side"),
            }
          }
        })
      }else if(params?.service === "cup"){
        addToCart({
          quantity:q,
          image:imageUrl,
          data:{
            type:"cup",
            data:{
              image:imageUrl,
              type:params?.product as ("cup"),
            }
          }
        })
      }
      // const _type = params.product as string
      // const canvas = await handleDraw(params as any,image as string,_type as string,radius,color,2)

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
            {
              params?.service !== "cup" &&
              <>
            <CardTitle className='font-thin'>Select a Size</CardTitle>
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
            </>

            }

            {
              params?.service !== "stickers" &&
            <div>
                  <CardTitle  className='font-thin'>Select a quantity</CardTitle>
                  <div className="my-6">
                    <RadioGroup value={String(q)} onValueChange={e=>setQ(Number(e))}>
                      {
                      new Array(5).fill(0)
                      .map((_,q) => (
                        <div key={q} className="flex items-center space-x-2">
                          <RadioGroupItem value={`${q+1}`} id={`option-${q+1}`} />
                          <Label className="flex w-full" htmlFor={`option-${q+1}`}>
                            <div className="flex-[2]">{(product?.quantities[product.sizes.indexOf(size)]??0)*(q+1)} {
                              params?.service === "cup" ?  "cups": "t-shirts"
                            }</div>
                            <div className="flex-[1]">{
                              params?.service === "stickers" ? getPrice(SheetPrice , (q+1)):
                              params?.service === "t-shirts" ? getPrice(TShirtPrice , (q+1)):
                              params?.service === "cup" ? getPrice(CupPrice , (q+1)): 0
                            } Dh</div>
                            {/* <div className="text-green-700 flex-[1] justify-end flex">
                              {14}%
                            </div> */}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
            </div>
            }
            <Button variant={"secondary"} disabled={!image||loading} onClick={handelAddToCart} size="lg" className="w-full">
              {
                loading? "Uploading..." : "Add to cart"
              }
            </Button>
          </CardContent>
        </Card>
  )
}

export default SizeAndQCard