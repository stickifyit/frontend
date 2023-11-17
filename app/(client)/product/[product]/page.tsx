"use client"
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useParams } from 'next/navigation'
type Props = {
};

function Page({}: Props) {
    const params = useParams();
  return (
    <div className=" bg-secondary">
      <div className="container items-end py-4 mx-auto flex gap-6 min-h-[60vh]">
        <div className="space-y-4">
          <h1 className="text-6xl">{params?.product} stickers</h1>
          <p className="max-w-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem perspiciatis similique omnis maxime corporis. Aliquid modi hic sapiente, nobis, ipsa quod nisi tenetur non deleniti dolor temporibus explicabo quibusdam laboriosam.</p>
        </div>
        <Card className="ml-auto">
          <CardHeader></CardHeader>
          <CardContent className="min-w-[300px]">
            <CardTitle>Select a Size</CardTitle>
            <div className="my-6">
              <RadioGroup defaultValue="option-2x2">
                {[
                  { size: "2x2", price: 1 },
                  { size: "3x3", price: 2 },
                  { size: "6x6", price: 3 },
                  { size: "9x9", price: 4 },
                ].map(({ size, price }) => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={`option-${size}`}
                      id={`option-${size}`}
                    />
                    <Label htmlFor={`option-${size}`}>{size} (cm)</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <CardTitle>Select a quantity</CardTitle>
            <div className="my-6">
              <RadioGroup defaultValue="option-10">
                {[
                  { q: 10, price: 10, save: 5 },
                  { q: 50, price: 50, save: 10 },
                  { q: 80, price: 80, save: 15 },
                  { q: 100, price: 100, save: 20 },
                  { q: 200, price: 200, save: 30 },
                  { q: 300, price: 300, save: 40 },
                ].map(({ q, price, save }) => (
                  <div key={q} className="flex items-center space-x-2">
                    <RadioGroupItem value={`option-${q}`} id={`option-${q}`} />
                    <Label className="flex w-full" htmlFor={`option-${q}`}>
                      <div className="flex-[2]">{q}</div>
                      <div className="flex-[1]">{price}Dh</div>
                      <div className="text-green-700 flex-[1] justify-end flex">
                        {save}%
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <Button size="lg" className="w-full">Continue</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Page;
