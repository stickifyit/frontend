"use client"
import React, { useState,ChangeEvent,useRef,useEffect } from 'react';

import { Circle, Menu, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from '@/components/ui/label';
import { productHeroImages } from '@/constant/productsHeroImages';
type Props = {
    type : keyof typeof productHeroImages
}



function drawImageOnCanvas(
    context: CanvasRenderingContext2D,
    img: HTMLImageElement,
    drawX: number,
    drawY: number,
    drawWidth: number,
    drawHeight: number,
    margin: number,
  ) {
    // Calculate the aspect ratio of the image
    const aspectRatio = img.width / img.height;
  
    // Calculate the adjusted dimensions based on the aspect ratio
    var adjustedWidth = drawWidth;
    var adjustedHeight = adjustedWidth / aspectRatio;
  
    // Check if the adjusted height exceeds the available space
    if (adjustedHeight > drawHeight) {
      // If it does, adjust the height and width accordingly
      const maxHeight = drawHeight - 2 * margin; // Consider margin on both top and bottom
      adjustedHeight = maxHeight;
      adjustedWidth = adjustedHeight * aspectRatio;
    }
  
    // Calculate the final coordinates to center the image
    const offsetX = drawX + (drawWidth - adjustedWidth) / 2;
    const offsetY = drawY + (drawHeight - adjustedHeight) / 2;
  
    // Draw the image on the canvas
    context.drawImage(img, offsetX, offsetY, adjustedWidth, adjustedHeight);
  }
  


function Canvas({type}: Props) {

    const [image, setImage] = useState<string | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [radius,setRadius] = useState<number>(
        type==="die-cut"|| type === "circle" ?20:0
    );


    useEffect(() => {
      if (image && canvasRef.current) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
    
        if (context) {
          const img = new Image();
          img.src = image;
    
          img.onload = () => {
            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
    
            // Draw the image on the canvas
            const aspectRatio = img.width / img.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.width / aspectRatio;
    
            // Center the image on the canvas
            let drawX = 0;
            let drawY = (canvas.height - drawHeight) / 2;





            if(type=="die-cut"){
                drawImageOnCanvas(context, img, drawX, drawY, drawWidth, drawHeight, radius);
                // Draw a circle at each colored pixel
                const imageData = context.getImageData(drawX, drawY, drawWidth, drawHeight);
                for (let i = 0; i < imageData.data.length; i += 4) {
                // Check if the pixel is colored
                if (imageData.data[i + 3] === 255) {
                    const x = (i / 4) % drawWidth;
                    const y = Math.floor(i / 4 / drawWidth);
        
                    // Draw a circle at the colored pixel
                    context.beginPath();
                    context.arc(drawX + x, drawY + y, radius, 0, 2 * Math.PI);
                    context.fillStyle = '#ffffffaa'; // Change the color if needed
                    context.fill();
                    context.closePath();
                }
                }
                drawImageOnCanvas(context, img, drawX, drawY, drawWidth, drawHeight, radius);
            }else if(type=="circle"){
                context.beginPath();
                context.arc(canvas.width / 2,canvas.height / 2, canvas.width/2, 0, 2 * Math.PI);
                context.fillStyle = '#ffffffaa'; // Change the color if needed
                context.fill();
                context.closePath();
                drawImageOnCanvas(context, img, drawX, drawY, drawWidth, drawHeight,radius);
            }





          };
    
          img.onerror = (error) => {
            console.error("Error loading image:", error);
          };
        }
      }
    }, [image, canvasRef.current,radius]);
    
    


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
  
      if (file) {
        const reader = new FileReader();
  
        reader.onloadend = () => {
          const imageDataUrl = reader.result as string;
          setImage(imageDataUrl);
        };
  
        reader.readAsDataURL(file);
      }
    };
  return (
        <div className="flex-1 bg-secondary overflow-hidden relative border rounded-2xl group flex justify-center items-center">
                        <input type="range" min="0" max="100" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} />
                          <input className='hidden' type="file" accept='image/*' id='upload' onChange={handleImageChange} />
                  {
                        !image &&
                        <Label htmlFor='upload' className='cursor-pointer px-8 flex gap-2 border shadow py-4 text-lg bg-white rounded-xl'>
                          Upload sticker
                            <Upload/>
                        </Label>
                  }
                {(image &&
                    <>
                    <Label htmlFor='upload' className="absolute cursor-pointer h-12 w-12 bg-white border flex items-center justify-center top-[50%] hover:scale-105 -left-12 rounded-full group-hover:left-4 scale-100 duration-200 ease-in-out">
                    <Upload/>
                    </Label>
                  <canvas
                    width={500} // Set the desired canvas width
                    height={500} // Set the desired canvas height
                    className='p-4 w-[500px] h-[500px] drop-shadow-xl'
                    ref={canvasRef}
                  ></canvas>
                    </>
                )}
            </div>
  )
}

export default Canvas