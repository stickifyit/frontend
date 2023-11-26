// bumper , circle , die-cut , oval , rect , rounded , sheets , square
import bumper from '@/public/custom-stickers/bumper.png'
import circle from '@/public/custom-stickers/circle.png'
import dieCut from '@/public/custom-stickers/die cut.png'
import oval from '@/public/custom-stickers/oval.png'
import rect from '@/public/custom-stickers/rect.png'
import rounded from '@/public/custom-stickers/rounded.png'
import square from '@/public/custom-stickers/square.png'

// import t-shirts images
import leftChest from '@/public/custom-t-shirts/left-chest.png'
import centerChest from '@/public/custom-t-shirts/center chest.png'
import backSide from '@/public/custom-t-shirts/back side.png'
import { StaticImageData } from 'next/image'




export interface Services {
    stickers: Service;
    "t-shirts": Service;
}
export interface Product {
    name: string;
    img: StaticImageData;
    href: string;
    aspect: string;
    sizes: string[];
    quantities: number[];
}

export interface Service {
    [key: string]: Product;
}


const qs = {
    square:[200,91,50,32,18,15,10,8,8,2],
    rect:[300,140,75,48,30,24,14,12,3],
    bumper:[140,75,48,30,24,14,12,3],
    static:[1,1,1,1,1]
}
const sizes = {
    square:[
        "2x2","3x3","4x4","5x5","6x6","7x7","8x8","9x9","10x10","20x20"
    ],
    rect:[
        "2x1.33","3x2","4x2.66","5x3.33","6x4","7x4.66","8x5.33","10x6.66","20x13.33"
    ],
    bumper:[
        "3x1","4x1.3","5x1.6","6x2","7x2.3","8x2.6","10x3.3","20x6.6"
    ],
    tShirts:[
        "sm","md","lg"
    ]
}

const stickers = {
    "die-cut": {
        name: "die-cut",
        img: dieCut, // Switched to using 'img'
        href: "/product/stickers/die-cut",
        aspect: "square",
        sizes: sizes.square,
        quantities: qs.square
    },
    "circle": {
        name: "circle",
        img: circle, // Switched to using 'img'
        href: "/product/stickers/circle",
        aspect: "square",
        sizes: sizes.square,
        quantities: qs.square
    },
    "oval": {
        name: "oval",
        img: oval, // Switched to using 'img'
        href: "/product/stickers/oval",
        aspect: "rect",
        sizes: sizes.rect,
        quantities: qs.rect
    },
    "rect": {
        name: "rect",
        img: rect, // Switched to using 'img'
        href: "/product/stickers/rect",
        aspect: "rect",
        sizes: sizes.rect,
        quantities: qs.rect
    },
    "rounded": {
        name: "rounded",
        img: rounded, // Switched to using 'img'
        href: "/product/stickers/rounded",
        aspect: "square",
        sizes: sizes.square,
        quantities: qs.square
    },
    "square": {
        name: "square",
        img: square, // Switched to using 'img'
        href: "/product/stickers/square",
        aspect: "square",
        sizes: sizes.square,
        quantities: qs.square
    },
    "bumper": {
        name: "bumper",
        img: bumper, // Switched to using 'img'
        href: "/product/stickers/bumper",
        aspect: "bumper",
        sizes: sizes.bumper,
        quantities: qs.bumper
    },
}
const tShirts = {
    "left-chest": {
        name: "left-chest",
        img: leftChest, // Switched to using 'img'
        href: "/product/t-shirts/left-chest",
        aspect: "square",
        sizes : sizes.tShirts,
        quantities: qs.static
    },
    "center-chest": {
        name: "center-chest",
        img: centerChest, // Switched to using 'img'
        href: "/product/t-shirts/center-chest",
        aspect: "square",
        sizes : sizes.tShirts,
        quantities: qs.static
    },
    "back-side": {
        name: "back-side",
        img: backSide, // Switched to using 'img'
        href: "/product/t-shirts/back-side",
        aspect: "square",
        sizes : sizes.tShirts,
        quantities: qs.static
    },
}


const services: Services = {
    stickers,
    "t-shirts": tShirts
}


export const getProductInfo = (service :string, product: string) => {
    const selectedService = services[service as keyof Services];

    if (!selectedService) {
        return null;
    }

    const selectedProduct = selectedService[product];

    if (!selectedProduct) {
        return null;
    }

    return selectedProduct
};
export const getProductsByService = (serviceName:string) => {
    const selectedService = services[serviceName as keyof Services];

    if (!selectedService) {
        return null; // Service not found
    }

    const productList = Object.values(selectedService);
    return productList;
};