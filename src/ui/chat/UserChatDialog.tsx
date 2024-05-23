"use client";

import React, {
  Dispatch,
  FC,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import "./styles.css";
import "@/helpers/styles.css";
import { v4 as uuidv4 } from "uuid";
import ShowChatUi from "./ShowChatUi";
import SaveChatUi from "./SaveChatUi";
import ChatInput from "./ChatInput";
import { Send } from "lucide-react";
import { socket } from "@/lib/socket.io/connectToMsgServer";
import updateChatStoreHelper from "@/helpers/updateChatStoreHelper";

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
  chats: ClientSideChatType[];
  userId: string;
  isUpdatingLocalChatStoreState: boolean;
  updateLocalChatStoreStatefxn: Dispatch<SetStateAction<ClientSideChatType[]>>;
  updatedChats: ClientSideChatType[];
  setUpdatedChats: Dispatch<SetStateAction<ClientSideChatType[]>>;
  allMessagesRef: MutableRefObject<ClientSideChatType[]>;
}

const UserChatDialog: FC<UserChatDialogProps> = ({
  chats: messages,
  userId,
  updatedChats,
  setUpdatedChats,
  isUpdatingLocalChatStoreState,
  updateLocalChatStoreStatefxn,
}) => {

  const [localMessagesState, setLocalMessagesState] = useState<ClientSideChatType[]>([])
  const messagesRef: MutableRefObject<ClientSideChatType[]> = useRef([
    ...messages,
  ]);

  const initialMessageState: ClientSideChatType = {
    id: uuidv4(),
    type: "saveChat",
    message: "",
    timeStamp: Date.now(),
    recipientsId: ["client"],
    author: "client",
    status: "success",
  };

  // console.log("user chat dialog..............",  );

  const [isNewMessage, setIsNewMessage] = useState<{
    isNew: boolean;
    newMessage: ClientSideChatType;
  }>({
    isNew: false,
    newMessage: initialMessageState,
  });

  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const isConnectedToMsgServerRef = useRef<boolean>(false);

  const generateChatUi = () => {
    let result = [];

    // console.log("generating chat ui....");

    // if (messagesRef.current.length === 0) {
    //   result.push(
    //     <div className="w-full h-full flex justify-center items-center pt-14">
    //       <div className="flex flex-col">
    //         <div className="flex justify-center text-gray-500 transform rotateYOnHover">
    //           <Send className="h-8 w-8" strokeWidth={1} />{" "}
    //         </div>
    //         <p className="flex items-center justify-center text-gray-600 text-xl">
    //           Send a message
    //         </p>
    //       </div>
    //     </div>
    //   );

    //   return result;
    // }

    let toBeMapped = messages;
    result = toBeMapped.map((chat, index) => {
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
    // update the messagesRef on each rerender
    setIsNewMessage({
      isNew: true,
      newMessage: messages[messages.length - 1]
    })
  }, [messages]);



  useEffect(() => {
    // scroll the messages div to the bottom automatically when user sends a message
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [updatedChats]);

  useEffect(() => {
    socket.on("send-message", (payload: ClientSideChatType | null) => {
      if (payload) {
        // console.log("i rannnnnnnnnnnnn");
        setIsNewMessage({
          isNew: true,
          newMessage: payload,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (isNewMessage.isNew) {
      let newChatState: ClientSideChatType[] = [];

      if (updatedChats.length === 0) {
        newChatState = updateChatStoreHelper(
          messagesRef.current,
          isNewMessage.newMessage
        );
        // console.log("ifffffffffffffff ... ", newChatState);
        setUpdatedChats(newChatState);
      } else {
        newChatState = updateChatStoreHelper(
          updatedChats,
          isNewMessage.newMessage
        );
        // console.log("elsssssssssseeeeeeeee ... ", newChatState);
        setUpdatedChats(newChatState);
      }

      // do not edit unless you know absolutely what you're doing
      messagesRef.current = [...newChatState];

      // update the local chat state
      setLocalMessagesState(newChatState)
    }
    setIsNewMessage({
      isNew: false,
      newMessage: initialMessageState,
    });
  }, [isNewMessage.isNew]);

  useEffect(() => {
    // register user socket Id
    if (!isConnectedToMsgServerRef.current && typeof userId === "string" && userId !== "") {
      console.log("registering... user ");
      socket.emit("register-user", {
        userId: userId,
      });
      isConnectedToMsgServerRef.current = true;
    }

  }, [isConnectedToMsgServerRef.current]);

  return (
    <section className="bg-homegray w-full h-full">
      {/* main chat */}
      <div
        className="bg-homegray max-w-full h-[80%] overflow-y-scroll p-6"
        ref={chatMessagesRef}
      >
        {messagesRef.current.length === 0 ? (
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
        ) : (
          generateChatUi()
        )}
        {/* {generateChatUi()} */}
      </div>
      <div>
        <ChatInput
          // updateChatStore={
          //   updatedChats.length === 0 ? setChats : setUpdatedChats
          // }
          updateChatStore={updateLocalChatStoreStatefxn}
          isAdmin={false}
          // chatStore={updatedChats.length === 0 ? chats : updatedChats}
          chatStore={messages}
          userId={userId}
          // isUpdatingLocalChatStoreState={
          //   updatedChats.length === 0 ? false : true
          // }
          isUpdatingLocalChatStoreState={isUpdatingLocalChatStoreState}
          // updateLocalChatStoreStatefxn={setUpdatedChats}
          updateLocalChatStoreStatefxn={updateLocalChatStoreStatefxn}
        />
      </div>
    </section>
  );
};

export default UserChatDialog;
