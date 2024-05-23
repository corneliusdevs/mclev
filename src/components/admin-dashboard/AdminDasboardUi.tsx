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
import { Bird, Loader2, Rabbit, RefreshCcw } from "lucide-react";
import { socket } from "@/lib/socket.io/connectToMsgServer";
import { getRegisterAdminSecret } from "@/lib/utils";
import { ClientSideChatType } from "@/ui/chat/UserChatDialog";
import updateAllAdminChats from "@/helpers/useUpdateAllAdminChats";
import { formatDistanceToNowStrict } from "date-fns";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { formatTimeDuration } from "@/helpers/utilities";
import { formatAdminChats } from "@/helpers/formatAdminChatState";
import { AllAdminChats, DashboardStateType } from "./types";
import { v4 as uuidv4 } from "uuid";
import Feedbacks from "./Feedbacks";

interface AdminDashboardUiProps {
  isAdminLoggedIn: boolean;
}

const AdminDashboardUi = ({
  isAdminLoggedIn,
}: AdminDashboardUiProps): React.ReactNode => {
  const [dashboardState, setDashboardState] =
    useState<DashboardStateType>("chats");

  const [emitToMessagesServer, setEmitToMessagesServer] = useState(false);

  const [isFetching, setIsFetching] = useState<boolean>(true);

  const [allChats, setAllChats] = useState<AllAdminChats[]>([]);

  const allChatsRef = useRef<AllAdminChats[]>([]);
  const [allUpdatedChats, setAllUpdatedChatstate] = useState<AllAdminChats[]>(
    []
  );
  const [shouldUpdateAllChats, setShouldUpdateAllChats] = useState<{
    isNew: boolean;
    message: ClientSideChatType;
    userId: string;
  }>({
    isNew: false,
    message: initialMessageState,
    userId: "",
  });

  const [currentChat, setCurrentChat] = useState<AllAdminChats>({
    userId: "",
    chats: [
      {
        message: "",
        timeStamp: Date.now(),
        author: "admin",
        recipientsId: ["admin"],
        chatId: "",
        status: "success",
        id: uuidv4(),
        type: "showChat",
      },
    ],
    isRead: false,
    name: "",
  });

  const currentChatUserIdRef = useRef<string>("");

  const [shouldMarkAsRead, setShouldMarkAsRead] = useState<{
    markAsRead: boolean;
    userId: string;
  }>({
    markAsRead: false,
    userId: "",
  });

  const [isDataSearched, setIsDataSearched] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<AllAdminChats[]>([]);

  const {
    mutate: markChatAsReadMutation,
    isLoading: isMarkingChatAsRead,
    error: errorMarkingChatAsRead,
  } = trpc.adminChats.markAsRead.useMutation({
    networkMode: "always",
  });

  const {
    data,
    isLoading: isFetchingChats,
    error,
    refetch: refetchChats,
  } = trpc.adminChats.getAdminChats.useQuery(undefined, {
    enabled: false,
  });

  useEffect(() => {
    // MAKE SURE TO HANDLE ERROR STATE
    if (isFetching) {
      const fetchPromise = refetchChats();

      // show toast notifications
      toast.promise(fetchPromise, {
        loading: "Updating chats",
        success: "Chats up to date",
        error: "Could not update chats",
      });
      if (error) {
        setIsFetching(false);
      }
      if (data && data?.chats) {
        let formattedChats = formatAdminChats(data.chats);

        console.log("these are formatted chats ", formattedChats);

        setAllChats(formattedChats);
        setAllUpdatedChatstate(formattedChats);

        // clear all the updatedChats on client Side state
        setAllUpdatedChatstate([]);
        setEmitToMessagesServer(true);
        setIsFetching(false);

        allChatsRef.current = formattedChats;
      }
    }
  }, [isFetching, data]);

  useEffect(() => {
    let indexOfCurrentChat = -1;

    allChats.map((chat, index) => {
      if (chat.userId === currentChatUserIdRef.current) {
        indexOfCurrentChat = index;
        setCurrentChat(allChats[index]);
      }
    });
  }, [allChats]);

  useEffect(() => {
    // register admin socket Id
    if (shouldMarkAsRead.markAsRead) {
      console.log("marking as read...");
      markChatAsReadMutation({
        userId: shouldMarkAsRead.userId,
      });
    }

    setShouldMarkAsRead({
      markAsRead: false,
      userId: "",
    });
  }, [shouldMarkAsRead.markAsRead]);

  useEffect(() => {
    // register admin socket Id
    if (emitToMessagesServer) {
      console.log("emmitting... chat input ", getRegisterAdminSecret());
      socket.emit("register-admin", {
        // fix this and ensure that it is stored in process.env "908vql099ac9043WEE7x2ADSERREG",
        adminSecret: getRegisterAdminSecret()
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
          console.log("reciving user message")
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
    if (
      shouldUpdateAllChats.isNew &&
      shouldUpdateAllChats.message.message !== ""
    ) {
      if (allChats.length === 0) {
        toast(`${shouldUpdateAllChats.message.message.slice(0, 13)}`);
      }
      if (
        currentChatUserIdRef.current !== shouldUpdateAllChats.userId &&
        dashboardState === "chatDialog"
      ) {
        toast(
          `${shouldUpdateAllChats.message.message.slice(0, 13)}${
            shouldUpdateAllChats.message.message.length > 13 ? "..." : ""
          }`
        );
      }
    }
  }, [shouldUpdateAllChats.isNew]);

  useEffect(() => {
    if (shouldUpdateAllChats.isNew) {
      console.log("i ranmnnnnnnnnn ");

      let newAllChatsState: AllAdminChats[] = [];

      if (allUpdatedChats.length === 0) {
        console.log("executing allUpdatedChats === 0 ");
        newAllChatsState = updateAllAdminChats({
          newMessage: shouldUpdateAllChats.message,
          messagesStore: allChats,
          userId: shouldUpdateAllChats.userId,
        });

        if (newAllChatsState.length !== 0) {
          setAllUpdatedChatstate(newAllChatsState);
          setAllChats(newAllChatsState);
        }
      } else {
        newAllChatsState = updateAllAdminChats({
          newMessage: shouldUpdateAllChats.message,
          messagesStore: allChatsRef.current,
          userId: shouldUpdateAllChats.userId,
        });
        if (newAllChatsState.length !== 0) {
          setAllUpdatedChatstate(newAllChatsState);
          setAllChats(newAllChatsState);
        }
      }

      //  do not edit unless you know what you're doing

      allChatsRef.current = [...newAllChatsState];
    }
    setShouldUpdateAllChats({
      isNew: false,
      message: initialMessageState,
      userId: "",
    });
  }, [shouldUpdateAllChats.isNew]);

  const determineDashboardUi = (): JSX.Element => {
    let dashboardUi = <div></div>;

    let chatsToBeMapped: AllAdminChats[] = isDataSearched
      ? searchResults
      : allUpdatedChats.length === 0
      ? allChats
      : allUpdatedChats;

    if (allChats.length === 0 && !isFetchingChats) {
      dashboardUi = (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex justify-center text-gray-500 transform rotateYOnHover">
              <Bird size={170} strokeWidth={1} />{" "}
            </div>
            <p className="flex items-center justify-center text-gray-600 text-xl">
              No Chats yet
            </p>
            <p className="flex items-center justify-center text-gray-600 text-xl pt-2">
              <Button
                variant={"outline"}
                onClick={() => {
                  setIsFetching(true);
                }}
              >
                <span className="pr-2">Refresh</span>
                <RefreshCcw className={`${isFetching && "animate-spin"}`} />
              </Button>
            </p>
          </div>
        </div>
      );

      return dashboardUi;
    }

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
                      <div className="">
                        <SearchUi
                          dataToBeSearched={allChats}
                          dataName={"adminChats"}
                          setSearchResults={setSearchResults}
                          onSearch={() => {
                            setIsDataSearched(true);
                          }}
                          onClearSearchResults={() => {
                            setIsDataSearched(false);
                          }}

                          placeholder={"client or chat name"}
                        />

                        {/* if user makes a search and the chats to be mapped
                        which will aready be set to searchResulsts is === 0,
                        render a "No Match found ui" */}
                        {isDataSearched && chatsToBeMapped.length === 0 && (
                          <div className="relative w-full h-[50vh] flex justify-center items-center">
                            <div className="flex flex-col">
                              <div className="flex justify-center text-gray-500">
                                <Rabbit size={50} strokeWidth={1} />{" "}
                              </div>
                              <p className="flex items-center justify-center text-gray-600 text-xl">
                                No Match Found.
                              </p>
                            </div>
                          </div>
                        )}
                        {chatsToBeMapped.length > 0 &&
                          chatsToBeMapped.map((chat, index) => {
                            console.log(chat);
                            return (
                              <ChatList
                                title={
                                  chat.name.length > 0
                                    ? chat.name.slice(0, 11)
                                    : chat.userId.slice(-12)
                                }
                                // updateAllChatsStore={setAllChats}
                                // updateAllUpdatedChatsStore={
                                //   setAllUpdatedChatstate
                                // }
                                key={chat.userId}
                                subTitle=""
                                description={
                                  chat.chats[chat.chats.length - 1].message
                                }
                                userId={chat.userId}
                                timeStamp={formatTimeDuration(
                                  formatDistanceToNowStrict(
                                    new Date(
                                      chat.chats[
                                        chat.chats.length - 1
                                      ].timeStamp
                                    ),
                                    { addSuffix: true }
                                  )
                                )}
                                // refresh chat state
                                refreshChatState={setIsFetching}
                                unread={!chat.isRead}
                                clickHandler={() => {
                                  setDashboardState("chatDialog");
                                  setCurrentChat(chat);

                                  // persist the current chat userId between rerenders
                                  currentChatUserIdRef.current = chat.userId;

                                  setShouldMarkAsRead({
                                    markAsRead: !chat.isRead,
                                    userId: chat.userId,
                                  });

                                  // emit store socketId and Admin Credentials to messages server

                                  setEmitToMessagesServer(true);
                                }}
                              />
                            );
                          })}
                        <div className="absolute top-[50px] right-0 flex items-center justify-center w-[50%] p-1.5">
                          <Button
                            className="h-[27px] bg-white w-full hover:bg-slate-200 shadow"
                            variant={"ghost"}
                            onClick={() => {
                              setIsFetching(true);
                            }}
                          >
                            {!isFetchingChats ? (
                              "Refresh"
                            ) : (
                              <RefreshCcw className="animate-spin" size={15} />
                            )}
                          </Button>
                        </div>
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
              // otherChatsStore={
              //   allUpdatedChats.length === 0 ? allChats : allUpdatedChats
              // }
              // allChatsStore={
              //   allUpdatedChats.length === 0 ? allChats : allUpdatedChats
              // }
              allChatsStore={allChats}
              updateAllChatsStore={setAllChats}
              updatedChatsStore={allUpdatedChats}
              chatStoreRef={allChatsRef}
            />
          </div>
        );
        break;
      case "feedbacks":
        dashboardUi = (
          <div>
            <Feedbacks />
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

        {!isFetchingChats && !error && determineDashboardUi()}
      </div>
    </main>
  );
};

const registerAdminSecret = ()=>{
  return process.env.REGISTER_ADMIN_TO_MSG_SERVER_SECRET
}

export default AdminDashboardUi;
