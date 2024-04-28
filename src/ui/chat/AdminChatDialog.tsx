"use client";

import { Dispatch, FC, MutableRefObject, useEffect, useRef, useState } from "react";
import ShowChatUi from "./ShowChatUi";
import "./styles.css";
import "@/helpers/styles.css";
import { v4 as uuidv4 } from "uuid";
import SaveChatUi from "./SaveChatUi";
import { Chats } from "@/db/models/chat-model";
import AdminChatInput from "./AdminChatInput";
import updateChatStoreHelper from "@/helpers/updateChatStoreHelper";
import { ClientSideChatType } from "./UserChatDialog";
import { socket } from "@/lib/socket.io/connectToMsgServer";


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
  chats: Chats;
  otherChatsStore: Chats[],
  updateOtherChatsStore: Dispatch<React.SetStateAction<Chats[]>>
}

const AdminChatDialog: FC<AdminChatDialogProps> = ({ chats: messages }) => {
  const generateAdminChatState = (chats: Chats) => {
    let result: ChatType[] = [];
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

  const generatedMessages = generateAdminChatState(messages);
  const [adminChats, setAdminChatsState] = useState<ChatType[]>([
    ...generatedMessages,
  ]);

  const adminMessagesRef: MutableRefObject<ChatType[]> = useRef([
    ...generatedMessages,
  ]);

  const [updatedAdminChats, setUpdatedAdminChats] = useState<ChatType[]>([]);

  const [shouldUpdateOtherChats, setShouldUpdateOtherChats] = useState<boolean>(false);


  const [isNewMessage, setIsNewMessage] = useState<{
    isNew: boolean;
    newMessage: ChatType;
  }>({
    isNew: false,
    newMessage: initialMessageState,
  });



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

    let toBeMapped =
      updatedAdminChats.length === 0 ? adminChats : updatedAdminChats;

    result = toBeMapped.map((chat, index) => {
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
  }, [adminChats, updatedAdminChats]);

  useEffect(() => {
    console.log("listening to user")
    socket.on("user-message", (message: ClientSideChatType | null, userId: string) => {
      if (message && messages.userId === userId) {
        console.log("payload gottten admin")
        setIsNewMessage({
          isNew: true,
          newMessage: message,
        });
      }

      // update other chats
      if(message && messages.userId !== userId){
        setShouldUpdateOtherChats(true)
      }
    });
  }, []);

  useEffect(() => {
    if (isNewMessage.isNew) {
      let newChatState: ChatType[] = [];

      if (updatedAdminChats.length === 0) {
        newChatState = updateChatStoreHelper(
          adminMessagesRef.current,
          isNewMessage.newMessage
        );
        console.log("ifffffffffffffff ... ", newChatState);
        setUpdatedAdminChats(newChatState);
      } else {
        newChatState = updateChatStoreHelper(
          updatedAdminChats,
          isNewMessage.newMessage
        );
        console.log("elsssssssssseeeeeeeee ... ", newChatState);
        setUpdatedAdminChats(newChatState);
      }

      // do not edit unless you know absolutely what you're doing
      adminMessagesRef.current = [...newChatState];
    }
    setIsNewMessage({
      isNew: false,
      newMessage: initialMessageState,
    });
  }, [isNewMessage.isNew]);


  useEffect(()=>{
    if(shouldUpdateOtherChats){


      // you will update the all messages page!!!
      setShouldUpdateOtherChats(false)
    }

  }, [shouldUpdateOtherChats])

  return (
    <section className="bg-homegray w-full">
      {/* main chat */}
      <div
        ref={chatMessagesRef}
        className="bg-homegray w-full h-[70vh] overflow-y-scroll p-6"
      >
        {generateChatUi()}
      </div>
      <div>
        <AdminChatInput
          updateChatStore={
            updatedAdminChats.length === 0
              ? setAdminChatsState
              : setUpdatedAdminChats
          }
          isAdmin={true}
          recipientId={messages.userId}
          chatStore={
            updatedAdminChats.length === 0 ? adminChats : updatedAdminChats
          }
          isUpdatingLocalChatStoreState={
            updatedAdminChats.length === 0 ? false : true
          }
          updateLocalChatStoreStatefxn={setUpdatedAdminChats}
          
        />
      </div>
    </section>
  );
};

export default AdminChatDialog;
