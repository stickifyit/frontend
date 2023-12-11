import axios from "@/lib/axios";
export interface Sticker {
    _id: string;
    name: string;
    description: string;
    snapshot: string;
    __v: number;
}



export const fetchStickerSheets = async () => axios.get<Sticker[]>("/sticker-sheet/all").then((res) => res.data)
export const getStickerSheet = async (name: string) => axios.get<Sticker>(`/sticker-sheet/${name}`).then((res) => 
{
    console.log(res.data)
    console.log(name)
    return res.data
}
)