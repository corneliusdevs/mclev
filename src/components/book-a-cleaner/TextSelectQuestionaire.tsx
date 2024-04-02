"use client";

import { ServiceQuestionaireOptions } from "@/helpers/servicesToSelect";
import { SelectedOptionWithAnswers, updateSelectedOptions } from "@/helpers/updateSelectedOptions";
import { Check } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";


interface TextSelectQuestionaireProps {
  option: ServiceQuestionaireOptions;
  className?: string;
  checkOff?: boolean; //To Control the check icon and selected state from a parent component
  onSelected?: Function // function to execute when the component is clicked
  saveSelectedOption?: Dispatch<SetStateAction<SelectedOptionWithAnswers[]>>;
  question?: string;
}

const TextSelectQuestionaire: FC<TextSelectQuestionaireProps> = ({
  option,
  className,
  onSelected,
  checkOff,
  saveSelectedOption, 
  question
}) => {
  

  // dynamically set the state depending on if the prop checkOff is passed(meaning that we want to control the selected state from a parent component) or not meaning that the component is responsible for handling its checked or selected state
  const [isSelected, setIsSelected] = useState(()=>{
     if(typeof checkOff !== "undefined"){
      return checkOff
     }
     return false
  });

    // keep track of if this is the first time component mounts
    const firstTimeComponentIsMounted = useRef(true);

    // update the selectedAnswers state when the isSelected state changes after component has mounted
    useEffect(() => {
      if(saveSelectedOption && question){
      if (firstTimeComponentIsMounted.current === true) {
        firstTimeComponentIsMounted.current = false;
      } else {
        // update answers only if this is not  the first time the component is being mounted
        if (isSelected) {
          updateSelectedOptions(
            saveSelectedOption,
            question,
            option.caption,
            true,
            false
          );
        } else {
          updateSelectedOptions(
            saveSelectedOption,
            question,
            option.caption,
            false,
            false
          );
        }
      }
    }
    }, [isSelected]);


  return (
    <div className={`relative w-full ${className && className}`}>
      <div
        className={`border-[1.5px] border-secondarycol h-14 flex justify-center hover:cursor-pointer ${
          isSelected ? "border-primarycol" : "border-lightsecondarycol"
        } items-center py-2 px-2 w-full mt-2 rounded-md`}
        onClick={() => {
          // manage the state if a function to be executed on each click is passed
          if(onSelected){
            // call the passed function with the option caption(name)
            onSelected(option.caption)
            // manage the state based on if the checkOff prop is passed indicating that we will want to manage the state extrernally or not
            if(checkOff){
              setIsSelected((val) => true);
            }else{
              setIsSelected((val) => !val);
              onSelected("")
            }
          }else{
            // if checkOff is not passed, manage the state internally by toggling the isSelected State
            setIsSelected((val) => !val);
          }
        }}
      >
        <span className="text-[13.5px] w-full text-center leading-4">
          {option.caption}
        </span>
      </div>

      {isSelected && typeof checkOff === "undefined" && 
        <div className={`${isSelected? "flex" : "hidden"} items-center justify-center absolute z-10 top-[0px] right-0 text-white p-[2px] bg-primarycol `}>
          <Check strokeWidth={4} size={18} />
        </div>
      }
      {
        isSelected && typeof checkOff !== "undefined" &&
        <div className= {`${checkOff ? "hidden" : "flex"} items-center justify-center absolute z-10 top-[0px] right-0 text-white p-[2px] bg-primarycol `}>
          <Check strokeWidth={4} size={18} />
        </div>
      }
    </div>
  );
};

export default TextSelectQuestionaire;