import { Chats } from "@/db/models/chat-model";
import updateAdminChatStoreHelper from "@/helpers/updateAdminChatStoreHelper";
import { ClientSideChatType } from "@/ui/chat/UserChatDialog";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface useUpdateAllAdminChatsProps {
  newMessage: ClientSideChatType;
  userId: string;
  messagesStore: Chats[];
}

const fromClientSideChatTypeToChatType = (
  ClientSideChatType: ClientSideChatType
) => {
  return {
    message: ClientSideChatType.message,
    timeStamp: ClientSideChatType.timeStamp,
    recipientsId: ClientSideChatType.recipientsId,
    author: ClientSideChatType.author,
    chatId: uuidv4(),
  };
};

const updateAllAdminChats = ({
  newMessage,
  userId,
  messagesStore,
}: useUpdateAllAdminChatsProps) => {
  console.log("messages store gotten ", messagesStore);
  const chatStatecopy: Chats[] = [];

  const generateNewAdminChatState = () => {
    const messagesStoreCopy = [...messagesStore];

    const toBeMapped: Chats[] = messagesStoreCopy;
    let indexOfSavedEntry = -1;

    toBeMapped.forEach((message, index) => {
      if (message.userId === userId) {
        indexOfSavedEntry = index;
      }
    });


    toBeMapped.map((message, index) => {
      if (message.userId === userId) {
        console.log("in mapppppeeddddd 0000000");
        let updatedChatsArray = updateAdminChatStoreHelper(
          message.chats,
          fromClientSideChatTypeToChatType(newMessage)
        );

        if (indexOfSavedEntry !== -1) {
          console.log("cha exists ... ", indexOfSavedEntry);
      
          // overwrite the question and answer
          messagesStoreCopy[indexOfSavedEntry] = {
            userId: message.userId,
            isRead: message.isRead,
            chats: updatedChatsArray,
          };
        } 

        // console.log("fishsing ", updatedChatsArray);
        // chatStatecopy.push({
        //   userId: message.userId,
        //   isRead: message.isRead,
        //   chats: updatedChatsArray,
        // });
      } 
    });

    console.log("chat State copy is ", messagesStoreCopy);

    return messagesStoreCopy;
  };

  console.log(" returning this store, ", generateNewAdminChatState());
  return generateNewAdminChatState();
};

export default updateAllAdminChats;
