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





import heroBumper from "@/public/product pages images/bumper.png"
import heroCircle from "@/public/product pages images/circle.png"
import heroDieCut from "@/public/product pages images/die cut.png"
import heroOval from "@/public/product pages images/oval.png"
import heroRect from "@/public/product pages images/rect.png"
import heroRounded from "@/public/product pages images/rounded.png"
import heroSquare from "@/public/product pages images/square.png"






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
    hero: StaticImageData;
}

export interface Service {
    [key: string]: Product;
}


const qs = {
    square:[
        126, 54, 28, 15,
         12,  8,  6,  6
      ]
      ,
    rect:[
        189, 84, 40, 24,
         21, 12, 10,  8
      ]
      ,
    bumper:[
        378, 168, 84, 48,
         42,  24, 20, 18
      ],
    static:[1,1,1,1,1]
}
const sizes = {
    square:[
        "2x2","3x3","4x4","5x5","6x6","7x7","8x8","9x9"
    ],
    rect:[
        "2x1.33","3x2","4x2.66","5x3.33","6x4","7x4.66","8x5.33","9x6"
    ],
    bumper:[
        "3x1","4x1.3","5x1.6","6x2","7x2.3","8x2.6","9x3"
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
        quantities: qs.square,
        hero: heroDieCut
    },
    "circle": {
        name: "circle",
        img: circle, // Switched to using 'img'
        href: "/product/stickers/circle",
        aspect: "square",
        sizes: sizes.square,
        quantities: qs.square,
        hero: heroCircle
    },
    "oval": {
        name: "oval",
        img: oval, // Switched to using 'img'
        href: "/product/stickers/oval",
        aspect: "rect",
        sizes: sizes.rect,
        quantities: qs.rect,
        hero: heroOval
    },
    "rect": {
        name: "rect",
        img: rect, // Switched to using 'img'
        href: "/product/stickers/rect",
        aspect: "rect",
        sizes: sizes.rect,
        quantities: qs.rect,
        hero: heroRect
    },
    "rounded": {
        name: "rounded",
        img: rounded, // Switched to using 'img'
        href: "/product/stickers/rounded",
        aspect: "square",
        sizes: sizes.square,
        quantities: qs.square,
        hero: heroRounded
    },
    "square": {
        name: "square",
        img: square, // Switched to using 'img'
        href: "/product/stickers/square",
        aspect: "square",
        sizes: sizes.square,
        quantities: qs.square,
        hero: heroSquare
    },
    "bumper": {
        name: "bumper",
        img: bumper, // Switched to using 'img'
        href: "/product/stickers/bumper",
        aspect: "bumper",
        sizes: sizes.bumper,
        quantities: qs.bumper,
        hero: heroBumper
    },
}
const tShirts = {
    "left-chest": {
        name: "left-chest",
        img: leftChest, // Switched to using 'img'
        href: "/product/t-shirts/left-chest",
        aspect: "square",
        sizes : sizes.tShirts,
        quantities: qs.static,
        hero: leftChest
    },
    "center-chest": {
        name: "center-chest",
        img: centerChest, // Switched to using 'img'
        href: "/product/t-shirts/center-chest",
        aspect: "square",
        sizes : sizes.tShirts,
        quantities: qs.static,
        hero: centerChest
    },
    "back-side": {
        name: "back-side",
        img: backSide, // Switched to using 'img'
        href: "/product/t-shirts/back-side",
        aspect: "square",
        sizes : sizes.tShirts,
        quantities: qs.static,
        hero : backSide
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