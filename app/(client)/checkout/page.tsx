"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import img from '@/public/cart/friends.png'
import Image from 'next/image'
import axios from '@/lib/axios'
import { useCart } from '@/store/cart'
import { toast } from '@/components/ui/use-toast'
import socket from '@/lib/socket'
import { ArrowRight, Loader } from 'lucide-react'

type Props = {}

export default function Page({}: Props) {
    const {cart,setCart} = useCart();
    const [loading,setLoading] = React.useState(false);

    const [name,setName] = useState("");
    const [address,setAddress] = useState("");
    const [phone,setPhone] = useState("");



    const checkout = async () => {
        const orderItemsIds:string[] = []
        try {
          setLoading(true);
      
          const orderRes = await axios.post<any>("/orders/create", {
            customerId: Math.random() + "",
            number: phone,
            fullName: name,
            address: address,
          });
      
          const orderId = orderRes.data?._id ?? "";
      
          for (const item of cart) {
            if (item.data.type === "custom sheet") {
              for (let i = 0; i < item.quantity; i++) {
                await axios.post("/order-items/create", {
                  orderId: orderId,
                  image: item.image as string,
                  type: "custom-sheet",
                  customSheetSchema: {
                    data: {
                      items: item.data.data.map((s) => ({
                        x: s.x,
                        y: s.y,
                        image: s.image as string,
                        width: s.width,
                        height: s.height,
                      })),
                    },
                  },
                }).then((res) => {
                    orderItemsIds.push(res.data?._id)
                });
              }
            } else if (item.data.type === "sticker sheet") {
              for (let i = 0; i < item.quantity; i++) {
                await axios.post("/order-items/create", {
                  orderId: orderId,
                  image: item.image as string,
                  type: "sticker-sheet",
                  stickerSheetSchema: {
                    data: {
                      sheetId: item.data.data.sheetId,
                    },
                  },
                }).then((res) => {
                    orderItemsIds.push(res.data?._id)
                });
              }
            } else if (item.data.type === "t-shirt") {
              await axios.post("/order-items/create", {
                orderId: orderId,
                image: item.image as string,
                type: "t-shirt",
                tShirtSchema: {
                  quantity: item.quantity,
                  data: {
                    type: item.data.data.type,
                    image: item.data.data.image,
                  },
                },
              }).then((res) => {
                    orderItemsIds.push(res.data?._id)
                });
            } else if (item.data.type === "cup") {
              await axios.post("/order-items/create", {
                orderId: orderId,
                image: item.image as string,
                type: "cup",
                cupSchema: {
                  quantity: item.quantity,
                  data: {
                    type: item.data.data.type,
                    image: item.data.data.image,
                  },
                },
              }).then((res) => {
                    orderItemsIds.push(res.data?._id)
                });
            }
          }
      


          toast({
            title: "Checkout Done",
            description: "Your order has been placed",
            dir: "bottom-center",
          });


          axios.put(`/orders/update/${orderId}`, {
              cart: orderItemsIds
          })
      
          setCart([]);
          socket.emit("add order");
        } catch (error) {
          console.error("Checkout failed:", error);
          toast({
            title: "Checkout Failed",
            description: "There was an error placing your order",
            dir: "bottom-center",
          });
        } finally {
          setLoading(false);
        }
      };
      
      

  return (
    <div className='min-h-screen container py-8'>
        <Card className=''>
            <CardHeader>
                <CardTitle className='text-7xl font-thin opacity-75'>Checkout</CardTitle>
            </CardHeader>
            <CardContent className='  overflow-hidden flex gap-4'>
                <div className='flex-1 space-y-2'>
                    <h4 className='text-xl opacity-75'>Full Name</h4>
                    <Input value={name} onInput={(e:any)=>setName(e.target.value)} className='max-w-2xl'></Input>
                    <h4 className='text-xl opacity-75'>Phone Number</h4>
                    <Input value={phone} onInput={(e:any)=>setPhone(e.target.value)} className='max-w-2xl'></Input>
                    <h4 className='text-xl opacity-75'>Full Address</h4>
                    <Input value={address} onInput={(e:any)=>setAddress(e.target.value)} className='max-w-2xl'></Input>
                    <br />
                    <Button onClick={checkout} disabled={loading|| !name || !address || !phone || !cart.length} size={"lg"} variant="secondary" className='max-w-[800px] '>
                        {
                            loading ?
                            <>Loading <Loader className='animate-spin'/></>
                            :
                            <>Checkout <ArrowRight/></>
                        }
                    </Button>
                </div>
                <Image src={img} alt='thanks' width={350} height={350} className='translate-y-14 drop-shadow-2xl'></Image>
            </CardContent>
        </Card>
    </div>
  )
}