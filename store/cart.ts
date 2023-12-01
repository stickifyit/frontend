import create from "zustand";



export type SheetTypeItem = {
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

export type CartItem ={
    quantity: number,
    image: string|[string],
    data: SheetTypeItem
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