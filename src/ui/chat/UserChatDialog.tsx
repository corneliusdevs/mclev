"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import "./styles.css";
import "@/helpers/styles.css";
import { v4 as uuidv4 } from "uuid";
import ShowChatUi from "./ShowChatUi";
import SaveChatUi from "./SaveChatUi";
import ChatInput from "./ChatInput";
import { Chats } from "@/db/models/chat-model";
import { Send } from "lucide-react";

export type ChatStatus = "failed" | "success";
export type ChatType = {
  message: string;
  timeStamp: number;
  recipientsId: string[];
  author: "admin" | "client";
  type: "showChat" | "saveChat";
  id: string;
};

export type ClientSideChatType = ChatType & {
  status?: ChatStatus;
};

interface UserChatDialogProps {
  chats: Chats;
}

const UserChatDialog: FC<UserChatDialogProps> = ({ chats: messages }) => {
  const generateUserChatState = (chats: Chats) => {
    let result: ClientSideChatType[] = [];
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
  const [chats, setChats] = useState<ClientSideChatType[]>([
    ...generateUserChatState(messages),
  ]);

  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const generateChatUi = () => {
    let result = [];
    // if (error) {
    //   return (
    //     <div className="flex w-full h-full text-sm justify-center items-center text-center pt-[80px]">
    //       Oops! Chat is Unavailable at the moment.
    //     </div>
    //   );
    // }

    if (chats.length === 0) {
      result.push(
        <div className="w-full h-full flex justify-center items-center pt-14">
          <div className="flex flex-col">
            <div className="flex justify-center text-gray-500 transform rotateYOnHover">
              <Send className="h-8 w-8" strokeWidth={1} />{" "}
            </div>
            <p className="flex items-center justify-center text-gray-600 text-xl">
              Send a message
            </p>
          </div>
        </div>
      );

      return result
    }

    result = chats.map((chat, index) => {
      if (chat.author === "client") {
        return (
          <SaveChatUi
            key={uuidv4()}
            status={chat.status && chat.status}
            message={chat.message}
            timeStamp={chat.timeStamp}
            className={"w-[70%]"}
            author={chat.author}
            isAdmin={false}
          />
        );
      }
      return (
        <ShowChatUi
          key={uuidv4()}
          message={chat.message}
          timeStamp={chat.timeStamp}
          className={"w-[70%]"}
          isAdmin={false}
          author={chat.author}
        />
      );
    });

    return result;
  };

  useEffect(() => {
    // scroll the messages div to the bottom automatically when user sends a message
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chats]);

  return (
    <section className="bg-homegray w-full h-full">
      {/* main chat */}
      <div
        className="bg-homegray max-w-full h-[80%] overflow-y-scroll p-6"
        ref={chatMessagesRef}
      >
        {generateChatUi()}
      </div>
      <div>
        <ChatInput updateChatStore={setChats} isAdmin={false} />
      </div>
    </section>
  );
};

export default UserChatDialog;
