import React from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CustomSheetItemCard from "./CustomSheetItemCard";
import { useSheet } from "@/store/customSheet";
import LayoutBar from "./LayoutBar";
import ExploreBar from "./ExploreBar";

type Props = {
    selected: number;
    setSelected: (i: number) => void;
};

export default function CustomSheetNavMore({selected,setSelected}: Props) {
  if(selected == 0){
  return <LayoutBar/>
  }else{
    return <ExploreBar/>
  }
}
