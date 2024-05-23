"use client";

import { Bird, ChevronLeft, Loader2 } from "lucide-react";
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

  return (
    <section className="fixed top-20 w-full h-[80vh] flex flex-col items-center z-50">
      <div className="flex flex-col items-center w-[80%] rounded-lg h-[70vh] bg-white z-70 shadow-2xl overflow-x-clip">
        <div className="bg-accentcol w-full h-[50px] flex items-center justify-center">
          <div className="flex items-center w-[90%] justify-around">
            <div
              className="text-white/90 hover:cursor-pointer hover:scale-[1.3]"
              onClick={() => {
                openDialog(false);
              }}
            >
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
          {!error && !isLoading && userId !== "" && (
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
    </section>
  );
};

export default UserChat;
