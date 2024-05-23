import { AdminChats, AllAdminChats } from "@/components/admin-dashboard/types";

const updateAllAdminChatsStoreHelper = (
  chatStore: AllAdminChats[],
  chatToBeStored: AdminChats,
  userId: string
) => {
  console.log("admin chat state gotten ... ", chatStore);
  let allChatsStore: AllAdminChats[] = [...chatStore];
  let userChats: AdminChats[] = [];

  let indexOfUserChatsTobeUpdated: number = -1;
  for (let i = 0; i < allChatsStore.length; i++) {
    if (allChatsStore[i].userId === userId) {
      indexOfUserChatsTobeUpdated = i;
      userChats = [...allChatsStore[i].chats];
    }
  }

  let indexOfSavedchat = -1;

  userChats.forEach((chat, index) => {
    if (chat.chatId === chatToBeStored.chatId) {
      
      if (chat.message === chatToBeStored.message) {
        console.log("calleddd admin 23466, matching message ", index);
        indexOfSavedchat = index;
      }
    }
  });

  // Check if the chat to be updated is in the Store.
  if (indexOfSavedchat !== -1) {
    console.log("admin chat exists ... ", indexOfSavedchat);

    return allChatsStore
  } else {
    // push question and answer to the chatStore
    console.log("executing else admin chat store helper");
    userChats.push(chatToBeStored);
  }

  if (indexOfUserChatsTobeUpdated !== -1) {
    console.log("strnage ............")
    allChatsStore[indexOfUserChatsTobeUpdated].chats.push(chatToBeStored);
  }

  return allChatsStore;
};

export const deleteChatFromAdminChatStore = (chatStore: AllAdminChats[],
  userId: string)=>{
  let allChatsStore: AllAdminChats[] = [...chatStore];
  let userChats: AdminChats[] = [];

  let indexOfUserChatsTobeDeleted: number = -1;
  for (let i = 0; i < allChatsStore.length; i++) {
    if (allChatsStore[i].userId === userId) {
      indexOfUserChatsTobeDeleted = i;
      userChats = [...allChatsStore[i].chats];
    }
  }
  let newChatStore = allChatsStore.splice(indexOfUserChatsTobeDeleted, 1);

  console.log("deleted state ", newChatStore)

  return newChatStore

}

export default updateAllAdminChatsStoreHelper;
