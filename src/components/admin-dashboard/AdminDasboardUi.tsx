"use client";

import AdminNavbar from "@/ui/admin-dashboard/AdminNavbar";
import BookingList from "@/ui/admin-dashboard/Booking";
import ChatList from "@/ui/admin-dashboard/ChatList";
import SearchUi from "@/ui/admin-dashboard/Search";
import Tab from "@/ui/admin-dashboard/Tab";
import ChatDialog from "@/ui/chat/ChatDialog";
import React, { FC, useState } from "react";

interface AdminDashboardUi{

}

const AdminDashboardUi = (): React.ReactNode => {
  const [dashboardState, setDashboardState] = useState<
    "chats" | "dashboard" | "bookings" | "chatDialog"
  >("chats");

  const determineDashboardUi = (): JSX.Element=> {
    let dashboardUi = <div></div>;
    switch (dashboardState) {
      case "chats":
        dashboardUi = (
          <Tab
            defaultTabValue={"chats"}
            tabList={[
              {
                tabName: "All Chats",
                value: "chats",
                tabUi: (
                  <div>
                    <SearchUi />
                    <ChatList
                      title="William Smith"
                      subTitle="Meeting Tomorrow"
                      description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                      timeStamp={"3 hours ago"}
                      unread={true}

                      clickHandler={()=>{
                        setDashboardState("chatDialog")
                      }}
                    />
                    <ChatList
                      title="William Smith"
                      subTitle="Meeting Tomorrow"
                      description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                      timeStamp={"3 hours ago"}
                      unread={false}

                      clickHandler={()=>{
                        setDashboardState("chatDialog")
                      }}

                    />
                    <ChatList
                      title="William Smith"
                      subTitle="Meeting Tomorrow"
                      description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                      timeStamp={"3 hours ago"}
                      unread={true}

                      clickHandler={()=>{
                        setDashboardState("chatDialog")
                      }}
                    />
                    <ChatList
                      title="William Smith"
                      subTitle="Meeting Tomorrow"
                      description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                      timeStamp={"3 hours ago"}

                      clickHandler={()=>{
                        setDashboardState("chatDialog")
                      }}
                    />
                    <ChatList
                      title="William Smith"
                      subTitle="Meeting Tomorrow"
                      description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                      timeStamp={"3 hours ago"}
                      unread={true}

                      clickHandler={()=>{
                        setDashboardState("chatDialog")
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

                      clickHandler={()=>{
                        setDashboardState("chatDialog")
                      }}
                    />
                    <ChatList
                      title="William Smith"
                      subTitle="Meeting Tomorrow"
                      description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                      timeStamp={"3 hours ago"}
                      unread={true}
                      clickHandler={()=>{
                        setDashboardState("chatDialog")
                      }}
                    />
                    <ChatList
                      title="William Smith"
                      subTitle="Meeting Tomorrow"
                      description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                      timeStamp={"3 hours ago"}
                      unread={true}
                      clickHandler={()=>{
                        setDashboardState("chatDialog")
                      }}
                    />
                    <ChatList
                      title="William Smith"
                      subTitle="Meeting Tomorrow"
                      description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                      timeStamp={"1 hours ago"}
                      unread={true}
                      clickHandler={()=>{
                        setDashboardState("chatDialog")
                      }}
                    />
                    <ChatList
                      title="William Smith"
                      subTitle="Meeting Tomorrow"
                      description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
                      timeStamp={"2 hours ago"}
                      unread={true}

                      clickHandler={()=>{
                        setDashboardState("chatDialog")
                      }}
                    />
                  </div>
                ),
              },
            ]}
          />
        );
        break;
      case "bookings":
        dashboardUi = (
          <div>
            <BookingList
              title="William Smith"
              subTitle="Meeting Tomorrow"
              description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
              timeStamp={"3 hours ago"}
              unread={true}
            />
            <BookingList
              title="John James"
              subTitle="Meeting Tomorrow"
              description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
              timeStamp={"3 hours ago"}
              unread={true}
            />
            <BookingList
              title="Janet Ruth"
              subTitle="Meeting Tomorrow"
              description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
              timeStamp={"3 hours ago"}
              unread={true}
            />
          </div>
        );
        break;
      case "chatDialog":
        dashboardUi = <div className="w-full"><ChatDialog /></div>;
        break;
      default:
        dashboardUi = <div>I am the dashboard ui</div>;
    }

    return dashboardUi;
  };
  return (
    <main className="">
      <div className="fixed top-0 z-40 flex flex-col justify-between items-center w-full backdrop-lg border-b-[1px] border-slate-200">
        <AdminNavbar
          handleDashboardState={setDashboardState}
          dashBoardState={dashboardState}
        />
      </div>
      <div className="mt-[50px]">
        {determineDashboardUi()}

      </div>
    </main>
  );
};

export default AdminDashboardUi;
