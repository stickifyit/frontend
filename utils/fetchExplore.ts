import axios from "@/lib/axios";

export interface PackItem {
    _id: string;
    name: string;
    imageURL: string;
    keywords: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export const fetchPacks = async () => {
    return await axios<PackItem[]>("/packs/all").then((res) => {
        return res.data;
    })
};

export interface Sticker {
  _id: string;
  name: string;
  imageURL: string;
  keywords: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const fetchStickers = async (pack: string) => {
    return await axios.post<Sticker[]>("/sticker/get-by-pack", {
        pack
    }).then((res) => {
        return res.data;
    })
}





