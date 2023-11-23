import create from "zustand";

export type CartItem ={
    quantity: number,
    file: File,
    type: string,
    size: string
    color: string
    radius: number,
}

type State = {
    cart:CartItem[],
    setCart: (cart:CartItem[]) => void,
    addToCart: (cart:CartItem) => void,
}

export const useCart = create<State>((set) => ({
    cart: [],
    setCart: (cart:CartItem[]) => set({ cart }),
    addToCart: (cart:CartItem) => set((state) => ({ cart: [...state.cart, cart] })),
}))