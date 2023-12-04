import create from "zustand";



export type CustomSheetTypeItem = {
    type:"custom sheet",
    data:{
        x: number,
        y: number,
        image: string,
        type: string,
        size: number,
        width?: number,
        height?: number,
        color?: string,
        radius?: number
        id: string
    }[]
}

export type SheetTypeItem ={
    type:"sticker sheet",
    data:{
        sheetId : string
    }
}

export type TShirtTypeItem ={
    type:"t-shirt",
    data:{
        image : string
        type:"center-chest" | "left-chest" | "back-side"
    }
}
export type CupTypeItem ={
    type:"cup",
    data:{
        image : string
        type: "cup"
    }
}

export type CartItem ={
    quantity: number,
    image: string|[string],
    data: CustomSheetTypeItem | SheetTypeItem | TShirtTypeItem | CupTypeItem
}

type State = {
    cart:CartItem[],
    setCart: (cart:CartItem[]) => void,
    addToCart: (cart:CartItem) => void,
}

export const useCart = create<State>((set) => ({
    cart: [],
    setCart: (cart:CartItem[]) => set({ cart }),
    addToCart: (cart:CartItem) => set((state) => {
        return ({ cart: [ cart ,...state.cart] })
    }),
}))