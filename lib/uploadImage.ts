import { productHeroImages } from "@/constant/productsHeroImages";
import axios from "./axios";

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

  

export const handleUploadSticker = async (
    file: File | null,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    type: string,
    r: number,
    color:string
    ) => {

    setLoading(true)  
    if (!file) {
      console.error('No file selected.');
      return;
    }
  
    // Create a canvas and draw the image with a red background
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const image = new Image();
    image.src = URL.createObjectURL(file);
    // config
    const quality = 2;
    const radius = r * quality;

    if(!context) return setLoading(false)
  
    image.onload = async () => {
        canvas.width = 600 * quality;
        canvas.height = (type=="rect"? 400: type=="bumper"? 200 : 600) * quality;



            // Clear the canvas
            context.clearRect(0, 0, canvas.width, canvas.height);
    
            // Draw the image on the canvas
            const aspectRatio = image.width / image.height;
            let drawWidth = canvas.width;
            let drawHeight = canvas.width / aspectRatio;
    
            // Center the image on the canvas
            let drawX = 0;
            let drawY = (canvas.height - drawHeight) / 2;

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
                    context.fillStyle = color; // Change the color if needed
                    context.fill();
                    context.closePath();
                }
                }
                drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight, radius);
            }else if(type=="circle"){
                context.beginPath();
                context.arc(canvas.width / 2,canvas.height / 2, canvas.width/2, 0, 2 * Math.PI);
                context.fillStyle = color; // Change the color if needed
                context.fill();
                context.closePath();
                drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight,radius);
            }else if(type=="square"){
                context.fillStyle = color; // Change the color if needed
                context.rect(0, 0, canvas.width, canvas.height);
                context.fill();
                context.closePath();
                drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight,radius);
            }else if(type=="rect"){
                context.fillStyle = color; // Change the color if needed
                context.rect(0, 0, canvas.width, canvas.height);
                context.fill();
                context.closePath();
                drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight,radius);
            }else if(type=="bumper"){
                context.fillStyle = color; // Change the color if needed
                context.rect(0, 0, canvas.width, canvas.height);
                context.fill();
                context.closePath();
                drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight,radius);
            }








  
  
      // Convert the canvas content to a new image
      canvas.toBlob(async (blob) => {
        if (blob) {
          // Use FormData to send the new image to the server with a filename
          const formData = new FormData();
          formData.append('image', blob, 'your_desired_filename.png');
          

  
          // Use fetch to send the form data to the server
          await fetch('http://localhost:3001/images/upload', {
            method: 'POST',
            body: formData,
          })
            .then(async(data) => {
              console.log('Image uploaded successfully:');
              const name = await data.json()
              console.log(name.name);
              setLoading(true)
              axios.post("/orders/create",{
                  "customerName": "John Doe",
                  "serviceType": "sticker",
                  "quantity": 100,
                  "sticker": {
                    "design": name.name,
                    "type": "die cut",
                    "image": "sticker-image-url",
                    "size": "2x2"
                  }
              }).then((res)=>{
                console.log(res.data)
              }).catch((e)=>{
                console.log(e)
              }).finally(()=>{
                setLoading(false)
              })
            })
            .catch((error) => {
              console.error('Error uploading image:', error);
            })
            .finally(() => {
              setLoading(false)
            })
        } else {
          console.error('Error creating blob from canvas.');
          setLoading(false)
        }
      }, 'image/png');
    };
  };
  