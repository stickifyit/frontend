import { drawEllipse } from "./utils";
import tshirtImageUrl from "@/public/custom-t-shirts/left-chest-canvas.png"
export function drawImageWithMargin(  
    context: CanvasRenderingContext2D,
    img: HTMLImageElement,
    drawX: number,
    drawY: number,
    drawWidth: number,
    drawHeight: number,
    margin: number,
    quality: number
    ) {
    const aspectRatio = img.width / img.height;
    const newWidth = drawWidth - 2 * (margin*quality);
    const newHeight = newWidth / aspectRatio;

    const newX = drawX + (drawWidth - newWidth) / 2;
    const newY = drawY + (drawHeight - newHeight) / 2;

    context.drawImage(img, newX, newY, newWidth, newHeight);
}




// die cut sticker product
export const dieCut_Behive = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  drawX: number,
  drawY: number,
  drawWidth: number,
  drawHeight: number,
  radius: number,
  quality: number = 1
) => {
  drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight, radius,quality);
  // Draw a circle at each colored pixel
  const imageData = context.getImageData(drawX, drawY, drawWidth, drawHeight);
  for (let i = 0; i < imageData.data.length; i += 4 * 2) {
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
  drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight, radius,quality);
};


// circle sticker product

export const circle_Behive = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  drawX: number,
  drawY: number,
  drawWidth: number,
  drawHeight: number,
  radius: number,
  canvas: HTMLCanvasElement,
  quality: number = 1
)=>{
    context.beginPath();
    context.arc(canvas.width / 2,canvas.height / 2, canvas.width/2, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight, radius,quality);

}

// square sticker product

export const square_Behive = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  drawX: number,
  drawY: number,
  drawWidth: number,
  drawHeight: number,
  radius: number,
  canvas: HTMLCanvasElement,
  quality: number = 1
)=>{
    context.rect(0, 0, canvas.width, canvas.height);
    context.fill();
    context.closePath();
    drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight, radius,quality);

}

// rect sticker product

export const rect_Behive = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  drawX: number,
  drawY: number,
  drawWidth: number,
  drawHeight: number,
  radius: number,
  canvas: HTMLCanvasElement,
  quality: number = 1
)=>{
    context.rect(0, 0, canvas.width, canvas.height);
    context.fill();
    context.closePath();
    drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight, radius,quality);

}

// bumper sticker product


export const bumper_Behive = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  drawX: number,
  drawY: number,
  drawWidth: number,
  drawHeight: number,
  radius: number,
  canvas: HTMLCanvasElement,
  quality: number = 1
)=>{
    context.rect(0, 0, canvas.width, canvas.height);
    context.fill();
    context.closePath();
    drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight, radius,quality);

}


// oval sticker product

export const oval_Behive = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  drawX: number,
  drawY: number,
  drawWidth: number,
  drawHeight: number,
  radius: number,
  canvas: HTMLCanvasElement,
  quality: number = 1
)=>{
    drawEllipse(context, 0,0, canvas.width,canvas.height);
    drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight, radius,quality);

}


// rounded stickers product

export const rounded_Behive = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  drawX: number,
  drawY: number,
  drawWidth: number,
  drawHeight: number,
  radius: number,
  canvas: HTMLCanvasElement,
  quality: number = 1
)=>{
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
    drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight, radius,quality);

}


// left-chest t-shirt product

export const leftChest_Behive = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  drawX: number,
  drawY: number,
  drawWidth: number,
  drawHeight: number,
  radius: number,
  canvas: HTMLCanvasElement,
  quality: number = 1
) =>{
    const t_shirtImage = new Image();
    t_shirtImage.src = "/custom-t-shirts/left-chest-canvas.png";
    t_shirtImage.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(t_shirtImage, 0, 0, canvas.width, canvas.height);
        context.drawImage(image,canvas.width*6/10, canvas.height*2.6/10, canvas.width/10, canvas.height/10)
        // drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight, radius,quality);
        // context.fillRect();
    };
}


// center-chest t-shirt product

export const centerChest_Behive = (
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  drawX: number,
  drawY: number,
  drawWidth: number,
  drawHeight: number,
  radius: number,
  canvas: HTMLCanvasElement,
  quality: number = 1
) =>{
    const t_shirtImage = new Image();
    t_shirtImage.src = "/custom-t-shirts/left-chest-canvas.png";
    t_shirtImage.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(t_shirtImage, 0, 0, canvas.width, canvas.height);
        context.drawImage(image,canvas.width*4/10, canvas.height*2.6/10, canvas.width/5, canvas.height/5)
        // drawImageWithMargin(context, image, drawX, drawY, drawWidth, drawHeight, radius,quality);
        // context.fillRect();
    };
}