"use client";

import AdminNavbar from "@/ui/admin-dashboard/AdminNavbar";
import ChatList from "@/ui/admin-dashboard/ChatList";
import SearchUi from "@/ui/admin-dashboard/Search";
import Tab from "@/ui/admin-dashboard/Tab";
import AdminChatDialog, {
  initialMessageState,
} from "@/ui/chat/AdminChatDialog";
import React, { FC, useEffect, useRef, useState } from "react";
import Bookings from "./bookings/Bookings";
import { trpc } from "@/trpc-client/client";
import { Chats } from "@/db/models/chat-model";
import { Bird, Loader2 } from "lucide-react";
import { socket } from "@/lib/socket.io/connectToMsgServer";
import { getRegisterAdminSecret } from "@/lib/utils";
import { ClientSideChatType } from "@/ui/chat/UserChatDialog";
import updateAllAdminChats from "@/helpers/useUpdateAllAdminChats";


interface AdminDashboardUiProps {
  isAdminLoggedIn: boolean;
}

const AdminDashboardUi = ({
  isAdminLoggedIn,
}: AdminDashboardUiProps): React.ReactNode => {
  const [dashboardState, setDashboardState] = useState<
    "chats" | "dashboard" | "bookings" | "chatDialog"
  >("chats");

  const [emitToMessagesServer, setEmitToMessagesServer] = useState(false);

  const [allChats, setAllChats] = useState<Chats[]>([]);

  const allChatsRef = useRef<Chats[]>([]);
  const [allUpdatedChats, setAllUpdatedChatstate] = useState<Chats[]>([]);
  const [shouldUpdateAllChats, setShouldUpdateAllChats] = useState<{
    isNew: boolean;
    message: ClientSideChatType;
    userId: string;
  }>({
    isNew: false,
    message: initialMessageState,
    userId: "",
  });

  const [currentChat, setCurrentChat] = useState<Chats>({
    userId: "",
    chats: [
      {
        message: "",
        timeStamp: Date.now(),
        author: "admin",
        recipientsId: ["admin"],
        chatId: "",
      },
    ],
    isRead: false,
  });

  const {
    data,
    isLoading: isFetchingChats,
    error,
  } = trpc.getAllAdminChats.useQuery();

  useEffect(() => {
    // MAKE SURE TO HANDLE ERROR STATE
    if (error) {
      // setIsloading(false);
    }
    if (data && data?.chats.length !== 0) {
      setAllChats(data.chats);
      setEmitToMessagesServer(true);
    }
  }, [isFetchingChats, data]);

  useEffect(() => {
    // register admin socket Id
    if (emitToMessagesServer) {
      console.log("emmitting... chat input ", getRegisterAdminSecret());
      socket.emit("register-admin", {
        // fix this and ensure that it is stored in process.env
        adminSecret: "908vql099ac9043WEE7x2ADSERREG",
      });
    }

    setEmitToMessagesServer(false);
  }, [emitToMessagesServer]);

  useEffect(() => {
    console.log("listening to user");
    socket.on(
      "user-message",
      (message: ClientSideChatType | null, userId: string) => {
        if (message && typeof userId === "string") {
          console.log("message recieved");
          setShouldUpdateAllChats({
            isNew: true,
            message: message,
            userId: userId,
          });
        }
      }
    );
  }, []);

  useEffect(() => {
    if (shouldUpdateAllChats) {
      let newAllChatsState: Chats[] = [];

      if (allUpdatedChats.length === 0) {
        newAllChatsState = updateAllAdminChats({
          newMessage: shouldUpdateAllChats.message,
          messagesStore: allChats,
          userId: shouldUpdateAllChats.userId,
        });

        setAllUpdatedChatstate(newAllChatsState);
      } else {
        newAllChatsState = updateAllAdminChats({
          newMessage: shouldUpdateAllChats.message,
          messagesStore: allChatsRef.current,
          userId: shouldUpdateAllChats.userId,
        });
        setAllUpdatedChatstate(newAllChatsState);
      }

      //  do not edit unless you know what you're doing

      allChatsRef.current = [...newAllChatsState];

      setShouldUpdateAllChats({
        isNew: false,
        message: initialMessageState,
        userId: "",
      });
    }
  }, [shouldUpdateAllChats.isNew]);

  const determineDashboardUi = (): JSX.Element => {
    let dashboardUi = <div></div>;
   
    let chatsToBeMapped: Chats[] = allUpdatedChats.length === 0 ? allChats : allUpdatedChats

    switch (dashboardState) {
      case "chats":
        dashboardUi = (
          <div>
            {isFetchingChats ? (
              <div className="relative w-full h-[50vh] flex justify-center items-center">
                <div className="flex flex-col">
                  <div className="flex justify-center text-gray-500 animate-spin">
                    <Loader2 size={100} strokeWidth={1} />{" "}
                  </div>
                  <p className="flex items-center justify-center text-gray-600 text-xl">
                    Fetching...
                  </p>
                </div>
              </div>
            ) : (
              <Tab
                defaultTabValue={"chats"}
                tabList={[
                  {
                    tabName: "All Chats",
                    value: "chats",
                    tabUi: (
                      <div>
                        <SearchUi />
                        {chatsToBeMapped.length > 0 &&
                          chatsToBeMapped.map((chat, index) => {
                            console.log(chat);
                            return (
                              <ChatList
                                title={chat.userId.slice(-12)}
                                key={chat.userId}
                                subTitle=""
                                description={
                                  chat.chats[chat.chats.length - 1].message
                                }
                                timeStamp={"3 hours ago"}
                                unread={!chat.isRead}
                                clickHandler={() => {
                                  setDashboardState("chatDialog");
                                  setCurrentChat(chat);

                                  // emit store socketId and Admin Credentials to messages server

                                  setEmitToMessagesServer(true);
                                }}
                              />
                            );
                          })}
                      </div>
                    ),
                  },
                ]}
              />
            )}
          </div>
        );
        break;
      case "bookings":
        dashboardUi = (
          <div>
            <Bookings />
          </div>
        );
        break;
      case "chatDialog":
        dashboardUi = (
          <div className="w-full">
            <AdminChatDialog
              chats={currentChat}
              otherChatsStore={allChats}
              updateOtherChatsStore={setAllChats}
            />
          </div>
        );
        break;
      default:
        dashboardUi = <div>Dashboard</div>;
    }

    return dashboardUi;
  };
  return (
    <main className="">
      <div className="sticky top-0 z-40 flex flex-col justify-between items-center w-full backdrop-lg border-b-[1px] border-slate-200">
        <AdminNavbar
          handleDashboardState={setDashboardState}
          dashBoardState={dashboardState}
          isAdminLoggedIn={isAdminLoggedIn}
          chatsNumber={allChats.length}
        />
      </div>
      <div className="">
        {isFetchingChats && (
          <div className="w-full h-[65vh] flex justify-center items-center">
            <div className="flex flex-col items-center gap-2 text-center px-12">
              <Loader2 className="h-8 w-8 animate-spin text-slate-500" />
              <h3 className="font-semibold text-xl">Fetching...</h3>
            </div>
          </div>
        )}
        {!isFetchingChats && error && (
          <div className="w-full h-[50vh] flex justify-center items-center">
            <div className="flex flex-col">
              <div className="flex justify-center text-gray-500 transform rotateYOnHover">
                <Bird size={170} strokeWidth={1} />{" "}
              </div>
              <p className="flex items-center justify-center text-gray-600 text-xl">
                Oops! Something Went Wrong
              </p>
            </div>
          </div>
        )}
        {allChats.length === 0 && !isFetchingChats && (
          <div className="w-full h-[50vh] flex justify-center items-center">
            <div className="flex flex-col">
              <div className="flex justify-center text-gray-500 transform rotateYOnHover">
                <Bird size={170} strokeWidth={1} />{" "}
              </div>
              <p className="flex items-center justify-center text-gray-600 text-xl">
                No Chats yet
              </p>
            </div>
          </div>
        )}
        {allChats.length > 0 && !isFetchingChats && determineDashboardUi()}
      </div>
    </main>
  );
};

export default AdminDashboardUi;
