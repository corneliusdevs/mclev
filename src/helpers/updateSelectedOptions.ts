import { Dispatch, SetStateAction } from "react";

export type SelectedOptionWithAnswers = {
  question: string;
  answers: string[];
};

const updateStore = (
  store: SelectedOptionWithAnswers[],
  item: SelectedOptionWithAnswers,
  toBeStored: boolean
) => {
  let storeCopy = [...store];
  let indexOfSavedEntry = -1;

  if (storeCopy.length === 0 && toBeStored) {
    storeCopy.push(item);
  }

  storeCopy.forEach((savedEntry, index) => {
    if (savedEntry.question === item.question) {
      indexOfSavedEntry = index;
    }
  });

  if (indexOfSavedEntry !== -1 && toBeStored) {
    storeCopy[indexOfSavedEntry] = item;
  } else {
    // push the answer to the answers array copy
    storeCopy.push(item);
  }

  if (toBeStored === false) {
    // remove the unSelected answer from the previousAnswersArray
    storeCopy.splice(indexOfSavedEntry, 1);
  }

  return storeCopy;
};

const updateAnswersOfSelectedOption = (
  existingOptionWithAnswers: SelectedOptionWithAnswers,
  question: string,
  answer: string,
  saveAnswer: boolean
) => {
  let indexOfSavedAnswer = -1;
  let isAnswerSaved = false;
  let savedAnswers = [...existingOptionWithAnswers.answers];

  // Check if answer exists by finding its index
  savedAnswers.forEach((savedAnswer, index) => {
    if (savedAnswer === answer) {
      indexOfSavedAnswer = index;
      isAnswerSaved = true;
    }
  });

  // if saveAnswer is true and it is already stored in the state
  if (saveAnswer === true) {
    // check if the answer has been stored and if so, overwrite the value
    if (isAnswerSaved) {
      //   previousAnswersArrayCopy[indexOfAnswer] = answer;

      return existingOptionWithAnswers;
    } else {
      // push the answer to the answers array copy
      savedAnswers.push(answer);

      return {
        question,
        answers: savedAnswers,
      };
    }
  } else {
    // remove the unSelected answer from the previousAnswersArray
    if (indexOfSavedAnswer !== -1) {
      savedAnswers.splice(indexOfSavedAnswer, 1);

      return {
        question,
        answers: savedAnswers,
      };
    }
  }

  return {
    question,
    answers: savedAnswers,
  };
};

export const updateSelectedOptions = (
  saveSelectedOptionStateHandler: Dispatch<
    SetStateAction<SelectedOptionWithAnswers[]>
  >,
  question: string,
  answer: string,
  saveAnswer: boolean
) => {

  // make a copy of the previous state
  saveSelectedOptionStateHandler((store) => {
    let storeCopy = [...store];
    let item = {
      question,
      answers: [answer],
    };

    if (store.length === 0) {
      storeCopy = updateStore(store, item, true);
      return storeCopy;
    }

    let exisitingEntry: SelectedOptionWithAnswers = {
      question: "",
      answers: [],
    };
    let exisitingEntryIndex: number;

    storeCopy.forEach((savedEntry, index) => {
      if (savedEntry.question === question) {
        exisitingEntry = savedEntry;
        exisitingEntryIndex = index;
      }
    });

    if (saveAnswer === true) {
      item = updateAnswersOfSelectedOption(
        exisitingEntry,
        question,
        answer,
        saveAnswer
      );
      storeCopy = updateStore(storeCopy, item, saveAnswer);
    } else {
      item = updateAnswersOfSelectedOption(
        exisitingEntry,
        question,
        answer,
        saveAnswer
      );
      storeCopy = updateStore(storeCopy, item, saveAnswer);
    }

    console.log(storeCopy);
    
    return storeCopy;
  });
};
