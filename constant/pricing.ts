export const sheetPricing = [
    25,50,70,90,110,130
]
export const tShirtPricing = [
    60,120,170,220,270,320
]
export const cupPricing = [
    60,120,170,220,270,320
]

export const  getPriceByQuantity = (quantity: number, type:string) => {
    if(type === "stickers"){
        return sheetPricing[quantity - 1]
    }else if(type === "t-shirts"){
        return tShirtPricing[quantity - 1]
    }else if(type === "cup"){
        return cupPricing[quantity - 1]
    }
}