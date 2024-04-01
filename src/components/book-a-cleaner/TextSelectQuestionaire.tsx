"use client";

import { ServiceQuestionaireOptions } from "@/helpers/servicesToSelect";
import { Check } from "lucide-react";
import { FC, useState } from "react";

//  interface TextSelectQuestionaireProps {
//   option: ServiceQuestionaireOptions;
//   className?: string;
//   checkOff?: boolean; 
//   onSelected?: Function
// }
interface TextSelectQuestionaireProps {
  option: ServiceQuestionaireOptions;
  className?: string;
  checkOff?: boolean; //To Control the check icon and selected state from a parent component
  onSelected?: Function // function to execute when the component is clicked
}

const TextSelectQuestionaire: FC<TextSelectQuestionaireProps> = ({
  option,
  className,
  onSelected,
  checkOff,
}) => {

  // dynamically set the state depending on if the prop checkOff is passed(meaning that we want to control the selected state from a parent component) or not meaning that the component is responsible for handling its checked or selected state
  const [isSelected, setIsSelected] = useState(()=>{
     if(typeof checkOff !== "undefined"){
      return checkOff
     }
     return false
  });


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