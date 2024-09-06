"use client";
import { getSocketInstance } from "@/lib/socket.io/connectToMsgServerAsync";
// import { socket } from "@/lib/socket.io/connectToMsgServer";
import ChatTool from "@/ui/chat/ChatTool";
import UserChat from "@/ui/chat/UserChat";
import { ClientSideChatType } from "@/ui/chat/UserChatDialog";
import FeedbackTool from "@/ui/FeedbackTool";
import PhoneTool from "@/ui/PhoneTool";
import { usePathname } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Tools: FC = (): React.ReactNode => {
  const currentRoute = usePathname();

  const [isChatDialogOpen, setIsChatDialogOpen] = useState<boolean>(false);

  const [updatedChats, setUpdatedChats] = useState<ClientSideChatType[]>([]);

 const [isNewMessage, setIsNewMessage] = useState({
  isNew: false,
  message: "",
 })

  useEffect(() => {
    const setUpSocketServerConnection = async()=>{
      const socket = await getSocketInstance();
      socket.on("send-message", (payload: (ClientSideChatType | null)[]) => {
        if(payload.length){ 
          let newMessage = payload[payload?.length - 1]?.message 
          if (newMessage  && !isChatDialogOpen) {
            setIsNewMessage({
              isNew: true,
              message: newMessage
            })
          }
        }
      });
    }

    setUpSocketServerConnection()
  }, []);

  useEffect(() => {

     if(isNewMessage.isNew){
      toast(`New message ${isNewMessage.message}`)
     }

     setIsNewMessage({
      isNew: false,
      message: ""
     })
  }, [isNewMessage.isNew]);

  const uiTools = (): React.ReactNode => {
    console.log(currentRoute);
    if (currentRoute && currentRoute !== "/admin-dashboard") {
      return (
        <div className="flex fixed bottom-3 py-2 z-40 mb-1 px-2">
          <PhoneTool />
          <FeedbackTool />
          <ChatTool handleChatDialogState={setIsChatDialogOpen} chatDialogState={isChatDialogOpen}/>
          {isChatDialogOpen && <UserChat openDialog = {setIsChatDialogOpen} updatedChats={updatedChats} setUpdatedChats={setUpdatedChats}/>}
        </div>
      );
    }

    return <div className="hidden"></div>;
  };

  return <>{uiTools()}</>;
};

export default Tools;
