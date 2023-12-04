"use client"
import React, { useState,ChangeEvent,useRef,useEffect, useMemo } from 'react';

import { Circle, Menu, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { productHeroImages } from '@/constant/productsHeroImages';
import CanvasButtons from './CanvasButtons';
import { useCanvasProps } from '@/store/canvasProps';
import { useSizeAndQ } from '@/store/sizeAndQ';
import { productsSizes, sizes } from '@/constant/sizesAndQ';
type Props = {
    type : keyof typeof productHeroImages
}
import bg from "@/public/canvas.jpg"
import { drawEllipse } from '@/lib/utils';
import { getProductInfo } from '@/constant/allProductControlers';
import { useParams } from 'next/navigation';
import { Cup_Behive, backSide_Behive, bumper_Behive, centerChest_Behive, circle_Behive, dieCut_Behive, drawImageWithMargin, leftChest_Behive, oval_Behive, rect_Behive, rounded_Behive, square_Behive } from '@/lib/canvasProductBehive';




function Canvas({type}: Props) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const {color,setColor,setRadius,image, setImage,setFile,radius : defaultRadius} = useCanvasProps()
    const {size,setSize} = useSizeAndQ()
    const params = useParams()

    useEffect(() => {
        setRadius(
        type === "die-cut"?50: 
        type === "circle" ?80:
        type === "square" ? 40:
        type === "rect" ? 100:
        type === "bumper" ? 100:
        type === "oval" ? 120:
        0
        )
        setFile(null)
        setColor("#ffffff")
    },[setRadius,type,setSize,setColor,setFile,setImage,params?.service,params?.product])
    // useMemo(()=>{
    //     setSize(
    //       getProductInfo(params?.service as string,params?.product as string)?.sizes[0] as string
    //     )
    //     setImage(null);
    //     setFile(null);
    //     setRadius(0);
    //     setColor("#ffffff")
    // },[params?.service,params?.product,setSize,setFile,setRadius,setColor])

    useEffect(() => {
      const quality = .75
      if (image && canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

    
        if (context) {
          const img = new Image();
          img.src = image;

          const radius = defaultRadius;
    
          img.onload = () => {
            // Clear the canvas
            canvas.width= 600 * quality;
            canvas.height=((type=="rect"|| type=="oval")? 400: type=="bumper"? 200 : 600) * quality
    
            // Draw the image on the canvas
            const aspectRatio = img.width / img.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.width / aspectRatio;
    
            // Center the image on the canvas
            let drawX = 0;
            let drawY = (canvas.height - drawHeight) / 2;

            context.fillStyle = color; // Change the color if needed

            if(params.service == "stickers"){
                context.clearRect(0, 0, canvas.width, canvas.height);

                if(type=="die-cut"){
                  dieCut_Behive(context,img,drawX,drawY,drawWidth,drawHeight,radius,quality,3)
                }else if(type=="circle"){
                  circle_Behive(context,img,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                }else if(type=="square"){
                  square_Behive(context,img,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                }else if(type=="rect"){
                  rect_Behive(context,img,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                }else if(type=="bumper"){
                  bumper_Behive(context,img,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                }else if(type=="oval"){
                  oval_Behive(context,img,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                }else if(type=="rounded"){
                  rounded_Behive(context,img,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                }

            }else if(params.service == "t-shirts"){
                if (params.product == "left-chest") {
                  leftChest_Behive(context,img,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                } else if(params.product == "center-chest") {
                  centerChest_Behive(context,img,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                } else if(params.product == "back-side") {
                  backSide_Behive(context,img,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                }
            }else if(params.service == "cup"){
                if (params.product == "cup") {
                  Cup_Behive(context,img,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                }
            }



          };
    
          img.onerror = (error) => {
            console.error("Error loading image:", error);
          };
        }
      }
    }, [image, canvasRef,defaultRadius,color,type]);
    
    


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFile(file);
        const reader = new FileReader();
  
        reader.onloadend = () => {
          const imageDataUrl = reader.result as string;
          setImage(imageDataUrl); 
        };
  
        reader.readAsDataURL(file);
      }
    };
    
  return (

            <>
        <div className="flex-1 min-h-[500px] pb-4 bg-slate-100 overflow-hidden relative border rounded-2xl group flex flex-col-reverse justify-center items-center">
                        {/* <input type="range" min="0" max="150" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} /> */}
                          <input className='hidden' type="file" accept='image/*' id='upload' onChange={handleImageChange} />
                  {
                        !image &&
                        <Label htmlFor='upload' className='cursor-pointer px-8 flex gap-2 text-primary-foreground shadow py-4 text-lg bg-primary rounded-xl'>
                          Upload sticker
                            <Upload/>
                        </Label>
                  }
                {(image &&
                    <>
                    <CanvasButtons/>
                  <canvas
                    className='p-1 w-[500px] border-x drop-shadow-xl '
                    ref={canvasRef}
                  ></canvas>
                  <div style={{width:(500) + "px"}} className='h-[50px] opacity-60 left-[50%] mx-auto top-0  px- flex   justify-between'>
                      {
                        size &&
                        (
                        ["stickers"].includes(params?.service as string) &&
                        size.includes("x")
                        && 
                         new Array((size.split("x")?.map(Number)[0]+1)??0).fill(0).map((_,q) => (
                          <>
                          {
                            q!==0 && size.slice(0,2)!=="20" &&
                            new Array(7) .fill(0).map((_,q2) => (
                              <div key={q2} className='text-[6px]'>|</div>
                            ))
                          }
                          <div className={"text-xs flex  flex-col gap-2 items-center"} key={q}>
                            <div>|</div>
                          {q}
                          </div>
                          </>
                        ))
                        )
                      }
                  </div>
                    </>
                )}
            </div>
            </>
  )
}

export default Canvas