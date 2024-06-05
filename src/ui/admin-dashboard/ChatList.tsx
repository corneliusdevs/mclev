"use client";

import AlertDialogComponent from "@/components/AlertDialogComponent";
import { AllAdminChats } from "@/components/admin-dashboard/types";
import { deleteChatFromAdminChatStore } from "@/helpers/admin/updateAdminChatStore";
import { trpc } from "@/trpc-client/client";
import { Trash2Icon } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ChatListProps {
  title: string;
  subTitle: string;
  description: string;
  timeStamp: string;
  unread?: boolean;
  clickHandler?: Function;
  userId: string;
  refreshChatState: Dispatch<SetStateAction<boolean>>; // must return a promise
  // updateAllUpdatedChatsStore: Dispatch<SetStateAction<AllAdminChats[]>>;
  // updateAllChatsStore: Dispatch<SetStateAction<AllAdminChats[]>>;
}

const ChatList: FC<ChatListProps> = ({
  title,
  subTitle,
  description,
  timeStamp,
  unread,
  userId,
  refreshChatState,
  ...props
}) => {
  const [deleteChat, setDeleteChat] = useState<boolean>(false);

  const {
    data,
    isLoading: isFetchingChats,
    error,
    refetch: deleteChats,
  } = trpc.adminChats.deleteUserChat.useQuery(
    {
      userId: userId,
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (deleteChat) {
      const deleteChatPromise = deleteChats();

      //  toast notification
      toast
        .promise(deleteChatPromise, {
          loading: `Deleting Chat with ${title}`,
          success: `Chat with ${title} deleted`,
          error: `Failed to delete chat with ${title}`,
        })
        .then(() => {
          refreshChatState(true);
        });
      }


    setDeleteChat(false);
    // refreshChatState(true)
  }, [deleteChat]);

  return (
    <div className="relative flex flex-col items-center justify-center w-full py-2 ">
      <div className="border-2 rounded-sm p-2 relative hover:bg-slate-200 min-w-full pb-3">
        <div
          className="font-[600]"
          onClick={() => {
            if (props.clickHandler) props.clickHandler();
          }}
        >
          {title}
        </div>
        <div className="font-[400] text-sm">{subTitle}</div>
        <div className="flex justify-between pt-1">
          <div
            className="text-[14px] truncate text-ellipsis h-[20px] text-state-300 max-w-[230px] pr-4 min-w-[50px]"
            onClick={() => {
              if (props.clickHandler) props.clickHandler();
            }}
          >
            {description}
          </div>
        </div>

        <div className="text-sm absolute top-2 right-[10px] flex items-center">
          {timeStamp}
          {unread && (
            <div className="rounded-full bg-blue-500 w-2 h-2 ml-[4px]"></div>
          )}
        </div>
        <AlertDialogComponent
          title={`Delete`}
          description={`Delete chat with ${title}?`}
          actionText={"Delete"}
          cancelText={"Cancel"}
          buttonClassname={
            "absolute right-0 bottom-1 pr-1 text-black/80 hover:text-red-500 hover:cursor-pointer hover:border-none hover:bg-transparent"
          }
          buttonText={<Trash2Icon />}
          buttonVariant={"ghost"}
          actionButtonClassName={"bg-red-400 hover:bg-red-500"}
          onActionButtonClickHandler={() => {
            setDeleteChat(true);
          }}
        />
      </div>
    </div>
  );
};

export default ChatList;
