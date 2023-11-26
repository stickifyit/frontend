 import axios from "./axios";
import { drawEllipse } from "./utils";
import socket from "./socket";
import { useParams } from "next/navigation";
import { backSide_Behive, bumper_Behive, centerChest_Behive, circle_Behive, dieCut_Behive, leftChest_Behive, oval_Behive, rect_Behive, rounded_Behive, square_Behive } from "./canvasProductBehive";
import { Contact } from "lucide-react";

export const handleUpload = async (file:File|null) => {
    if (!file) {
      console.error('No file selected.');
      return;
    }

    // Use FormData to send the file to the server
    const formData = new FormData();
    formData.append('image', file);

    // Use fetch to send the form data to the server
    await fetch('http://localhost:3001/images/upload', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('Image uploaded successfully:', data);
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
};

  

export const handleDraw = async (
    params:{service:string,product:string},
    image_: string,
    type: string,
    r: number,
    color: string,
    quality: number,
): Promise<HTMLCanvasElement> => {

    if (!image_) {
        console.error('No file selected.');
        return Promise.reject('No file selected.');
    }

    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
            reject('Canvas context not available.');
            return;
        }


        const image = new Image();
        image.src = image_;



        image.onload = () => {
        canvas.width = 600 * quality;
        canvas.height = ((type=="rect"|| type=="oval")? 400: type=="bumper"? 200 : 600) * quality;
        const radius = r ;



    
            // Draw the image on the canvas
            const aspectRatio = image.width / image.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.width / aspectRatio;
    
            // Center the image on the canvas
            let drawX = 0;
            let drawY = (canvas.height - drawHeight) / 2;

            context.fillStyle = color; // Change the color if needed

            if(params.service == "stickers"){
                context.clearRect(0, 0, canvas.width, canvas.height);

                if(type=="die-cut"){
                  dieCut_Behive(context,image,drawX,drawY,drawWidth,drawHeight,radius,quality)
                }else if(type=="circle"){
                  circle_Behive(context,image,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                }else if(type=="square"){
                  square_Behive(context,image,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                }else if(type=="rect"){
                  rect_Behive(context,image,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                }else if(type=="bumper"){
                  bumper_Behive(context,image,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                }else if(type=="oval"){
                  oval_Behive(context,image,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                }else if(type=="rounded"){
                  rounded_Behive(context,image,drawX,drawY,drawWidth,drawHeight,radius,canvas,quality)
                }

            }else if(params.service == "t-shirts"){
                if (type == "left-chest") {
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                } else if(type == "center-chest") {
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                } else if(type == "back-side") {
                    context.drawImage(image, 0, 0, canvas.width, canvas.height);
                }
            }
            resolve(canvas);
        };

        image.onerror = () => {
            reject('Error loading the image.');
        };

    });
};
