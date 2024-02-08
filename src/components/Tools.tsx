"use client";
import ChatTool from "@/ui/chat/ChatTool";
import UserChat from "@/ui/chat/UserChat";
import FeedbackTool from "@/ui/FeedbackTool";
import PhoneTool from "@/ui/PhoneTool";
import { usePathname } from "next/navigation";
import React, { FC, useState } from "react";

const Tools: FC = (): React.ReactNode => {
  const currentRoute = usePathname();

  const [isChatDialogOpen, setIsChatDialogOpen] = useState<boolean>(false);

  const uiTools = (): React.ReactNode => {
    console.log(currentRoute);
    if (currentRoute && currentRoute !== "/admin-dashboard") {
      return (
        <div className="flex fixed bottom-0 w-full justify-between py-2 z-40 mb-1 px-2">
          <PhoneTool />
          <FeedbackTool />
          <ChatTool handleChatDialogState={setIsChatDialogOpen} chatDialogState={isChatDialogOpen}/>
          {isChatDialogOpen && <UserChat />}
        </div>
      );
    }

    return <div className="hidden"></div>;
  };

  return <>{uiTools()}</>;
};

export default Tools;
