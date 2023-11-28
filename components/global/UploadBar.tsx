import React from 'react'
import { Button } from '../ui/button';
import { Upload } from 'lucide-react';
import { UploadType, useSheet } from '@/store/customSheet';
import CustomSheetItemCard from './CustomSheetItemCard';
import { Card } from '../ui/card';
import Image from 'next/image';

type Props = {}

function UploadBar({}: Props) {
    const {uploads,setUpload,sheet,setSheet} = useSheet()
    const inputRef = React.useRef<HTMLInputElement | null>(null)
    const handleChange = (e:any) => {
        // upload the file to setUploads
        // const files:File[]=[]
        // e.target.files.forEach((file:File) => {
        //     files.push(file)
        // })
        // setUpload(files)

        const filesArray: File[] = Array.from(e.target.files) as File[];
        const files = filesArray.filter((file: any) => file instanceof File);
        const filesFinal = files.map((file: File) => {
            return {
                file: file,
                image: URL.createObjectURL(file),
            };
        });
        
        setUpload([...uploads, ...filesFinal] as UploadType[]);
        
    }
    const handleAdd = (item:File) => {
        setSheet([...sheet,{
            fileType:"upload",
            type:"die cut",
            size:5,
            color:"white",
            radius:0,
            id:Math.random() + " x " + Math.random(),
            quantity:1,
            image:URL.createObjectURL(item),
            file:item
        }])
    }
    const handelButtonClick = () => {
        if(!inputRef.current) return
        inputRef?.current?.click()
    }
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
                <Card onClick={()=>handleAdd(item.file)} key={item.file.name + i} className='p-2 w-ful h-fit overflow-hidden'>
                    <Image className='aspect-square object-contain' width={200} height={200} src={item.image} alt=''/>
                </Card>
            ))}
        </div>
      </div>
    </div>
  )
}

export default UploadBar