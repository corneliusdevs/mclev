import { Dispatch, SetStateAction } from "react";

export type SelectedOptionWithAnswers = {
  question: string;
  answers: string[];
};

// makes a copy of the store to be updated and returns the new store with the applied update
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

  // check if the question has already been answered. if Yes, save the index of the question
  storeCopy.forEach((savedEntry, index) => {
    if (savedEntry.question === item.question) {
      indexOfSavedEntry = index;
    }
  });

  // Check if the question with answers to be updated is in the Store.
  if (indexOfSavedEntry !== -1 && toBeStored) {
    // overwrite the question and answer
    storeCopy[indexOfSavedEntry] = item;
  } else {
    // push question and answer to the store
    storeCopy.push(item);
  }

  if (toBeStored === false) {
    // remove the unSelected answer from the previousAnswersArray
    storeCopy.splice(indexOfSavedEntry, 1);
  }

  return storeCopy;
};

//
const updateAnswersOfSelectedOption = (
  existingOptionWithAnswers: SelectedOptionWithAnswers,
  question: string,
  answer: string,
  saveAnswer: boolean,
  shouldOverwriteAnswersWithCurrentValue: boolean
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
      // if shouldOverwriteAnswerWithCurrentValue is true, then return an array containing only the current answer
      if (shouldOverwriteAnswersWithCurrentValue) {

        savedAnswers = [answer];
        
        // if answer is an empty string and overwrite answers with current value is true, clear the answers array
        if (answer === "") {
          savedAnswers = [];
        }

        return {
          question,
          answers: savedAnswers,
        };
      }

      return existingOptionWithAnswers;
    } else {
      // push the answer to the answers array copy only
      savedAnswers.push(answer);

      // if shouldOverwriteAnswerWithCurrentValue is true, then return an array containing only the current answer
      if (shouldOverwriteAnswersWithCurrentValue) {
        savedAnswers = [answer];
        // if answer is an empty string and overwrite answers with current value is true, clear the answers array
        if (answer === "") {
          savedAnswers = [];
        }
        return {
          question,
          answers: savedAnswers,
        };
      }

      return {
        question,
        answers: savedAnswers,
      };
    }
  } else {
    // if shouldOverwriteAnswerWithCurrentValue is true, then return an array containing only the current answer
    if (shouldOverwriteAnswersWithCurrentValue) {
      savedAnswers = [answer];
      // if answer is an empty string and overwrite answers with current value is true, clear the answers array
      if (answer === "") {
        savedAnswers = [];
      }
      return {
        question,
        answers: savedAnswers,
      };
    }

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
  saveAnswer: boolean,
  shouldOverwriteAnswersWithCurrentValue: boolean
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
        saveAnswer,
        shouldOverwriteAnswersWithCurrentValue
      );
      storeCopy = updateStore(storeCopy, item, saveAnswer);
    } else {
      item = updateAnswersOfSelectedOption(
        exisitingEntry,
        question,
        answer,
        saveAnswer,
        shouldOverwriteAnswersWithCurrentValue
      );
      storeCopy = updateStore(storeCopy, item, saveAnswer);
    }

    console.log(storeCopy);

    return storeCopy;
  });
};
