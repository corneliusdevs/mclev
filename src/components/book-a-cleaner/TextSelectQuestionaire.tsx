"use client";

import { ServiceQuestionaireOptions } from "@/helpers/servicesToSelect";
import { Check } from "lucide-react";
import { FC, useState } from "react";

interface TextSelectQuestionaireProps {
  option: ServiceQuestionaireOptions;
}

const TextSelectQuestionaire: FC<TextSelectQuestionaireProps> = ({
  option,
}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className={`border-[1.5px] border-secondarycol h-14 flex justify-center hover:cursor-pointer ${
          isSelected ? "border-primarycol" : "border-lightsecondarycol"
        } items-center py-2 px-2 w-full mt-2 rounded-md`}
        onClick={() => {
          setIsSelected((val) => !val);
        }}
      >
        <span className="text-[13.5px] w-full text-center leading-4">
          {option.caption}
        </span>
      </div>

      {isSelected && (
        <div className="flex items-center justify-center absolute z-10 top-[0px] right-0 text-white p-[2px] bg-primarycol ">
          <Check strokeWidth={4} size={18} />
        </div>
      )}
    </div>
  );
};

export default TextSelectQuestionaire;
