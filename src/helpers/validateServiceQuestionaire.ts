import { ServiceQuestionaire } from "./servicesToSelect";
import { SelectedOptionWithAnswers } from "./updateSelectedOptions";

export const validateServiceQuestionaire = (
  questionaires: ServiceQuestionaire[],
  answers: SelectedOptionWithAnswers[]
) => {
  //   loop through the questionaire and make sure every required queation has at least one valid answer
  let requiredQuestions = 0;
  let result = {
    pass: false,
    question: "",
  };

  questionaires.forEach((questionaire) => {
    if (questionaire.required) {
      requiredQuestions++;
    }
  });

  if (answers.length === 0) {
    result = {
      pass: false,
      question: questionaires[0].question,
    };
  } // if there is only one answer present and it is an empty string pass is false
  else if (answers[0].answers[0] === "") {
    result = {
      pass: false,
      question: answers[0].question,
    };
    return result;
  } else {
    for (let i = 0; i < questionaires.length; i++) {
      const questionaire = questionaires[i];

      if (questionaire.required) {
        let isQuestionAnswered = false;
        for (let j = 0; j < answers.length; j++) {
          const answer = answers[j];
          if (
            questionaire.question === answer.question &&
            answer.answers.length !== 0
          ) {
            requiredQuestions--;
            isQuestionAnswered = true;
            break;
          }
        }

        if (!isQuestionAnswered) {
          result = {
            pass: false,
            question: questionaire.question,
          };
          break;
        }
      }
    }

    if (requiredQuestions === 0) {
      result = {
        pass: true,
        question: "",
      };
      return result;
    }
  }

  return result;
};
