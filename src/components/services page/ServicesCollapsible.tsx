"use client";

import { ChevronsDown, ChevronsRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ServicesCollapsiblesProps {
  headerText: string;
  contentText: string;
  imageSrc?: string;
  imageAlt?: string;
}

const ServicesCollapsible = ({
  headerText,
  contentText,
  imageSrc,
  imageAlt,
}: ServicesCollapsiblesProps) => {
  const [expandService, setExpandService] = useState<boolean>(false);

  return (
    <div className="border-[1px] border-footergray/40 transition duration-[2000ms] ease-in-out">
      <div
        className="flex border-l-2 p-4 border-secondarycol w-full justify-between hover:bg-homegray hover:cursor-pointer"
        onClick={() => {
          setExpandService((val) => {
            return !val;
          });
        }}
      >
        <div className="font-bold text-black/80">{headerText}</div>
        <div>{expandService ? <ChevronsDown /> : <ChevronsRight />}</div>
      </div>
      <div
        className={`${
          !expandService && "hidden"
        } text-[15px] p-2 flex flex-col justify-center`}
      >
        {imageAlt && imageSrc && (
          <div className="flex justify-center bg-">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={300}
              height={300}
              className="w-full h-[300px]"
            />
          </div>
        )}
        <div className="mt-4 w-full text-justify">
          {expandService && contentText}
        </div>
      </div>
    </div>
  );
};

export default ServicesCollapsible;