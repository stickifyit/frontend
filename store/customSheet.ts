import { PlacedElement } from "@/lib/itemsSheetfitter"
import { StaticImport } from "next/dist/shared/lib/get-img-props"
import create from "zustand"

export type SheetItem = {
    fileType : "upload" | "url",
    file?: File,
    quantity: number  ,
    image: string | StaticImport,
    type: string,
    size: number,
    width?: number,
    height?: number,
    color?: string,
    radius?: number,
    id: string,
    

}

export type UploadType= {
    image: string | StaticImport
}

export type State = {
    uploads: UploadType[]
    setUpload: (uploads: UploadType[]) => void,

    sheet : SheetItem[]
    setSheet: (sheet:SheetItem[]) => void,
    update: (id:string,props:  SheetItem) => void

    sheetQuantity : number
    setSheetQuantity : (quantity: number) => void


    process : PlacedElement[]
    setProcess : (a:PlacedElement[]) => void;

    selected : string[]
    setSelected : (selected: string[]) => void
    selectItem : (id:string) => void
    toggleSelected : (id:string) => void
}

export const useSheet = create<State>((set) => ({


    uploads:[],
    setUpload: (uploads: UploadType[]) => set({ uploads }),

    sheetQuantity : 1,
    setSheetQuantity : (quantity: number) => set({ sheetQuantity : quantity }),

    sheet : [],
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
    },


    process : [],
    setProcess : (a:PlacedElement[]) => set({ process : a }),

    // seclection section

    
    selected : [],
    setSelected: (selected: string[]) => set({ selected }),
    selectItem: (id: string) => {
        set((state) => {
            const item = state.selected.find(item => item === id);
            if (item) {
                return ({ selected: state.selected.filter(item => item !== id) })
            }else{
                return ({ selected: [...state.selected, id] })
            }
        })
    },
    toggleSelected: (id: string) => {
        set((state) => {
            const item = state.selected.find(item => item === id);
            if (item) {
                return ({ selected: state.selected.filter(item => item !== id) })
            }else{
                return ({ selected: [...state.selected, id] })
            }
        })
    }

}))
