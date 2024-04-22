"use client";

import { FC, useEffect, useRef, useState } from "react";
import ShowChatUi from "./ShowChatUi";
import "./styles.css";
import "@/helpers/styles.css";
import { v4 as uuidv4 } from "uuid";
import SaveChatUi from "./SaveChatUi";
import { Chats } from "@/db/models/chat-model";
import AdminChatInput from "./AdminChatInput";

export type ChatStatus = "failed" | "success";

type ChatType = {
  message: string;
  timeStamp: number;
  recipientsId: string[];
  author: "admin" | "client";
  status?: ChatStatus;
  type: "saveChat" | "showChat",
  id: string;
};


interface AdminChatDialogProps {
  chats: Chats
}

const AdminChatDialog:FC<AdminChatDialogProps> = ({
  chats: messages
}) => {

  const generateAdminChatState = (chats: Chats)=>{
      let result: ChatType[] = [];
      chats.chats.map((chat)=>{
        result.push ({
           id: uuidv4(),
           status: "success",
           type: "showChat",
           ...chat
        })
      })

      return result
  }
  const [adminChats, setAdminChatState] = useState<ChatType[]>([ ...generateAdminChatState(messages)
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

    result = adminChats.map((chat, index) => {
      if (chat.author === "admin") {
        return (
          <SaveChatUi
            key={uuidv4()}
            status={chat.status && chat.status}
            message={chat.message}
            timeStamp={chat.timeStamp}
            className={"w-[70%]"}
            author={chat.author}
            isAdmin={true}
          />
        );
      }
      return (
        <ShowChatUi
          key={uuidv4()}
          message={chat.message}
          timeStamp={chat.timeStamp}
          className={"w-[70%]"}
          isAdmin={true}
          author={chat.author}
        />
      );
    });

    return result;
  };

  // scroll the messages div tothe bottom automatically when user sends a reply
  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [adminChats]);

  return (
    <section className="bg-homegray w-full">
      {/* main chat */}
      <div
        ref={chatMessagesRef}
        className="bg-homegray w-full h-[70vh] overflow-y-scroll p-6"
      >
        {
          generateChatUi()
        }

      </div>
      <div>
        <AdminChatInput updateChatStore={setAdminChatState} isAdmin = {true} recipientId = {messages.userId}/>
      </div>
  
    </section>
  );
};

export default AdminChatDialog;
