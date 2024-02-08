"use client";

import { createRef, useEffect, useRef, useState } from "react";
import ChatUi from "./ChatUi";
import { Send } from "lucide-react";
import InputElement from "@/components/Input";
import "./styles.css";
import "@/helpers/styles.css";

type ChatType = {
  message: string;
  timeStamp: string;
  author: "client" | "admin";
};

const UserChatDialog = () => {
  const [chats, setChatState] = useState<ChatType[]>([
    {
      message: "Hi, im looking to make enquiries",
      timeStamp: "now",
      author: "client",
    },
    {
      message: "My name is Josephine",
      timeStamp: "now",
      author: "client",
    },
    {
      message: "Heard your cleaning service is the best",
      timeStamp: "now",
      author: "client",
    },
    {
      message: "Hi, im looking to make enquiries",
      timeStamp: "now",
      author: "client",
    },
    {
      message: "Hi, im looking to make enquiries",
      timeStamp: "now",
      author: "client",
    },
    {
      message: "Hi, im looking to make enquiries",
      timeStamp: "now",
      author: "client",
    },
    {
      message: "Hi, im looking to make enquiries",
      timeStamp: "now",
      author: "client",
    },
  ]);

  const [reply, setReply] = useState<ChatType>({
    message: "",
    timeStamp: "now",
    author: "admin",
  });


  const chatMessagesRef = useRef<HTMLDivElement>(null);

  // scroll the messages div tothe bottom automatically when user sends a reply
  useEffect(()=>{
    if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop =
          chatMessagesRef.current.scrollHeight;
      }
  }, [chats])

  return (
    <section className="bg-homegray w-full h-full">
      {/* main chat */}
      <div
        className="bg-homegray max-w-full h-[80%] overflow-y-scroll p-6"
        ref={chatMessagesRef}
      >
        {chats.map((chat) => {
          return (
            <>
              <ChatUi
                message={chat.message}
                timeStamp={chat.timeStamp}
                className={"w-[70%]"}
                author={chat.author}
              />
            </>
          );
        })}
      </div>
      {/* text area */}
      <div className="bg-greengray relative m-6">
        <div className="flex rounded-sm">
          <div className="w-full rounded-sm">
            <InputElement
              className="w-full p-4 pr-8 focus:bg-white rounded-sm"
              placeholder="Reply message"
              value={reply.message}
              onChange={(event) => {
                setReply((prevState) => {
                  return {
                    ...prevState,
                    message: event.target.value,
                    author: "admin",
                    timeStamp: "now",
                  };
                });
              }}
            />
          </div>
        </div>
        <div
          className={`flex justify-center items-center text-slate-400 hover:text-white absolute right-0 top-[0] hover:bg-accentcol p-[6px] rounded-sm hover:rounded-sm ${
            reply.message === "" && "pointer-events-none"
          }`}
          onClick={() => {
            setChatState((prevState) => {
              setReply({
                message: "",
                timeStamp: "",
                author: "admin",
              });
              return [...prevState, reply];
            });

            
          }}
        >
          <Send />
        </div>
      </div>
    </section>
  );
};

export default UserChatDialog;
