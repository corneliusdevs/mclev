import { AdminChats, AllAdminChats } from "@/components/admin-dashboard/types";
import { Chat } from "@/db/models/chat-model";


const updateAdminChatStoreHelper = (
  chatStore: AdminChats[],
  chatToBeStored: AdminChats
) => {
  console.log("chat state gotten is ... ", chatStore);
  let chatStoreCopy = [...chatStore];

  let indexOfSavedEntry = -1;

  if (chatStoreCopy.length === 0 && chatToBeStored) {
    chatStoreCopy.push(chatToBeStored);
    return chatStoreCopy;
  }

  chatStoreCopy.forEach((savedEntry, index) => {
    if (savedEntry.chatId === chatToBeStored.chatId) {
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
    // chatStoreCopy[indexOfSavedEntry] = chatToBeStored;
  } else {
    // push question and answer to the chatStore
    console.log("executing else updateChatStoreHelper");
    chatStoreCopy.push(chatToBeStored);
  }

  return chatStoreCopy;
};

export default updateAdminChatStoreHelper;
