import { StaticImport } from "next/dist/shared/lib/get-img-props"
import create from "zustand"

export type SheetItem = {
    fileType : "upload" | "url",
    file?: File,
    quantity: number  ,
    image: string | StaticImport,
    type: string,
    size: number,
    color?: string,
    radius?: number,
    id: string,
    

}

export type UploadType= {
    file:File,
    image: string | StaticImport
}

export type State = {
    uploads: UploadType[]
    setUpload: (uploads: UploadType[]) => void,

    sheet : SheetItem[]
    setSheet: (sheet:SheetItem[]) => void,
    update: (id:string,props:  SheetItem) => void

    // selectStartX : number,
    // setSelectStartX : (selectStartX: number) => void,
    // selectStartY : number,
    // setSelectStartY : (selectStartY: number) => void,
    // selectEndX : number,
    // setSelectEndX : (selectEndX: number) => void,
    // selectEndY : number,
    // setSeletedEndY : (selectEndY: number) => void,

    selectedSticker : string
    setSelectedSticker: (id:string) => void,
    // selected : string[]
}

export const useSheet = create<State>((set) => ({
    uploads:[],
    setUpload: (uploads: UploadType[]) => set({ uploads }),

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
    selectedSticker : "",
    setSelectedSticker: (id:string) => set({ selectedSticker: id }),
}))