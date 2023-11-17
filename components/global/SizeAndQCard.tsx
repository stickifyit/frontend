'use client'
import React from 'react'
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
import { qs, sizes } from '@/constant/sizesAndQ';
import { useSizeAndQ } from '@/store/sizeAndQ';

type Props = {}

const SizeAndQCard = (props: Props) => {
    const {q,size,setQ,setSize} = useSizeAndQ()
  return (
        <Card className="ml-auto">
          <CardHeader></CardHeader>
          <CardContent className="min-w-[400px]">
            <CardTitle>Select a Size</CardTitle>
            <div className="my-6">
              <RadioGroup value={size} onValueChange={e=>setSize(e)} >
                {
                sizes
                .map(({ size, price }) => (
                  <div key={size} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={size}
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
                {
                qs
                .map(({ name:q, save , value }) => (
                  <div key={q} className="flex items-center space-x-2">
                    <RadioGroupItem value={`option-${q}`} id={`option-${q}`} />
                    <Label className="flex w-full" htmlFor={`option-${q}`}>
                      <div className="flex-[2]">{q}</div>
                      <div className="flex-[1]">{(sizes.find(s=>s.size===size)?.price??0) * value}Dh</div>
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
  )
}

export default SizeAndQCard