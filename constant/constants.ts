import Logo from "@/public/logo/logo.png"


import Label from "@/public/heroLinks/leble.png"
import Stickers from "@/public/heroLinks/stickers.png"
import T_Shirt from "@/public/heroLinks/t-shirt.png"
import Cup from "@/public/heroLinks/cup.png"

// bumper , circle , die-cut , oval , rect , rounded , sheets , square
import bumper from '@/public/custom-stickers/bumper.png'
import circle from '@/public/custom-stickers/circle.png'
import dieCut from '@/public/custom-stickers/die cut.png'
import oval from '@/public/custom-stickers/oval.png'
import rect from '@/public/custom-stickers/rect.png'
import rounded from '@/public/custom-stickers/rounded.png'
import sheets from '@/public/custom-stickers/sheets.png'
import square from '@/public/custom-stickers/square.png'
import { CustomStickersImages } from "@/types/types"

export const LOGO = Logo
export const NavbarHight = "100px"

export const HeroLinksImages = { 
    Label,
    Stickers,
    T_Shirt,
    Cup
}

export const customStickersImages: CustomStickersImages = {
    bumper,
    circle,
    dieCut,
    oval,
    rect,
    rounded,
    sheets,
    square
}