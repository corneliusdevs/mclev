"use client";

import { Bird, ChevronLeft, Loader2, X } from "lucide-react";
import Image from "next/image";
import UserChatDialog, { ClientSideChatType } from "./UserChatDialog";
import { trpc } from "@/trpc-client/client";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { generateUserChatState } from "@/helpers/generateUserChatState";
import { createPortal } from "react-dom";
import { socket } from "@/lib/socket.io/connectToMsgServer";



// THIS COMPONENT IS RENDERED IN A PORTAL LOCATED IN THE APP LAYOUT FILE
interface UserChatProps {
  openDialog: Dispatch<SetStateAction<boolean>>;
  updatedChats: ClientSideChatType[];
  setUpdatedChats: Dispatch<SetStateAction<ClientSideChatType[]>>;
}

const UserChat = ({
  openDialog,
  updatedChats,
  setUpdatedChats,
}: UserChatProps) => {
  const [allChats, setAllChats] = useState<ClientSideChatType[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [isChatUnavailable, setIsChatUnavailable] = useState<boolean>(false);

  const [userId, setUserId] = useState<string>("");
  const [isConnected, setIsConnected ] = useState<boolean>(false)

  const {
    data,
    isLoading: isFetchingChats,
    error,
  } = trpc.userChats.getAllUserChats.useQuery();

  const {
    data: genUserIdRes,
    isLoading: isGeneratingUserId,
    error: genUserIdErr,
  } = trpc.userChats.generateUserId.useQuery();

  const messagesRef: MutableRefObject<ClientSideChatType[]> = useRef([
    // reservations about this line
    ...allChats,
  ]);

  useEffect(() => {
    // MAKE SURE TO HANDLE ERROR STATE
    if (error) {
      setIsloading(false);
    }

    if (!isFetchingChats && !isGeneratingUserId) {
      if (genUserIdRes?.httpStatus === 201) {
        console.log("user Id is ", genUserIdRes.userId);
        setUserId((currentVal) => {
          if (currentVal === "") {
            return genUserIdRes.userId;
          } else {
            return currentVal;
          }
        });
      } else {
        console.log("500 err.........");
        setIsChatUnavailable(true);
      }

      if (data?.httpStatus === 200) {
        console.log("all chats are ", data.chats);

        if (data.chats) {
          const generatedUserChats = generateUserChatState(data.chats);
          setAllChats(generatedUserChats);
          setIsloading(false);
          setUserId((currentVal)=>{
            if(currentVal === ""){
              return data.chats.userId
            }else{
              return currentVal
            }
          });
        }
      } else {
        setIsloading(false);
      }
    }

    console.log("user isddddddddddd", userId);
  }, [isFetchingChats, isGeneratingUserId]);

  useEffect(()=>{
    // attach the session id to the next reconnection attempts
    socket.on("diconnect", ()=>{
      setIsConnected(false)
   })
   // clean up the effects
  }, [])

  useEffect(()=>{
    socket.on("connect_error", ()=>{
      console.log("Could not connect to chat server");
      setIsConnected(false)

      // set is connected to messages server to false
   })

   socket.on("connect", ()=>{
    setIsConnected(true)
    if(socket.recovered){
console.log("recovered messagesssssssssss")
    }
  })

  socket.on("connection-recovered", (last20Msgs:any)=>{
    setIsConnected(true);
    console.log("last 20 msgs are", last20Msgs)
  })

   // clean up the effects
   return ()=>{
     socket.off("connect_error")
   }
  }, [])

  const determineChatStore = (): ClientSideChatType[] => {
    if (updatedChats.length === 0) {
      if (messagesRef.current.length > 0) {
        console.log("sdfgnv");
        return messagesRef.current;
      } else {
        console.log("54321nm,x");
        return allChats;
      }
    }

    console.log("3wsiuhjkxoppa");
    return updatedChats;
  };

  return createPortal(
    <section className="fixed top-[56px] md:top-20 w-full h-full flex flex-col items-center z-50 md:items-end md:w-[40vw] md:max-w-[500px] md:sticky md:mt-[10px] md-h-full md:mr-[10px] md:h-[400px]">
      <div className="flex flex-col items-center w-full rounded-lg h-full bg-white z-[30] shadow-2xl overflow-x-clip md:h-[400px] md:w-full">
        <div className="bg-accentcol w-full h-[50px] flex items-center justify-start">
          <div className="flex items-center w-[90%] justify-evenly max-w-[250px] md:ml-[30px]">
            <div
              className="text-white/90 hover:cursor-pointer hover:scale-[1.3]"
              onClick={() => {
                openDialog(false);
              }}
            >
              <X />
            </div>
            <div className="hidden md:block">
              <Image
                src={"/assets/mclev_logo.jpg"}
                alt={"mclev logo"}
                height={40}
                width={40}
                className="h-[30px] w-[30px] rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="ml-2 text-white/90 tracking-tight">
              <span>{isConnected ? "Connected" : "Connecting..."}</span>
            </div>
          </div>
        </div>
        <div className="bg-white h-[80%] md:h-[60vh] w-[98%]">
          {isFetchingChats && (
            <div className="w-full h-full md:h-[65vh] flex justify-center items-center">
              <div className="flex flex-col items-center gap-2 text-center px-12">
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
                <h3 className="text-xl">Fetching...</h3>
              </div>
            </div>
          )}
          {((!isFetchingChats && error) ||
            (!isGeneratingUserId && genUserIdErr) ||
            isChatUnavailable) && (
            <div className="w-full h-[50vh] flex justify-center items-center">
              <div className="flex flex-col">
                <div className="flex justify-center text-gray-500 transform rotateYOnHover">
                  <Bird className="h-8 w-8" strokeWidth={1} />{" "}
                </div>
                <p className="flex items-center justify-center text-gray-600 text-xl">
                  Oops! Something Went Wrong
                </p>
              </div>
            </div>
          )}
          {
            // allChats[0].userId
          }
          {!error && !isLoading && userId !== "" && (
            <UserChatDialog
              chats={determineChatStore()}
              userId={userId}
              isUpdatingLocalChatStoreState={
                updatedChats.length === 0 ? false : true
              }
              updateLocalChatStoreStatefxn={setUpdatedChats}
              updatedChats={updatedChats}
              setUpdatedChats={setUpdatedChats}
              allMessagesRef={messagesRef}
            />
          )}
          {error && !isLoading && userId === "" && (
            <div className="w-full h-[50vh] flex justify-center items-center">
              <div className="flex flex-col">
                <div className="flex justify-center text-gray-500 transform rotateYOnHover">
                  <Bird className="h-14 w-14" strokeWidth={1} />{" "}
                </div>
                <p className="flex items-center justify-center text-gray-600 text-center">
                  Oops! Chat is unavailable right now.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>, 
    // used the non-null assertion here
    document.getElementById("userchat-portal-root")!
  );
};

export default UserChat;
