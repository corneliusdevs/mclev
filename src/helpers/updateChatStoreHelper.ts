import { ClientSideChatType } from "@/ui/chat/UserChatDialog";

const updateChatStoreHelper = (
  chatStore: ClientSideChatType[],
  chatsToBeStored: ClientSideChatType[]
) => {
  console.log("chat state gotten is ... ", chatStore);
  let chatStoreCopy = [...chatStore];

  let indexOfSavedEntry = -1;

  // if (chatStoreCopy.length === 0 && chatsToBeStored.length === 1) {
  //   chatStoreCopy.push(chatsToBeStored[0]);
  //   return chatStoreCopy;
  // }

  // loop over chats to be stored to find through the message and id of the chat if it has already been stored

  for (let i = 0; i < chatsToBeStored.length; i++) {

    //  determine if the chat is already in the store using the below loop
    for (let j = 0; j < chatStoreCopy.length; j++) {
      if (chatStoreCopy[j]?.id === chatsToBeStored[i]?.id) {
        console.log("calleddd 22222222222");

        if (chatStoreCopy[j].message === chatsToBeStored[i].message) {
          indexOfSavedEntry = j;
          console.log(`returning............`);
          continue;
        }
      
      }

      // Check if the chat to be updated is in the Store.
    }

    // update the chat store based on if the chat is already in the store or not
    if (indexOfSavedEntry !== -1) {
      console.log("cha exists ... ", indexOfSavedEntry);

      // overwrite the existing chat with the current value
      chatStoreCopy[indexOfSavedEntry] = chatsToBeStored[i];

      indexOfSavedEntry = -1;
      // keep looping
      continue;
    } else {
      // append the chat to the chatStore
      console.log("executing else updateChatStoreHelper");
      chatStoreCopy.push(chatsToBeStored[i]);
      indexOfSavedEntry = -1;
    }
  }

  // // Check if the chat to be updated is in the Store.
  // if (indexOfSavedEntry !== -1) {
  //   console.log("cha exists ... ", indexOfSavedEntry);

  //   // overwrite the question and answer
  //   chatStoreCopy[indexOfSavedEntry] = chatsToBeStored;
  // } else {
  //   // push question and answer to the chatStore
  //   console.log("executing else updateChatStoreHelper");
  //   chatStoreCopy.push(chatsToBeStored);
  // }

  return chatStoreCopy;
};

export default updateChatStoreHelper;
