import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ImageCard from "./ImageCard";

interface CarouselComponentProps {
    images: {url: string, alt:string}[];

}

const CarouselComponent:React.FC<CarouselComponentProps> = ({images})=> {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1">
        {images.map((image, index) => (
          <CarouselItem key={index} className="pl-1 basis-1/2 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
                <ImageCard src={image.url} alt={image.alt} />
              {/* <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  
                </CardContent>
              </Card> */}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default CarouselComponent