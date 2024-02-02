"use client";
import ChatTool from "@/ui/chat/ChatTool";
import FeedbackTool from "@/ui/FeedbackTool";
import PhoneTool from "@/ui/PhoneTool";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

const Tools:FC = ():React.ReactNode => {
  const currentRoute = usePathname();

  const uiTools = ():React.ReactNode => {
    if (currentRoute && currentRoute !== "/admin-dashboard") {
      return (
        <div className="flex fixed bottom-0 w-full justify-between py-2 z-40 mb-1 px-2">
          <PhoneTool />
          <FeedbackTool />
          <ChatTool />
        </div>
      );
    }

    return <div className="hidden">

    </div>;
  };

  return
  <>{uiTools()}</>;
};

export default Tools;
