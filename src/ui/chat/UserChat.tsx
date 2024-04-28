"use client";
import { Bird, ChevronLeft, Loader2, Send } from "lucide-react";
import Image from "next/image";
import UserChatDialog, { ChatType, ClientSideChatType } from "./UserChatDialog";
import { trpc } from "@/trpc-client/client";
import { useEffect, useRef, useState } from "react";
import { Chats } from "@/db/models/chat-model";
import { generateUserChatState } from "@/helpers/generateUserChatState";
import { socket } from "@/lib/socket.io/connectToMsgServer";


const UserChat = () => {
  const [allChats, setAllChats] = useState<ClientSideChatType[]>([]);
  const [isLoading, setIsloading] = useState<boolean>(true);

  const [userId, setUserId] = useState<string>("")

  const {
    data,
    isLoading: isFetchingChats,
    error,
  } = trpc.getAllUserChats.useQuery();

  useEffect(() => {
    // MAKE SURE TO HANDLE ERROR STATE
    if (error) {
      setIsloading(false);
    }

    if (!isFetchingChats) {
      if (data?.httpStatus === 200) {
        console.log("all chats are ", data.chats);
        if (data.chats) {
          const generatedUserChats = generateUserChatState(data.chats);
          setAllChats(generatedUserChats);
          setIsloading(false);
          setUserId(data.chats.userId)
        }
      } else {
        setIsloading(false);
      }
    }
  }, [isFetchingChats]);



  return (
    <section className="fixed top-20 w-full h-[80vh] flex flex-col items-center z-50">
      <div className="flex flex-col items-center w-[80%] rounded-lg h-[70vh] bg-white z-70 shadow-2xl overflow-x-clip">
        <div className="bg-accentcol w-full h-[50px] flex items-center justify-center">
          <div className="flex items-center w-[90%] justify-around">
            <div className="text-white/90 hover:cursor-pointer hover:scale-[1.3]">
              <ChevronLeft />
            </div>
            <div className="">
              <Image
                src={"/assets/mclev_logo.jpg"}
                alt={"mclev logo"}
                height={40}
                width={40}
                className="h-[30px] w-[30px] rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="ml-2 text-white/90 tracking-tight">
              <span>McLev Cleaning Company</span>
            </div>
          </div>
        </div>
        <div className="bg-white h-[60vh] w-[98%]">
          {isFetchingChats && (
            <div className="w-full h-[65vh] flex justify-center items-center">
              <div className="flex flex-col items-center gap-2 text-center px-12">
                <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
                <h3 className="text-xl">Fetching...</h3>
              </div>
            </div>
          )}
          {!isFetchingChats && error && (
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
          {!error && !isLoading && !isFetchingChats && (
            <UserChatDialog chats={allChats} userId= {userId} />
          )}
        </div>
      </div>
    </section>
  );
};

export default UserChat;
