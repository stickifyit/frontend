import React from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import CustomSheetItemCard from "./CustomSheetItemCard";
import { useSheet } from "@/store/customSheet";

type Props = {
    selected: number;
    setSelected: (i: number) => void;
};

export default function CustomSheetNavMore({selected,setSelected}: Props) {
  const { sheet, setSheet } = useSheet();
  if(selected == 0){
  return (
    <div className=" h-full overflow-auto flex-1 relative">
      <div className="p-3 flex mb-4 justify-between items-center text-xl mt-10 z-20 shadow-xl shadow-[#33333307] sticky top-0 bg-white border-b">
        <h2>All Stickers</h2>
        <Button
          onClick={() =>
            setSheet([
              ...sheet,
              {
                id: sheet.length + 1 +"hello",
                quantity: 1,
                image:
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                size: 10,
                type: "die cut",
              },
            ])
          }
        >
          Upload
        </Button>
      </div>
      <div className="p-3 space-y-2">
        {sheet.map((item, i) => (
          <CustomSheetItemCard item={item} key={i} />
        ))}
      </div>
    </div>
  );
  }
}
