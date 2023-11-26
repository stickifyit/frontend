import create from "zustand"

export type SheetItem = {
    quantity: number,
    image: string,
    type: string,
    size: number,
    color?: string,
    radius?: number,
    id: string,
}



export type State = {
    sheet : SheetItem[]
    setSheet: (sheet:SheetItem[]) => void,
    update: (id:string,props:  SheetItem) => void
}

export const useSheet = create<State>((set) => ({
    sheet : [{
        quantity: 3,
        image: "http://localhost:3000/_next/image?url=https%3A%2F%2Fstorage.googleapis.com%2Fstickify-storage%2Fstickers%2Fva9zm4ig42a-mvtckomg5f-tkx1ygz5rwe.png&w=256&q=75",
        type: "die cut",
        size: 5,
        color: "",
        radius: 0,
        id: "qwerty123",
    }],
    setSheet: (sheet:SheetItem[]) => set({ sheet }),
    // update by id
    update: (id:string,props: SheetItem) => {
        set((state) => {
            const item = state.sheet.find(item => item.id === id);
            if (item) {
                item.quantity = props.quantity?? item.quantity
                item.image = props.image ?? item.image
                item.type = props.type ?? item.type
                item.size = props.size ?? item.size
                item.color = props.color ?? item.color
                item.radius = props.radius ?? item.radius
                return ({ sheet: [...state.sheet] })
            }else{
                return ({ sheet: [ props ,...state.sheet] })
            }
        })
    }
}))