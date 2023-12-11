import { Sticker, fetchPacks, fetchStickers } from "@/utils/fetchExplore";
import React from "react";
import { useQuery } from "react-query";
import { Card } from "../ui/card";
import { ArrowLeft, Link, Search } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSheet } from "@/store/customSheet";

type Props = {};

export default function ExploreBar({}: Props) {
    const {data:packs} = useQuery("packs", fetchPacks)
    const [selectedPack, setSelectedPack] = React.useState<string | null>(null)
  return (
    <div className=" h-full overflow-auto flex-1 relative">
      <div className="p-3 flex justify-between items-center text-xl mt-5 z-20  bg-white ">
        <h2 className="">Explore</h2>
      </div>
      <div className="p-3 flex gap-2 mb-4 justify-between items-center text-xl  z-20 shadow-xl shadow-[#33333307] sticky -top-1 bg-white border-b">
           
            {
                selectedPack !== null &&
                <Button onClick={()=>{setSelectedPack(null)}}><ArrowLeft/></Button>
            }
            <div className='relative h-fit ml-auto w-full flex gap-2'>
                <Search size={18} className='absolute top-1/2 left-3 -translate-y-1/2'/>
                <Input placeholder='Search sticker' className='w-full flex-1 pl-10'/>
            </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-2 gap-2 p-2">
            {
                selectedPack === null &&
                    packs
                    // ?.map(i=>new Array(10).fill(i)).flat(1)
                    ?.map((item, index) => (
                        <div key={index}>
                            <Card onClick={()=>{setSelectedPack(item._id)}} className='w-full rounded-xl cursor-pointer overflow-hidden relative'>
                                <Image width={200} height={200} src={"https://storage.googleapis.com/stickify-storage/"+item.imageURL} alt="" className='aspect-square object-cover p-4 w-full'/>
                                <div className='p-3'>
                                    <h3 className='text-center'>{item.name}</h3>
                                </div>
                            </Card>
                        </div>
                    ))
            }
      </div>
        {
            selectedPack !== null &&
                    <Stickers id={selectedPack}/>
        }
      </div>
  );
}

const Stickers = ({id}:{id:string})=>{
    const {data:stickers} = useQuery("fetchStickers",()=>fetchStickers(id as string))
    const {setSheet,sheet}=useSheet()
    const add = (item:Sticker)=>{
        setSheet([
            ...sheet,
            {
                id: item._id +" x "+ Math.random(),
                quantity: 1,
                image:"https://storage.googleapis.com/stickify-storage/"+item.imageURL,
                size: 3,
                type: "die cut",
                fileType:"url"

            },
        ])
    }
    return(
    <div className='grid grid-cols-3 w-full gap-2 p-2'>
        {
            stickers?.map((item, index) => (
                    <Card onClick={()=>add(item)} key={item._id} className={'w-full rounded-xl relative cursor-pointer overflow-hidden duration-150  '}>
                        <Image src={"https://storage.googleapis.com/stickify-storage/"+item.imageURL} alt="" width={200} height={200} className='aspect-square drop-shadow-lg w-full  object-cover p-2'/>
                        <div className='p-3 text-center'>
                            <h3 className='text-center text-sm '>{item.name}</h3>
                        </div>
                    </Card>
            ))
        }
    </div>
    )
}
