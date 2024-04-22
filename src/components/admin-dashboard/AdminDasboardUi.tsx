"use client";

import AdminNavbar from "@/ui/admin-dashboard/AdminNavbar";
import ChatList from "@/ui/admin-dashboard/ChatList";
import SearchUi from "@/ui/admin-dashboard/Search";
import Tab from "@/ui/admin-dashboard/Tab";
import AdminChatDialog from "@/ui/chat/AdminChatDialog";
import React, { FC, useEffect, useState } from "react";
import Bookings from "./bookings/Bookings";
import { trpc } from "@/trpc-client/client";
import { Chats } from "@/db/models/chat-model";
import { Bird, Loader2 } from "lucide-react";

interface AdminDashboardUiProps {
  isAdminLoggedIn: boolean;
}

const AdminDashboardUi = ({
  isAdminLoggedIn,
}: AdminDashboardUiProps): React.ReactNode => {
  const [dashboardState, setDashboardState] = useState<
    "chats" | "dashboard" | "bookings" | "chatDialog"
  >("chats");

  const [allChats, setAllChats] = useState<Chats[]>([]);
  const [currentChat, setCurrentChat] = useState<Chats>({userId: "", chats: [{
    message: "",
    timeStamp: Date.now(),
    author: "admin",
    recipientsId: ["admin"],
    chatId: "",
  }], isRead: false})

  const {
    data,
    isLoading: isFetchingChats,
    error,
  } = trpc.getAllAdminChats.useQuery();


  useEffect(() => {
    // MAKE SURE TO HANDLE ERROR STATE
    if (error) {
    }
    if (data && data?.chats.length !== 0) {
      setAllChats(data.chats);
    }

  }, [isFetchingChats, data]);

  const determineDashboardUi = (): JSX.Element => {
    let dashboardUi = <div></div>;

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
                        {allChats.length > 0 &&
                          allChats.map((chat, index) => {
                            console.log(chat);
                            return (
                              <ChatList
                                title={chat.userId.slice(-12)}
                                key={chat.userId}
                                subTitle=""
                                description={chat.chats[chat.chats.length - 1].message}
                                timeStamp={"3 hours ago"}
                                unread={!chat.isRead}
                                clickHandler={() => {
                                  setDashboardState("chatDialog");
                                  setCurrentChat(chat)
                                }}
                              />
                            );
                          })}
                        <ChatList
                          title="William Smith"
                          subTitle="Meeting Tomorrow"
                          description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                          timeStamp={"3 hours ago"}
                          unread={true}
                          clickHandler={() => {
                            setDashboardState("chatDialog");
                          }}
                        />
                        <ChatList
                          title="William Smith"
                          subTitle="Meeting Tomorrow"
                          description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                          timeStamp={"3 hours ago"}
                          unread={false}
                          clickHandler={() => {
                            setDashboardState("chatDialog");
                          }}
                        />
                        <ChatList
                          title="William Smith"
                          subTitle="Meeting Tomorrow"
                          description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                          timeStamp={"3 hours ago"}
                          unread={true}
                          clickHandler={() => {
                            setDashboardState("chatDialog");
                          }}
                        />
                        <ChatList
                          title="William Smith"
                          subTitle="Meeting Tomorrow"
                          description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                          timeStamp={"3 hours ago"}
                          clickHandler={() => {
                            setDashboardState("chatDialog");
                          }}
                        />
                        <ChatList
                          title="William Smith"
                          subTitle="Meeting Tomorrow"
                          description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                          timeStamp={"3 hours ago"}
                          unread={true}
                          clickHandler={() => {
                            setDashboardState("chatDialog");
                          }}
                        />
                      </div>
                    ),
                  },
                  {
                    tabName: "Unread",
                    value: "unread",
                    tabUi: (
                      <div>
                        <SearchUi />
                        <ChatList
                          title="William Smith"
                          subTitle="Meeting Tomorrow"
                          description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                          timeStamp={"3 hours ago"}
                          unread={true}
                          clickHandler={() => {
                            setDashboardState("chatDialog");
                          }}
                        />
                        <ChatList
                          title="William Smith"
                          subTitle="Meeting Tomorrow"
                          description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                          timeStamp={"3 hours ago"}
                          unread={true}
                          clickHandler={() => {
                            setDashboardState("chatDialog");
                          }}
                        />
                        <ChatList
                          title="William Smith"
                          subTitle="Meeting Tomorrow"
                          description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                          timeStamp={"3 hours ago"}
                          unread={true}
                          clickHandler={() => {
                            setDashboardState("chatDialog");
                          }}
                        />
                        <ChatList
                          title="William Smith"
                          subTitle="Meeting Tomorrow"
                          description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                          timeStamp={"1 hours ago"}
                          unread={true}
                          clickHandler={() => {
                            setDashboardState("chatDialog");
                          }}
                        />
                        <ChatList
                          title="William Smith"
                          subTitle="Meeting Tomorrow"
                          description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                          timeStamp={"2 hours ago"}
                          unread={true}
                          clickHandler={() => {
                            setDashboardState("chatDialog");
                          }}
                        />
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
            <AdminChatDialog chats = {currentChat}/>
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
          chatsNumber = {allChats.length}
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
        {
          (!isFetchingChats && error) && <div className="w-full h-[50vh] flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex justify-center text-gray-500 transform rotateYOnHover">
              <Bird size={170} strokeWidth={1} />{" "}
            </div>
            <p className="flex items-center justify-center text-gray-600 text-xl">
              Oops! Something Went Wrong
            </p>
          </div>
        </div>
        }
        {
          (allChats.length === 0 && !isFetchingChats) && (
            <div className="w-full h-[50vh] flex justify-center items-center">
              <div className="flex flex-col">
                <div className="flex justify-center text-gray-500 transform rotateYOnHover">
                  <Bird size={170} strokeWidth={1} />{" "}
                </div>
                <p className="flex items-center justify-center text-gray-600 text-xl">
                  No Chats yet
                </p>
              </div>
            </div>)
        }
        {(allChats.length > 0 && !isFetchingChats) &&determineDashboardUi()}
      </div>
    </main>
  );
};

export default AdminDashboardUi;
