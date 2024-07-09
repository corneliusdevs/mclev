import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { ServiceQuestionaire } from "@/helpers/servicesToSelect";
import ServiceImgQuestionaireWithLongCaption from "@/components/book-a-cleaner/ServiceImgQuestionaireWithLongCaption";
import TextSelectQuestionaire from "@/components/book-a-cleaner/TextSelectQuestionaire";
import { SelectedOptionWithAnswers } from "@/helpers/updateSelectedOptions";
import UserInputQuestionaire from "@/components/book-a-cleaner/UserInputQuestionaire";
import ServiceImgQuestionaire from "@/components/ServiceImgQuestionaire";

interface ServiceQuestionaireComponentProps {
  questionaire: ServiceQuestionaire[];

  updateSelectedAnswers?: Dispatch<SetStateAction<SelectedOptionWithAnswers[]>>; //
}

const ServiceQuestionaireComponent: FC<ServiceQuestionaireComponentProps> = ({
  questionaire,
  updateSelectedAnswers,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<
    SelectedOptionWithAnswers[]
  >([]);

  // clear the selected answers when component mounts for the first time
  useEffect(() => {
    if (updateSelectedAnswers) {
      updateSelectedAnswers([]);
    }
  }, [updateSelectedAnswers]);

  return (
    <div>
      {questionaire.map((questionaire, index) => {
        return (
          <div className={`mt-4 mb-3 ${questionaire.titleText && " border-secondarycol"}`} key={questionaire.questionaireType + index}>
            {questionaire.titleText && (
              <div className="text-primarycol text-xl pl-2 border-b-[1px] border-gray-300 mt-10">
                {questionaire.titleText}
              </div>
            )}
            <div className="pt-2">
              <span className="text-greenaccentcol/90 text-[15px] font-bold">
                <span className="pl-2">{questionaire.question}</span>
                {questionaire.required && (
                  <span className="text-red-500">&#42;</span>
                )}
              </span>
            </div>
            {questionaire.questionaireType === "ImageWithCaption" && (
              <div className="grid grid-cols-2 xsm:gap-x-[10%] p-2 gap-y-5">
                {questionaire.options?.map((option, index) => {
                  let ui = <div></div>;
                  if (questionaire.questionaireType === "ImageWithCaption") {
                    ui = updateSelectedAnswers ? (
                      <ServiceImgQuestionaire
                        option={option}
                        key={option.caption + index}
                        saveSelectedOption={updateSelectedAnswers}
                        question={questionaire.question}
                      />
                    ) : (
                      <ServiceImgQuestionaire
                        option={option}
                        key={option.caption + index}
                        saveSelectedOption={setSelectedAnswer}
                        question={questionaire.question}
                      />
                    );
                    return ui;
                  }

                  return ui;
                })}
              </div>
            )}
            {questionaire.questionaireType === "TextSelect" && (
              <div className="flex flex-col items-center w-full px-2">
                {questionaire.options?.map((option, index) => {
                  if (updateSelectedAnswers) {
                    return (
                      <TextSelectQuestionaire
                        option={option}
                        key={option.caption + index}
                        saveSelectedOption={updateSelectedAnswers}
                        question={questionaire.question}
                      />
                    );
                  } else {
                    return (
                      <TextSelectQuestionaire
                        option={option}
                        key={option.caption + index}
                        saveSelectedOption={setSelectedAnswer}
                        question={questionaire.question}
                      />
                    );
                  }
                })}
              </div>
            )}

            {questionaire.questionaireType === "ImageWithLongCaption" && (
              <div className="flex flex-col items-center w-full px-2">
                {questionaire.options?.map((option, index) => {
                  if (updateSelectedAnswers) {
                    return (
                      <ServiceImgQuestionaireWithLongCaption
                        option={option}
                        key={option.caption + index}
                        saveSelectedOption={updateSelectedAnswers}
                        question={questionaire.question}
                      />
                    );
                  } else {
                    return (
                      <ServiceImgQuestionaireWithLongCaption
                        option={option}
                        key={option.caption + index}
                        saveSelectedOption={setSelectedAnswer}
                        question={questionaire.question}
                      />
                    );
                  }
                })}
              </div>
            )}

            {questionaire.questionaireType === "UserInput" && (
              <div className="flex items-start w-full px-2">
                <div className="flex items-start border-[0.7px] border-gray-200 hover:border-gray-400 rounded-sm w-full">
                  {updateSelectedAnswers ? (
                    <UserInputQuestionaire
                      className="ring-0 border-none min-w-[100%]"
                      size={50}
                      type={questionaire.inputType}
                      placeholder={questionaire.placeholderText}
                      saveSelectedOption={updateSelectedAnswers}
                      question={questionaire.question}
                    />
                  ) : (
                    <UserInputQuestionaire
                      className="ring-0 border-none min-w-[100%]"
                      size={50}
                      placeholder={questionaire.placeholderText}
                      type={questionaire.inputType}
                      saveSelectedOption={setSelectedAnswer}
                      question={questionaire.question}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ServiceQuestionaireComponent;
