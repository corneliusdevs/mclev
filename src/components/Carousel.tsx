"use client";

import Autoplay from "embla-carousel-autoplay";
import React from "react";
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
      // className="w-full max-w-sm"
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
  nextArrowClassName?: string;
}

// This is the auto-sliding carousel component without arrows
export const CarouselWithArrows: React.FC<CarouselWithArrowsProps> = ({
  items,
  previousArrowClassName,
  nextArrowClassName,
}) => {
  return (
    <div className="flex justify-center">
      <Carousel className="w-[80%] xsm:w-[240px] sm:w-[280px]">
        <CarouselContent className="">
          {items &&
            items.map((item, index) => (
              <CarouselItem
                className="flex justify-center"
                key={index + "carousel item" + Date.now().toString}
              >
                {item}
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious
          className={`${
            previousArrowClassName
              ? previousArrowClassName
              : "ml-[15px] xsm:ml-[25px] sm:mr-[50px]"
          }`}
        />
        <CarouselNext
          className={`${
            nextArrowClassName
              ? nextArrowClassName
              : "mr-[15px] xsm:mr-[25px] sm:mr-[50px]"
          }`}
        />
      </Carousel>
    </div>
  );
};

interface FeedbackCarouselProps {
  items: React.ReactNode[];
  previousArrowClassName?: string;
  nextArrowClassName?: string;
}

export const FeedbackCarousel: React.FC<FeedbackCarouselProps> = ({
  items,
  previousArrowClassName,
  nextArrowClassName,
}) => {
  return (
    <div className="flex justify-center relative w-full">
      <Carousel className="w-[80%] xsm:w-[240px] smd:w-[280px] md:w-[80%] max-w-[600px] pb-8">
        <CarouselContent className="">
          {items &&
            items.map((item, index) => (
              <CarouselItem
                className="flex justify-center md:basis-1/2"
                key={index + "carousel item" + Date.now().toString}
              >
                {item}
              </CarouselItem>
            ))}
        </CarouselContent>
        <div className="absolute flex bottom-1 right-[49%] justify-center items-center">
            <CarouselPrevious
              className={`${
                previousArrowClassName ? previousArrowClassName : ""
              }`}
            />
            <CarouselNext
              className={`${nextArrowClassName ? nextArrowClassName : ""}`}
            />
          </div>
      </Carousel>
    </div>
  );
};

interface HomeCarouselProps {
  items: React.ReactNode[];
  previousArrowClassName?: string;
  nextArrowClassName?: string;
}

export const HomeCarousel: React.FC<HomeCarouselProps> = ({
  items,
  previousArrowClassName,
  nextArrowClassName,
}) => {
  // State to make carousel auto-slide
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  return (
    <div className="flex relative justify-center h-[70vh] w-full">
      <Carousel
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnFocusIn: false,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
        className=""
      >
        <CarouselContent className="">
          {items &&
            items.map((item, index) => (
              <CarouselItem
                className="flex justify-center"
                key={index + "carousel item" + Date.now().toString}
              >
                {item}
              </CarouselItem>
            ))}
        </CarouselContent>

        <div className="absolute bottom-10 right-[100px]">
          <CarouselPrevious
            className={`${
              previousArrowClassName ? previousArrowClassName : ""
            } opacity-[0.9]`}
          />
          <CarouselNext
            className={`${
              nextArrowClassName ? nextArrowClassName : ""
            } opacity-[0.9]`}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
