import { AllAdminChats } from "@/components/admin-dashboard/types";
import updateAdminChatStoreHelper from "@/helpers/admin/updateAdminChatStoreHelper";
import { ClientSideChatType } from "@/ui/chat/UserChatDialog";
import { v4 as uuidv4 } from "uuid";

interface useUpdateAllAdminChatsProps {
  newMessages: ClientSideChatType[];
  userId: string;
  messagesStore: AllAdminChats[];
}

const fromClientSideChatTypeToChatType = (
  ClientSideChatType: ClientSideChatType
) => {
  return {
    ...ClientSideChatType,
    chatId: uuidv4()
  };
};

const updateAllAdminChats = ({
  newMessages,
  userId,
  messagesStore,
}: useUpdateAllAdminChatsProps) => {
  console.log("received Message", newMessages,"messages store gotten ", messagesStore);

  const generateNewAdminChatState = () => {
    const messagesStoreCopy = [...messagesStore];

    const toBeMapped: AllAdminChats[] = messagesStoreCopy;
    let indexOfSavedEntry = -1;

    toBeMapped.forEach((message, index) => {
      if (message.userId === userId) {
        indexOfSavedEntry = index;
      }
    });

  for(let i = 0; i < newMessages.length; i++){
    
    toBeMapped.map((message, index) => {
      console.log("in mapppppeeddddd 0000000 ", `message.userId${message.userId}`, `userId is ${userId}`);

      if (message.userId === userId) {
        let updatedChatsArray = updateAdminChatStoreHelper(
          message.chats,
          fromClientSideChatTypeToChatType(newMessages[i])
        );

        if (indexOfSavedEntry !== -1) {
          console.log("cha exists ... ", indexOfSavedEntry);
      
          // // overwrite the question and answer
          // messagesStoreCopy[indexOfSavedEntry] = {
          //   userId: message.userId,
          //   isRead: message.isRead,
          //   chats: updatedChatsArray,
          // };

          messagesStoreCopy.splice(indexOfSavedEntry, 1)
          messagesStoreCopy.unshift({
              userId: message.userId,
            isRead: message.isRead,
            chats: updatedChatsArray,
            name: message.name
          })
        } 

        // console.log("fishsing ", updatedChatsArray);
        // chatStatecopy.push({
        //   userId: message.userId,
        //   isRead: message.isRead,
        //   chats: updatedChatsArray,
        // });
      } 
    });
  }

    console.log("chat State copy is ", messagesStoreCopy);

    return messagesStoreCopy;
  };

  console.log(" returning this store, ", generateNewAdminChatState());
  return generateNewAdminChatState();
};

export default updateAllAdminChats;
