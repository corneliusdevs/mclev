import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { ServiceQuestionaire } from "@/helpers/servicesToSelect";
import ServiceImageQuestionaire from "./ServiceImageQuestionaire";
import ServiceImgQuestionaireWithLongCaption from "./ServiceImgQuestionaireWithLongCaption";
import TextSelectQuestionaire from "./TextSelectQuestionaire";
import { SelectedOptionWithAnswers } from "@/helpers/updateSelectedOptions";
import UserInputQuestionaire from "./UserInputQuestionaire";

interface ServiceQuestionaireProps {
  info: ServiceQuestionaire[];

  updateSelectedAnswers?: Dispatch<SetStateAction<SelectedOptionWithAnswers[]>>; // 
}

const ServiceQuestionaire: FC<ServiceQuestionaireProps> = ({ info, updateSelectedAnswers }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<
    SelectedOptionWithAnswers[]
  >([]);

  // clear the selected answers when component mounts for the first time
  useEffect(() => {
    // setSelectedAnswer([]);
    if(updateSelectedAnswers){
      updateSelectedAnswers([])
    }
  }, []);

  const handleSelected = (currentState: []) => {
    const currentStateCopy = [...currentState];
  };

  return (
    <div>
      {info.map((info, index) => {
        return (
          <div className="mt-4" key={info.questionaireType + index}>
            <div className="pt-2">
              <span className="text-greenaccentcol/90 text-[15px] font-bold">
                <span className="pl-2">{info.question}</span>
                {info.required && <span className="text-red-500">&#42;</span>}
              </span>
            </div>
            {info.questionaireType === "ImageWithCaption" && (
              <div className="grid grid-cols-2 xsm:gap-x-[10%] p-2 gap-y-5">
                {info.options?.map((option, index) => {
                  let ui = <div></div>;
                  if (info.questionaireType === "ImageWithCaption") {
                    ui = updateSelectedAnswers? 
                      <ServiceImageQuestionaire
                        option={option}
                        key={option.caption + index}
                        saveSelectedOption={updateSelectedAnswers}
                        question={info.question}
                      /> :                       <ServiceImageQuestionaire
                      option={option}
                      key={option.caption + index}
                      saveSelectedOption={setSelectedAnswer}
                      question={info.question}
                    />
                    ;
                    return ui;
                  }

                  return ui;
                })}
              </div>
            )}
            {info.questionaireType === "TextSelect" && (
              <div className="flex flex-col items-center w-full px-2">
                {info.options?.map((option, index) => {
                  if(updateSelectedAnswers){
                    return (
                      <TextSelectQuestionaire
                        option={option}
                        key={option.caption + index}
                        saveSelectedOption={updateSelectedAnswers}
                        question={info.question}
                      />
                    );
                  }else{
                    return (
                      <TextSelectQuestionaire
                        option={option}
                        key={option.caption + index}
                        saveSelectedOption={setSelectedAnswer}
                        question={info.question}
                      />
                    );
                  }
                })}
              </div>
            )}

            {info.questionaireType === "ImageWithLongCaption" && (
              <div className="flex flex-col items-center w-full px-2">
                {info.options?.map((option, index) => {
                  if(updateSelectedAnswers){
                    return (
                      <ServiceImgQuestionaireWithLongCaption
                        option={option}
                        key={option.caption + index}
                        saveSelectedOption={updateSelectedAnswers}
                        question={info.question}
                      />
                    );

                  }else{
                    return (
                      <ServiceImgQuestionaireWithLongCaption
                        option={option}
                        key={option.caption + index}
                        saveSelectedOption={setSelectedAnswer}
                        question={info.question}
                      />
                    );
                  }
                })}
              </div>
            )}

            {info.questionaireType === "UserInput" && (
              <div className="flex items-start w-full px-2">
                <div className="flex items-start border-[1.4px] border-black rounded-sm">
                  { updateSelectedAnswers? <UserInputQuestionaire
                    className="ring-0 border-none min-w-[100%]"
                    size={50}
                    type="number"
                    saveSelectedOption={updateSelectedAnswers}
                    question={info.question}
                  /> : <UserInputQuestionaire
                  className="ring-0 border-none min-w-[100%]"
                  size={50}
                  type="number"
                  saveSelectedOption={setSelectedAnswer}
                  question={info.question}
                />}
                  
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ServiceQuestionaire;
