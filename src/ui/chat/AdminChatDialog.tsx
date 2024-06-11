"use client";

import {
  Dispatch,
  FC,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import ShowChatUi from "./ShowChatUi";
import "./styles.css";
import "@/helpers/styles.css";
import { v4 as uuidv4 } from "uuid";
import SaveChatUi from "./SaveChatUi";
import AdminChatInput from "./AdminChatInput";
import { ClientSideChatType } from "./UserChatDialog";
import SaveUserName from "./SaveUserName";
import { AllAdminChats } from "@/components/admin-dashboard/types";

export const initialMessageState: ClientSideChatType = {
  id: uuidv4(),
  type: "saveChat",
  message: "",
  timeStamp: Date.now(),
  recipientsId: ["client"],
  author: "client",
  status: "success",
};

export type ChatStatus = "failed" | "success";

export type ChatType = {
  message: string;
  timeStamp: number;
  recipientsId: string[];
  author: "admin" | "client";
  status?: ChatStatus;
  type: "saveChat" | "showChat";
  id: string;
};

interface AdminChatDialogProps {
  chats: AllAdminChats;
  allChatsStore: AllAdminChats[];
  updateAllChatsStore: Dispatch<React.SetStateAction<AllAdminChats[]>>;
  chatStoreRef: MutableRefObject<AllAdminChats[]>;
  updatedChatsStore: AllAdminChats[];
}

const AdminChatDialog: FC<AdminChatDialogProps> = ({
  chats: messages,
  updateAllChatsStore,
  allChatsStore,
}) => {

const [toggleScrollDiv, setToggleScrolldiv] = useState<boolean>(false)


  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const generateChatUi = () => {
    let result = [];
   

    let toBeMapped = messages.chats;

    result = toBeMapped.map((chat, index) => {
      if (chat.author === "admin") {
        return (
          <SaveChatUi
            key={uuidv4()}
            status={chat.status && chat.status}
            message={chat.message}
            timeStamp={chat.timeStamp}
            className={"w-[70%] md:w-[45%]"}
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
          className={"w-[70%] md:w-[45%]"}
          isAdmin={true}
          author={chat.author}
        />
      );
    });

    return result;
  };



  // scroll the messages div tothe bottom automatically when user sends a reply
  useEffect(() => {
  console.log("scrolling................")
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages.chats, toggleScrollDiv]);


  return (
    <section className="bg-homegray w-full">
      {/* main chat */}
      <SaveUserName
        nameOfUser={
          messages.name.length > 0
            ? messages.name.slice(0, 11)
            : messages.userId.slice(-12)
        }
        userId={messages.userId}
      />
      <div
        ref={chatMessagesRef}
        className="bg-homegray w-full h-[60vh] overflow-y-scroll p-6"
      >
        {generateChatUi()}
      </div>
      <div>
        <AdminChatInput
          // updateChatStore={
          //   updatedAdminChats.length === 0
          //     ? setAdminChatsState
          //     : setUpdatedAdminChats
          // }
          updateAllChatsStore={updateAllChatsStore}
          isAdmin={true}
          userId={messages.userId}
          chatStore={allChatsStore}
          setToggleScrollDiv = {setToggleScrolldiv}
          // isUpdatingLocalChatStoreState={
          //   updatedAdminChats.length === 0 ? false : true
          // }
          // updateLocalChatStoreStatefxn={setUpdatedAdminChats}
        />
      </div>
    </section>
  );
};

export default AdminChatDialog;
