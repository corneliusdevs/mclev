import { FC, useEffect, useState } from "react";
import { ServiceQuestionaire } from "@/helpers/servicesToSelect";
import InputElement from "../Input";
import ServiceImageQuestionaire from "./ServiceImageQuestionaire";
import ServiceImgQuestionaireWithLongCaption from "./ServiceImgQuestionaireWithLongCaption";
import TextSelectQuestionaire from "./TextSelectQuestionaire";
import { SelectedOptionWithAnswers } from "@/helpers/updateSelectedOptions";

interface ServiceQuestionaireProps {
  info: ServiceQuestionaire[];

  onSelected?: Function; //  a higher order function to be executed when an option is selected by the user. This function must supply the state or store as an argument of type Array. confused? implement a setState function of this signature setState(prevStateArray => return current state)
  // This can be your setState function. It will call your setState or store manager function with the selected question and answer
  // use this to store the selected question and answer
}

const ServiceQuestionaire: FC<ServiceQuestionaireProps> = ({
  info,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<SelectedOptionWithAnswers[]>([]);

  const [textSelectAnswers, setTextSelectAnswers] = useState<string[]>([]);
  const [questionsAndTheirAnswers, setQuestionsAndTheirAnswers] = useState({});



  // clear the selected answers when component mounts for the first time
  useEffect(()=>{
    setSelectedAnswer([])
  }, [])


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
                    ui = (
                      <ServiceImageQuestionaire
                        option={option}
                        key={option.caption + index}
                        saveSelectedOption={setSelectedAnswer}
                        question={info.question}
                      />
                    );
                    return ui;
                  }

                  return ui;
                })}
              </div>
            )}
            {info.questionaireType === "TextSelect" && (
              <div className="flex flex-col items-center w-full px-2">
                {info.options?.map((option, index) => {
                  return (
                    <TextSelectQuestionaire
                      option={option}
                      key={option.caption + index}
                    />
                  );
                })}
              </div>
            )}

            {info.questionaireType === "ImageWithLongCaption" && (
              <div className="flex flex-col items-center w-full px-2">
                {info.options?.map((option, index) => {
                  return (
                    <ServiceImgQuestionaireWithLongCaption
                      option={option}
                      key={option.caption + index}
                      saveSelectedOption={setTextSelectAnswers}
                    />
                  );
                })}
              </div>
            )}

            {info.questionaireType === "UserInput" && (
              <div className="flex items-start w-full px-2">
                <div className="flex items-start border-[1.4px] border-black rounded-sm">
                  <InputElement
                    className="ring-0 border-none min-w-[100%]"
                    size={50}
                    type="number"
                  />
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
