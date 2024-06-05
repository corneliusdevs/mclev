import { AdminChats, AllAdminChats } from "@/components/admin-dashboard/types";
import { Chat, Chats } from "@/db/models/chat-model";
import { ChatType as AdminChatType } from "@/ui/chat/AdminChatDialog";
import { v4 as uuidv4 } from "uuid";

export const generateAdminChatState = (chats: Chats) => {
  let result: AdminChatType[] = [];
  chats.chats.map((chat) => {
    result.push({
      id: uuidv4(),
      status: "success",
      type: "showChat",
      ...chat,
    });
  });

  return result;
};

export const formatAdminChats = (chats: Chats[]) => {
  let result: AllAdminChats[] = [];
  chats.map((chat) => {
    let toBeInserted: AdminChats[] = [];
    chat.chats.map((messages) => {
      toBeInserted.push({
        ...messages,
        id: uuidv4(),
        status: "success",
        type: "showChat",
      });
    });
    result.push({
      ...chat,
      chats: toBeInserted,
    });
  });

  return result;
};

export const generateChatsFromAdminChatState = (chats: AdminChatType) => {
  let result: Chat[] = [];
};
