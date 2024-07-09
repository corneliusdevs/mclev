"use client";

import {
  Dispatch,
  FC,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";
import Input from "@/components/Input";
import {
  SelectedOptionWithAnswers,
  updateSelectedOptions,
} from "@/helpers/updateSelectedOptions";

interface UserInputQuestionaireProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string;
  saveSelectedOption: Dispatch<SetStateAction<SelectedOptionWithAnswers[]>>;
  question: string;
  type: "number" | "string" | undefined;
}

const UserInputQuestionaire = forwardRef<
  HTMLInputElement,
  UserInputQuestionaireProps
>(
  (
    { className, placeholder, saveSelectedOption, question, type, ...props },
    ref
  ) => {
    const [userInput, setUserInput] = useState<string>("");

    // keep track of if this is the first time component mounts
    const firstTimeComponentIsMounted = useRef(true);

    // update the selectedAnswers state when the isSelected state changes after component has mounted
    useEffect(() => {
      if (firstTimeComponentIsMounted.current === true) {
        firstTimeComponentIsMounted.current = false;
      } else {
        // update answers only if this is not  the first time the component is being mounted

        if (userInput.length !== 0) {
          updateSelectedOptions(
            saveSelectedOption,
            question,
            userInput.toString(),
            true,
            true
          );
        } else {
          updateSelectedOptions(
            saveSelectedOption,
            question,
            userInput.toString(),
            false,
            true
          );
        }
      }
    }, [userInput, question, saveSelectedOption]);

    return (
      <div className="w-full">
        {type === "number" ? (
          <Input
            className={`${className && className}`}
            placeholder={`${placeholder ? placeholder : ""}`}
            {...props}
            type="number"
            value={userInput}
            min={1}
            max={1000}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
        ) : (
          <Input
            className={`${className && className} focus:border-gray-300`}
            placeholder={`${placeholder ? placeholder : ""}`}
            {...props}
            type="string"
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
            }}
          />
        )}
      </div>
    );
  }
);

UserInputQuestionaire.displayName = "UserInputQuestionaire";

export default UserInputQuestionaire;
