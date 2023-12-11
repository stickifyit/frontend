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
    addToCart: (newCartItem: CartItem) => set((state) => {
        // Check if the item already exists in the cart
        const existingItemIndex = state.cart.findIndex((item) => {
            if (
                item.data.type === "custom sheet" &&
                newCartItem.data.type === "custom sheet"
            ) {
                // Check if it's a custom sheet and has the same id
                return item.data.data[0].id === newCartItem.data.data[0].id;
            } else if (
                item.data.type === "sticker sheet" &&
                newCartItem.data.type === "sticker sheet"
            ) {
                // Check if it's a sticker sheet and has the same sheetId
                return item.data.data.sheetId === newCartItem.data.data.sheetId;
            } else if (
                item.data.type === "t-shirt" &&
                newCartItem.data.type === "t-shirt"
            ) {
                // Check if it's a t-shirt and has the same image and type
                return (
                    item.data.data.image === newCartItem.data.data.image &&
                    item.data.data.type === newCartItem.data.data.type
                );
            } else if (
                item.data.type === "cup" &&
                newCartItem.data.type === "cup"
            ) {
                // Check if it's a cup and has the same image and type
                return (
                    item.data.data.image === newCartItem.data.data.image &&
                    item.data.data.type === newCartItem.data.data.type
                );
            } else {
                // If the types don't match, consider them different items
                return false;
            }
        });

        if (existingItemIndex !== -1) {
            // If the item exists, update the quantity
            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex].quantity += newCartItem.quantity;

            return { cart: updatedCart };
        } else {
            // If the item doesn't exist, add it to the cart
            return { cart: [newCartItem, ...state.cart] };
        }
    }),
}))