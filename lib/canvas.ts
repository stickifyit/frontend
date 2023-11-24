import axios from "./axios";
import { drawEllipse } from "./utils";
import socket from "./socket";

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

function drawImageWithMargin(  
    context: CanvasRenderingContext2D,
    img: HTMLImageElement,
    drawX: number,
    drawY: number,
    drawWidth: number,
    drawHeight: number,
    margin: number) {
    const aspectRatio = img.width / img.height;
    const newWidth = drawWidth - 2 * margin;
    const newHeight = newWidth / aspectRatio;

    const newX = drawX + (drawWidth - newWidth) / 2;
    const newY = drawY + (drawHeight - newHeight) / 2;

    context.drawImage(img, newX, newY, newWidth, newHeight);
}

  

export const handleDraw = async (
    file: File | null,
    type: string,
    r: number,
    color: string,
    quality: number,
): Promise<HTMLCanvasElement> => {

    if (!file) {
        console.error('No file selected.');
        return Promise.reject('No file selected.');
    }

    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = URL.createObjectURL(file);

        const radius = r * quality;

        if (!context) {
            reject('Canvas context not available.');
            return;
        }

        image.onload = () => {
      canvas.width = 600 * quality;
        canvas.height = ((type=="rect"|| type=="oval")? 400: type=="bumper"? 200 : 600) * quality;



            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
    
            // Draw the image on the canvas
            const aspectRatio = image.width / image.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.width / aspectRatio;
    
            // Center the image on the canvas
            let drawX = 0;
            let drawY = (canvas.height - drawHeight) / 2;

            context.fillStyle = color; // Change the color if needed
            if(type=="die-cut"){
                drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight, radius);
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
                    context.fill();
                    context.closePath();
                }
                }
                drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight, radius);
            }else if(type=="circle"){
                context.arc(canvas.width / 2,canvas.height / 2, canvas.width/2, 0, 2 * Math.PI);
                context.fillStyle = color; // Change the color if needed
                context.fill();
                context.closePath();
                drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight,radius);
            }else if(type=="square"){
                context.rect(0, 0, canvas.width, canvas.height);
                context.fill();
                context.closePath();
                drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight,radius);
            }else if(type=="rect"){
                context.rect(0, 0, canvas.width, canvas.height);
                context.fill();
                context.closePath();
                drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight,radius);
            }else if(type=="bumper"){
                context.rect(0, 0, canvas.width, canvas.height);
                context.fill();
                context.closePath();
                drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight,radius);
            }else if(type=="oval"){
                drawEllipse(context, 0,0, canvas.width,canvas.height);
                drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight,radius);
            }else if(type=="rounded"){
                const m = canvas.width/6


                context.beginPath();
                context.arc(m,m, m, 0, 2 * Math.PI);
                context.fill();
                context.closePath();

                context.beginPath();
                context.arc(canvas.width-m,m, m, 0, 2 * Math.PI);
                context.fill();
                context.closePath();

                context.beginPath();
                context.arc(canvas.width-m,canvas.height-m, m, 0, 2 * Math.PI);
                context.fill();
                context.closePath();

                context.beginPath();
                context.arc(m,canvas.height-m, m, 0, 2 * Math.PI);
                context.fill();
                context.closePath();

                context.rect(m, m, canvas.width-m*2, canvas.height-m*2);
                context.rect(0,m,m,canvas.height-m*2);
                context.rect(m,0,canvas.width-m*2,m);
                context.rect(canvas.width-m, m, canvas.width,canvas.height-m*2);
                context.rect(m,canvas.height-m,canvas.width-m*2,m);

                context.fill();
                context.closePath();
                drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight,radius);
            }
            resolve(canvas);
        };

        image.onerror = () => {
            reject('Error loading the image.');
        };

    });
};
 