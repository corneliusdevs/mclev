"use client";

import { ServiceQuestionaireOptions } from "@/helpers/servicesToSelect";
import { SelectedOptionWithAnswers, updateSelectedOptions } from "@/helpers/updateSelectedOptions";
import { Check } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { FC, useState } from "react";

interface ServiceImgQuestionaireProps {
  option: ServiceQuestionaireOptions;
  saveSelectedOption:  Dispatch<SetStateAction<SelectedOptionWithAnswers[]>>;
  question: string;
}

const ServiceImgQuestionaire: FC<ServiceImgQuestionaireProps> = ({
  option, saveSelectedOption, question
}) => {
  const [isSelected, setIsSelected] = useState(false);

  // keep track of if this is the first time component mounts
  const firstTimeComponentIsMounted = useRef(true);
 
  // update the selectedAnswers state when the isSelected state changes after component has mounted
  useEffect(()=>{
    if(firstTimeComponentIsMounted.current === true){  
      firstTimeComponentIsMounted.current = false
    }else{
      // update answers only if this is not  the first time the component is being mounted
      if(isSelected){
        updateSelectedOptions(saveSelectedOption, question, option.caption, true, false)
      }else{
        updateSelectedOptions(saveSelectedOption, question, option.caption, false, false)
      }
    }

  }, [isSelected, option.caption, question, saveSelectedOption ])

  return (
    <div className="relative">
      <div className={`bg-secondarycol/55 border-4 hover:cursor-pointer ${isSelected ? "border-primarycol border-b-4" : "border-lightsecondarycol" } border-b-0`}
      
      onClick={()=>{
        setIsSelected(val => !val);
      }}
      >
        <div className="p-1">
          <div className="transform scale-[0.6] flex justify-center">
            <Image
              src={`/assets/services/${option.imageSrc}`}
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

      {isSelected && <div className="flex items-center justify-center absolute z-10 top-[0px] right-0 text-white p-[2px] bg-primarycol ">
        
          <Check strokeWidth={4} size={18}/>
        </div>}
    </div>
  );
};

export default ServiceImgQuestionaire;
