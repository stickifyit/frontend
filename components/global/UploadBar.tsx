import React, { useEffect } from 'react'
import { Button } from '../ui/button';
import { Upload } from 'lucide-react';
import { UploadType, useSheet } from '@/store/customSheet';
import CustomSheetItemCard from './CustomSheetItemCard';
import { Card } from '../ui/card';
import Image from 'next/image';
import axios from '@/lib/axios';
import { BackendHost } from '@/constant/backend';

type Props = {}

function UploadBar({}: Props) {
    const {uploads,setUpload,process,sheet,setSheet} = useSheet()
    const inputRef = React.useRef<HTMLInputElement | null>(null)

    const handleChange = async (e: any) => {
      try {
        const filesArray: File[] = Array.from(e.target.files) as File[];
        const files = filesArray.filter((file: any) => file instanceof File);
    
        const finalFiles: UploadType[] = await Promise.all(
          files.map(async (file: File) => {
            const formData = new FormData();
            formData.append("image", file);
    
            // Use fetch to send the form data to the server
            const response = await fetch(BackendHost+"/images/upload", {
              method: "POST",
              body: formData,
            });
    
            const url:{name:string} = await response.json(); // Assuming the server returns a URL as text
            return { file, image: 'https://storage.googleapis.com/stickify-storage/'+url.name };
          })
        );
    
        setUpload([...uploads, ...finalFiles]);
      } catch (error) {
        console.error("Error during file upload:", error);
        // Handle the error as needed
      }
    };
  
    const handleAdd = (item:UploadType) => {
        setSheet([...sheet,{
            fileType:"url",
            type:"die cut",
            size:5,
            color:"white",
            radius:0,
            id:Math.random() + " x " + Math.random(),
            quantity:1,
            image:item.image,
        }])
    }
    const handelButtonClick = () => {
        if(!inputRef.current) return
        inputRef?.current?.click()
    }
    useEffect(()=>{
      console.log(process) 
    },[process])
  return (
    <div className=" h-full overflow-auto flex-1 relative">
      <div className="p-3 flex mb-4 justify-between items-center text-xl mt-10 z-20 shadow-xl shadow-[#33333307] sticky top-0 bg-white border-b">
        <h2>Uploads</h2>
        <div>
          <input ref={inputRef} name='upload' id='upload' className='hidden' accept='image/*' multiple type="file" onChange={handleChange} />
          <Button onClick={handelButtonClick} variant="outline"><Upload size={20}/> upload</Button>
        </div>
      </div>
      <div>
        <div className="p-3 gap-2 grid grid-cols-2">
            {uploads.map((item, i) => (
                <Card onClick={()=>handleAdd(item)} key={item.image as string + i} className='p-2 w-ful h-fit overflow-hidden'>
                    <Image className='aspect-square object-contain' width={200} height={200} src={item.image} alt=''/>
                </Card>
            ))}
        </div>
      </div>
    </div>
  )
}

export default UploadBar