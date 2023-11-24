import create from "zustand";

export type CartItem ={
    quantity: number,
    file: File,
    type: string,
    size: string
    color: string
    radius: number,
    canvas: HTMLCanvasElement,
    service: string
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
        const item = state.cart.find(item => item.file.name === cart.file.name && item.type === cart.type && item.size === cart.size && item.color === cart.color && item.radius === cart.radius);
        if (item) {
            item.quantity += cart.quantity;
            return ({ cart: [...state.cart] });
        }else{
            return ({ cart: [ cart ,...state.cart] })
        }
    }),
}))