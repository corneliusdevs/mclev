import { ClientSideChatType } from "@/ui/chat/UserChatDialog";

const updateChatStoreHelper = (chatStore: ClientSideChatType[], chatToBeStored: ClientSideChatType)=>{
    let chatStoreCopy = [...chatStore];

let indexOfSavedEntry = -1;



chatStoreCopy.forEach((savedEntry, index) => {
    if (savedEntry.id === chatToBeStored.id) {
      indexOfSavedEntry = index;
    }
  });

  // Check if the question with answers to be updated is in the Store.
  if (indexOfSavedEntry !== -1) {
    // overwrite the question and answer
    chatStoreCopy[indexOfSavedEntry] = chatToBeStored;
  } else {
    // push question and answer to the chatStore
    chatStoreCopy.push(chatToBeStored);
  }


  return chatStoreCopy;
};

export default updateChatStoreHelper
