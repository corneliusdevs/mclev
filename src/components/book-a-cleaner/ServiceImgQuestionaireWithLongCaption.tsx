"use client";

import { ServiceQuestionaireOptions } from "@/helpers/servicesToSelect";
import { Check, Ticket } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";

interface ServiceImgQuestionaireWithLongCaptionProps {
  option: ServiceQuestionaireOptions;
}

const ServiceImgQuestionaireWithLongCaption: FC<
  ServiceImgQuestionaireWithLongCaptionProps
> = ({ option }) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="relative w-full">
      <div className={`bg-secondarycol/55 border-4 border-lightsecondarycol hover:cursor-pointer border-b-0 w-full mt-2 ${isSelected ? "border-primarycol border-b-4" : "border-lightsecondarycol" } border-b-0`}
       onClick={()=>{
        setIsSelected(val => !val)
      }}
      >
        <div className="p-1">
          <div className="transform scale-[0.6] flex justify-center">
            <Image
              src={"/assets/services/oven3.png"}
              alt="cooker"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="flex justify-center pb-2">
          <span className="-mt-2 p-1 text-center text-[13.5px]">
            {option.caption}
          </span>
        </div>
      </div>

      {isSelected && (
        <div className="flex items-center justify-center absolute z-10 top-2 right-0 text-white p-[2px] bg-primarycol ">
          <Check strokeWidth={4} size={18}/>
        </div>
      )}
    </div>
  );
};

export default ServiceImgQuestionaireWithLongCaption;
