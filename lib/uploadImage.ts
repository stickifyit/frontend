import { productHeroImages } from "@/constant/productsHeroImages";
import axios from "./axios";
import { drawEllipse } from "./utils";
import socket from "./socket";
import { handleDraw } from "./canvas";
import { BackendHost } from "@/constant/backend";

export const handleUpload = async (file: File | null) => {
  if (!file) {
    console.error("No file selected.");
    return;
  }

  // Use FormData to send the file to the server
  const formData = new FormData();
  formData.append("image", file);

  // Use fetch to send the form data to the server
  await fetch("BackendHost+/images/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Image uploaded successfully:", data);
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
    });
};

function drawImageWithMargin(
  context: CanvasRenderingContext2D,
  img: HTMLImageElement,
  drawX: number,
  drawY: number,
  drawWidth: number,
  drawHeight: number,
  margin: number
) {
  const aspectRatio = img.width / img.height;
  const newWidth = drawWidth - 2 * margin;
  const newHeight = newWidth / aspectRatio;

  const newX = drawX + (drawWidth - newWidth) / 2;
  const newY = drawY + (drawHeight - newHeight) / 2;

  context.drawImage(img, newX, newY, newWidth, newHeight);
}

export const handleUploadSticker = async (
  q: number,
  size: string,
  type: string,
  canvas: HTMLCanvasElement,
  service: string
) => {
  return new Promise((resolve, reject) => {
    // Convert the canvas content to a new image
    canvas.toBlob(async (blob) => {
      if (blob) {
        // Use FormData to send the new image to the server with a filename
        const formData = new FormData();
        formData.append("image", blob, "your_desired_filename.png");
        // Use fetch to send the form data to the server
        await fetch(BackendHost+"/images/upload", {
          method: "POST",
          body: formData,
        })
          .then(async (data) => {
            console.log("Image uploaded successfully:");
            const name = await data.json();
            console.log(name.name);
            if (service === "stickers") {
              axios
                .post("/orders/create", {
                  customerId: "3a1fd1dsf5asdf2a1dsf65asd2f1a3",
                  number: "0689978614",
                  serviceType: "sticker",
                  quantity: q,
                  address: "marrakech aitorir",
                  email: "N5yPm@example.com",
                  fullName: "John Doe",
                  sticker: {
                    design: name.name,
                    type: type,
                    size: size,
                  },
                })
                .then((res) => {
                  console.log(res.data);
                  resolve(res.data);
                })
                .catch((e) => {
                  console.log(e);
                });
            } else if (service === "t-shirts") {
              axios
                .post("/orders/create", {
                  customerId: "3a1fd1dsf5asdf2a1dsf65asd2f1a3",
                  number: "0689978614",
                  serviceType: "t-shirt",
                  quantity: q,
                  address: "marrakech aitorir",
                  email: "N5yPm@example.com",
                  fullName: "John Doe",
                  "t-shirt": {
                    design: name.name,
                    type: type,
                    size: size,
                  },
                })
                .then((res) => {
                  console.log(res.data);
                  resolve(res.data);
                })
                .catch((e) => {
                  console.log(e);
                  console.log("hnaya")
                });
            }
          })
          .catch((error) => {
            console.error("Error uploading image:", error);
          });
      } else {
        console.error("Error creating blob from canvas.");
      }
    }, "image/png");
  });
};
