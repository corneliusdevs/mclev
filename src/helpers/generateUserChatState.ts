import { Chats } from "@/db/models/chat-model";
import { ClientSideChatType } from "@/ui/chat/UserChatDialog";
import { v4 as uuidv4 } from "uuid";


export const generateUserChatState = (chats: Chats) => {
    let result: ClientSideChatType[] = [];
    if(chats?.chats){
      chats.chats.map((chat) => {
        result.push({
          id: uuidv4(),
          status: "success",
          type: "showChat",
          ...chat,
        });
      });
    }
    return result;
  };