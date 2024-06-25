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
import toast from "react-hot-toast";

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
    allNewMessages: ClientSideChatType[],
    newMessage: ClientSideChatType;
  }>({
    isNew: false,
    newMessage: initialMessageState,
    allNewMessages: []
  });

  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const isConnectedToMsgServerRef = useRef<boolean>(false);

  const generateChatUi = () => {
    let result:React.ReactNode[] = [];

    let toBeMapped = messages;
    console.log("messages to be mapped generate chat ui", messages)
     toBeMapped.map((chat, index) => {
      if (chat.author === "client") {
        result.push(
          <SaveChatUi
          key={uuidv4()}
          status={chat.status && chat.status}
          message={chat.message}
          timeStamp={chat.timeStamp}
          className={"w-[70%]"}
          author={chat.author}
          isAdmin={false}
        />
        )
      }else{
        result.push(
          <ShowChatUi
          key={uuidv4()}
          message={chat.message}
          timeStamp={chat.timeStamp}
          className={"w-[70%]"}
          isAdmin={false}
          author={chat.author}
        />
        )
      }
    });

    console.log("result of generateChatUi ", result)
    return result;
  };

  useEffect(() => {
    // update the messagesRef on each rerender
    setIsNewMessage({
      isNew: true,
      newMessage: messages[messages.length - 1],
      allNewMessages: []
    })
  }, [messages]);



  useEffect(() => {
    // scroll the messages div to the bottom automatically when user sends a message
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [updatedChats]);

  useEffect(() => {
    socket.on("admin-message", (receivedMessages: ClientSideChatType[] | null) => {
      if (receivedMessages?.length) {
        // console.log("i rannnnnnnnnnnnn");
        setIsNewMessage({
          isNew: true,
          allNewMessages: receivedMessages,
          newMessage: receivedMessages[receivedMessages.length - 1],
        });

        let allReceivedMssgsId:string[] = receivedMessages.map((message)=>{
           return message.id
        })
        // notify the server of recieved messages 
        socket.emit("message-received", {
          messageIds: allReceivedMssgsId,
          userId: userId
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
          isNewMessage.allNewMessages
        );
        console.log("chat state about to be rendered ... ", newChatState);
        setUpdatedChats(newChatState);
      } else {
        newChatState = updateChatStoreHelper(
          updatedChats,
          isNewMessage.allNewMessages
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
      allNewMessages: [],
    });
  }, [isNewMessage.isNew]);

  useEffect(() => {
    // register user socket Id
    if (!isConnectedToMsgServerRef.current && typeof userId === "string" && userId !== "") {
      console.log("registering... user ");

      // get the session from localStorage if one exists
      const sessionId = localStorage.getItem("sessionId")
      console.log(sessionId, userId)
      // add the userId and socketId to the socket and connect
      socket.auth = {sessionId, userId}
      socket.connect()


      socket.emit("register-user", {
        userId: userId,
      });
      isConnectedToMsgServerRef.current = true;
    }

  }, [isConnectedToMsgServerRef.current]);

  // CLEANUP ALL EFFECTS IN THIS COMPONENT
  useEffect(()=>{
    // attach the session id to the next reconnection attempts
    socket.on("session", (sessionData)=>{
        socket.auth = { sessionId: sessionData?.sessionId, userId }

        //  store it in the localStorage 
        localStorage.setItem("sessionId", sessionData.sessionId);
        // save the Id of the user
        // @ts-ignore
        socket.userId = userId;
        // @ts-ignore
        console.log("saved userId ", socket.userId)
   })

   // clean up the effects
 
  }, [])

  useEffect(()=>{
    // attach the session id to the next reconnection attempts
    socket.on("diconnect", ()=>{
        toast("Disconnected");
   })
   // clean up the effects
  }, [])

  // CLEANUP ALL EFFECTS IN THIS COMPONENT
  useEffect(()=>{
    socket.on("connect_error", ()=>{
      console.log("Could not connect to chat server");

      // set is connected to messages server to false
      isConnectedToMsgServerRef.current = false
   })

   socket.on("connect", ()=>{
    if(socket.recovered){
      // @ts-ignore
      console.log("recovered messagesssssssssss")
    }
  })

  socket.on("connection-recovered", (last20Msgs:any)=>{
    console.log("last 20 msgs are", last20Msgs)
  })

   // clean up the effects
   return ()=>{
     socket.off("connect_error")
   }
  }, [])

  return (
    <section className="bg-homegray w-full h-full">
      {/* main chat */}
      <div
        className="bg-homegray max-w-full h-[75%] overflow-y-scroll p-6 md:max-h-[350px]"
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
          updateChatStore={updateLocalChatStoreStatefxn}
          isAdmin={false}
          chatStore={messages}
          userId={userId}
          isUpdatingLocalChatStoreState={isUpdatingLocalChatStoreState}
          updateLocalChatStoreStatefxn={updateLocalChatStoreStatefxn}
        />
      </div>
    </section>
  );
};

export default UserChatDialog;
