"use client";

import { FC, MutableRefObject, useState } from "react";
import { ChatStatus, ChatType } from "./UserChatDialog";
import { formatTimeAMPM } from "@/lib/utils";

interface SaveChatUiProps {
  message: string;
  timeStamp: number;
  className?: string;
  author: "client" | "admin";
  status: "failed" | "success" | undefined;
  isAdmin: boolean;
}
const SaveChatUi: FC<SaveChatUiProps> = ({
  message,
  timeStamp,
  author,
  status,
  isAdmin,
  ...props
}) => {
 

  return (
    <div>
     {
       isAdmin ?  <div
       className={`flex flex-col justify-center w-full h-fit ${
         author === "admin" ? "items-end" : "items-start"
       }`}
     >
       <div
         className={`my-2 relative px-3 py-3 pb-3 break-words h-fit ${
           props.className && props.className
         } ${author && props.className} ${
           author === "admin"
             ? "bg-amber-100 rounded-tl-[10px] rounded-b-[10px]"
             : "bg-white rounded-tr-[10px] rounded-b-[10px]"
         }`}
       >
         <div className={`text-sm pb-2`}>{message}</div>
         <div className="absolute right-2 bottom-[2px] text-[10px]">
           {status === "success" ? formatTimeAMPM(timeStamp) : "Not saved"}
         </div>
       </div>
     </div> :  <div
      className={`flex flex-col justify-center w-full h-fit ${
        isAdmin ? "items-start" : "items-end"
      }`}
    >
      <div
        className={`my-2 relative px-3 py-3 pb-3 break-words h-fit ${
          props.className && props.className
        } ${author && props.className} ${
          !isAdmin
            ? "bg-amber-100 rounded-tl-[10px] rounded-b-[10px]"
            : "bg-white rounded-tr-[10px] rounded-b-[10px]"
        }`}
      >
        <div className={`text-sm pb-2`}>{message}</div>
        <div className="absolute right-2 bottom-[2px] text-[10px]">
          {status === "success" ? formatTimeAMPM(timeStamp) : "Not saved"}
        </div>
      </div>
    </div>
     }
   
    </div>

  );
};

// const MemoizedSaveChatUi = memo(SaveChatUi);

export default SaveChatUi;
