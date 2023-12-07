"use client";
import React from "react";
import { Label } from "../ui/label";
import { Expand, ImageIcon, Minus, PaintBucket, Upload } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "../ui/slider";
import { useCanvasProps } from "@/store/canvasProps";
import { useParams } from "next/navigation";

type Props = {};

function CanvasButtons({}: Props) {
    const {color,setColor,radius,setRadius} = useCanvasProps()
    const params = useParams()
  return (
    
    <div className="absolute top-[50%] -translate-y-1/2 flex flex-col gap-2 left-4 z-10">
      <Label
        htmlFor="upload"
        className="hover:bg-secondary cursor-pointer h-12 w-12 bg-white border flex items-center justify-center  hover:scale-105 duration-200 rounded-full scale-100 ease-in-out"
      >
        <ImageIcon />
      </Label>
      {
            false &&
      <Popover>
        <PopoverTrigger>
          <Button
            className="w-12 h-12 rounded-full duration-200 hover:scale-105"
            size="icon"
            variant={"outline"}
          >
            <Expand />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
            <input className="w-full" value={radius} onChange={(e) => setRadius(parseInt(e.target.value))} type="range" min="0" max="150" ></input>
        </PopoverContent>
      </Popover>
        }
      {
           false &&
      <Label
        htmlFor="color"
        className="hover:bg-secondary cursor-pointer h-12 w-12 bg-white border flex items-center justify-center  hover:scale-105 duration-200 rounded-full scale-100 ease-in-out"
      >
        <PaintBucket />
      </Label>
        }
      <input value={color} onChange={(e) => setColor(e.target.value)} type="color" id="color" className="opacity-0 w-0 h-0"></input>
    </div>
  );
}

export default CanvasButtons;
