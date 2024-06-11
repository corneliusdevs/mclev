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
// import updateAllAdminChats from "@/helpers/useUpdateAllAdminChats";
import { formatDistanceToNowStrict } from "date-fns";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { formatTimeDuration } from "@/helpers/utilities";
import { formatAdminChats } from "@/helpers/admin/formatAdminChatState";
import { AllAdminChats, DashboardStateType } from "./types";
import { v4 as uuidv4 } from "uuid";
import Feedbacks from "./Feedbacks";
import updateAllAdminChats from "@/helpers/admin/useUpdateAllAdminChats";
import Contacts from "./Contacts";

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
    allNewMessages: ClientSideChatType[];
    message: ClientSideChatType;
    userId: string;
  }>({
    isNew: false,
    allNewMessages: [],
    message: initialMessageState,
    userId: "",
  });

  const isConnectedToMsgServerRef = useRef<boolean>(false);

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
    // register user socket Id
    if (!isConnectedToMsgServerRef.current) {
      toast("attempting to connect");
      console.log("registering... admin ");

      console.log("emmitting... chat input ", getRegisterAdminSecret());

      // get the session from localStorage if one exists
      const sessionId = localStorage.getItem("sessionId");

      // add the admin userId and secret to the auth object and connect
      socket.auth = {
        sessionId,
        userId: "admin",
        adminSecret: getRegisterAdminSecret(),
      };
      socket.connect();

      socket.emit("register-admin", {
        adminSecret: getRegisterAdminSecret(),
      });
      isConnectedToMsgServerRef.current = true;
    }
  }, [isConnectedToMsgServerRef.current]);

  // useEffect(() => {
  //   // register admin socket Id
  //   if (emitToMessagesServer) {
  //     console.log("emmitting... chat input ", getRegisterAdminSecret());

  //     // get the session from localStorage if one exists
  //     const sessionId = localStorage.getItem("sessionId")

  //     // add the admin userId and secret to the auth object and connect
  //     socket.auth = {sessionId, userId: "admin", adminSecret : getRegisterAdminSecret()};
  //     socket.connect();

  //     socket.emit("register-admin", {
  //       adminSecret: getRegisterAdminSecret()
  //     });
  //   }

  //   setEmitToMessagesServer(false);
  // }, [emitToMessagesServer]);

  // CLEANUP ALL EFFECTS IN THIS COMPONENT
  useEffect(() => {
    // attach the session id to the next reconnection attempts
    socket.on("session", ({ sessionId, userId }) => {
      socket.auth = { sessionId, userId };
      //  store it in the localStorage
      localStorage.setItem("sessionId", sessionId);

      // save the Id of the user
      // @ts-ignore
      socket.userId = userId;
    });

    // clean up the effects
  }, []);

  // listen for socket.io connection error
  useEffect(() => {
    socket.on("connect_error", () => {
      console.log("Could not connect to chat server");
      toast("Temporarily unable to connect to chat server");

      // set is connected to messages server to false
      isConnectedToMsgServerRef.current = false;
    });

    socket.on("connect", () => {
      toast("Back Online");
      if (socket.recovered) {
        toast("connection recovered");
      }
    });

    socket.on("connection-recovered", (last80Msgs: any) => {
      toast("connection recovered");
      console.log("last 80 msgs are", last80Msgs);
    });

    // clean up the effects
    return () => {
      socket.off("connect_error");
    };
  }, []);

  // cleanup ALL EFFECTS RETURN A FUNCTION THAT UNSUBSCRIBES TO THESE EVENTS
  useEffect(() => {
    console.log("listening to user");
    socket.on(
      "new-user-message",
      (receivedMessages: ClientSideChatType[] | null, userId: string) => {
        console.log("reciving user message");

        if (receivedMessages?.length && typeof userId === "string") {
          setShouldUpdateAllChats({
            isNew: true,
            allNewMessages: receivedMessages,
            message: receivedMessages[receivedMessages.length - 1],
            userId: userId,
          });

          let allReceivedMssgsId: string[] = receivedMessages.map((message) => {
            return message.id;
          });

          // notify the server of recieved messages
          socket.emit("message-received", {
            messageIds: allReceivedMssgsId,
            userId: "admin",
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
        // send a toast notification to the admin to notify him of new chats when there is no chat so that admin can refresh the chats and see the new message
        toast(`${shouldUpdateAllChats.message.message.slice(0, 13)}`);
      }
      if (
        currentChatUserIdRef.current !== shouldUpdateAllChats.userId &&
        dashboardState === "chatDialog"
      ) {
        // if admin has a new message from a user while in a chat with another user, notify the admin via toast notifications
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
      console.log("i rannnnnnnnnn ");

      let newAllChatsState: AllAdminChats[] = [];

      if (allUpdatedChats.length === 0) {
        console.log("executing allUpdatedChats === 0 ");
        newAllChatsState = updateAllAdminChats({
          newMessages: shouldUpdateAllChats.allNewMessages,
          messagesStore: allChats,
          userId: shouldUpdateAllChats.userId,
        });

        if (newAllChatsState.length !== 0) {
          setAllUpdatedChatstate(newAllChatsState);
          setAllChats(newAllChatsState);
        }
      } else {
        newAllChatsState = updateAllAdminChats({
          newMessages: shouldUpdateAllChats.allNewMessages,
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
      allNewMessages: [],
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
                <div className="flex justify-center text-slate-500 animate-spin">
                  <Loader2 size={24} strokeWidth={1} />{" "}
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
                      <div className="w-full mt-4">
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
                        <div className="absolute top-[50px] lg:top-0 right-0 flex items-center justify-center w-[50%] max-w-[600px] p-1.5">
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
      case "contacts":
        dashboardUi = (
          <div>
            <Contacts />
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
          <div className="relative w-full h-[50vh] flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex justify-center text-slate-500 animate-spin">
              <Loader2 size={24} strokeWidth={1} />{" "}
            </div>
            <p className="flex items-center justify-center text-gray-600 text-xl">
              Fetching...
            </p>
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

        {!isFetchingChats && !error && <div className="lg:relative">{determineDashboardUi()}</div>}
      </div>
    </main>
  );
};

const registerAdminSecret = () => {
  return process.env.REGISTER_ADMIN_TO_MSG_SERVER_SECRET;
};

export default AdminDashboardUi;
