import React from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CustomSheetItemCard from "./CustomSheetItemCard";
import { useSheet } from "@/store/customSheet";
import LayoutBar from "./LayoutBar";
import ExploreBar from "./ExploreBar";
import UploadBar from "./UploadBar";
import CheckOutBar from "./CheckOutBar";

type Props = {
    selected:number | null
    setSelected:(i:number|null) => void
};

export default function CustomSheetNavMore({selected,setSelected}: Props) {
  if(selected == 0){
  return <CheckOutBar/>
  }else if(selected == 1){
  return <LayoutBar/>
  }else if(selected == 2){
    return <ExploreBar/>
  }else{
    return <UploadBar/>
  }
}
