import { ClientSideChatType } from "@/ui/chat/UserChatDialog";

const updateChatStoreHelper = (
  chatStore: ClientSideChatType[],
  chatToBeStored: ClientSideChatType
) => {
  console.log("chat state gotten is ... ", chatStore);
  let chatStoreCopy = [...chatStore];

  let indexOfSavedEntry = -1;

  if (chatStoreCopy.length === 0 && chatToBeStored) {
    chatStoreCopy.push(chatToBeStored);
    return chatStoreCopy;
  }

  chatStoreCopy.forEach((savedEntry, index) => {
    if (savedEntry.id === chatToBeStored.id) {
      console.log("calleddd 22222222222");

      if (savedEntry.message === chatToBeStored.message) {
        indexOfSavedEntry = index;
        

        return chatStoreCopy;
      }
      
    }
  });

  // Check if the chat to be updated is in the Store.
  if (indexOfSavedEntry !== -1) {
    console.log("cha exists ... ", indexOfSavedEntry);

    // overwrite the question and answer
    chatStoreCopy[indexOfSavedEntry] = chatToBeStored;
  } else {
    // push question and answer to the chatStore
    console.log("executing else updateChatStoreHelper");
    chatStoreCopy.push(chatToBeStored);
  }

  return chatStoreCopy;
};

export default updateChatStoreHelper;