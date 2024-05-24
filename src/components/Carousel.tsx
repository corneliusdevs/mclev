"use client";

import Autoplay from "embla-carousel-autoplay";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import ImageCard from "./ImageCard";

interface CarouselComponentProps {
  images: { url: string; alt: string }[];
}

// This is the auto-sliding carousel component without arrows
const CarouselComponent: React.FC<CarouselComponentProps> = ({ images }) => {
  // State to make carousel auto-slide
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  return (
    <Carousel
      setApi={setApi}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full max-w-sm"
    >
      <CarouselContent className="-ml-1">
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className="pl-1 basis-1/2 md:basis-1/2 lg:basis-1/3"
          >
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
  );
};

interface CarouselWithArrowsProps {
  items: React.ReactNode[];
  previousArrowClassName?: string;
  nextArrowClassName?: string
}

// This is the auto-sliding carousel component without arrows
export const CarouselWithArrows: React.FC<CarouselWithArrowsProps> = ({
  items,
  previousArrowClassName,
  nextArrowClassName
}) => {
  return (
    <div className="flex justify-center">
      <Carousel className="w-[80%] xsm:w-[240px] sm:w-[280px]">
        <CarouselContent className="">
          {items && items.map((item, index) => <CarouselItem className="flex justify-center" key={index + "carousel item" + Date.now().toString}>{item}</CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious className={`${previousArrowClassName? previousArrowClassName: "ml-[15px] xsm:ml-[25px] sm:mr-[50px]"}`}/>
        <CarouselNext className={`${nextArrowClassName ? nextArrowClassName: "mr-[15px] xsm:mr-[25px] sm:mr-[50px]"}`} />
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
