import InputElement from "@/components/Input";
import { Send } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { trpc } from "@/trpc-client/client";
import { socket } from "@/lib/socket.io/connectToMsgServer";
import { AdminChats, AllAdminChats } from "@/components/admin-dashboard/types";
import updateAllAdminChatsStoreHelper from "@/helpers/admin/updateAdminChatStore";

interface AdminChatInputProps {
  updateAllChatsStore: Dispatch<SetStateAction<AllAdminChats[]>>;
  isAdmin: boolean;
  userId: string;
  chatStore: AllAdminChats[];
  setToggleScrollDiv: Dispatch<SetStateAction<boolean>>
  // updateLocalChatStoreStatefxn: Dispatch<SetStateAction<ClientSideChatType[]>>;
  // isUpdatingLocalChatStoreState: boolean;

}

const AdminChatInput: FC<AdminChatInputProps> = ({
  updateAllChatsStore,
  isAdmin,
  userId,
  setToggleScrollDiv,
}) => {
  const [message, setMessage] = useState<AdminChats>({
    message: "",
    timeStamp: Date.now(),
    author: "admin",
    type: "saveChat",
    status: "success",
    recipientsId: [userId],
    chatId: uuidv4(),
    id: uuidv4()
  });

  const [emit, setEmit] = useState(false);

  const {
    mutate,
    isLoading: isSending,
    error,
  } = trpc.adminChats.handleAdminMessages.useMutation({
    networkMode: "always",
  });

  useEffect(() => {
    // emit message
    setMessage({
      id: uuidv4(),
      chatId: uuidv4(),
      type: "saveChat",
      message: "",
      timeStamp: Date.now(),
      recipientsId: ["client"],
      author: "admin",
      status: "success",
    });

    if (emit) {
      console.log("emmitting... adminChat input");
      socket.emit("send-to-client", {
        message: message,
        userId: userId,
      });
    }

    setEmit(false);
  }, [emit]);

  return (
    <div className="bg-greengray relative m-6">
      <div className="flex rounded-sm">
        <div className="w-full rounded-sm">
          <InputElement
            className="w-full p-4 pr-12 focus:bg-white rounded-sm"
            placeholder="Reply message"
            value={message.message}
            onChange={(event) => {
              setMessage((prevState) => {
                return {
                  ...prevState,
                  message: event.target.value,
                  author: isAdmin ? "admin" : "client",
                  timeStamp: Date.now(),
                };
              });
            }}
          />
        </div>
      </div>
      <div
        className={`flex justify-center items-center text-slate-400 hover:text-white absolute right-0 top-[0] hover:bg-accentcol p-[6px] rounded-sm hover:rounded-sm ${
          message.message === "" && "pointer-events-none"
        }`}
        onClick={() => {
          console.log("sending, ", {
            message: message.message,
            timeStamp: message.timeStamp,
            recipientsId: [userId],
            author: "admin",
          });

          mutate(
            {
              message: message.message,
              timeStamp: message.timeStamp,
              recipientsId: [userId],
              author: message.author,
              chatId: message.id,
            },
            {
              onSuccess: (data) => {
                console.log("mutate messages success ", data);
                // setIsLoading(false);
                if (!data.success) {
                  updateAllChatsStore((prevState) => {
                    const nextState = updateAllAdminChatsStoreHelper(prevState, {
                      ...message,
                      status: "failed",
                    }, userId);
                    return [...nextState];
                  });

  
                }
              },
              onError: (error) => {
                console.log("mutate messages error ", error);
                // setIsLoading(false);
                updateAllChatsStore((prevState) => {
                  const nextState = updateAllAdminChatsStoreHelper(prevState, {
                    ...message,
                    status: "failed",
                  }, userId);
                  return [...nextState];
                });

  
              },
            }
          );

    
          updateAllChatsStore((prevState) => {
            const nextState = updateAllAdminChatsStoreHelper(prevState, {
              ...message,
              status: "success",
            }, userId);
            return [...nextState];
          });

          //  set state to trigger emitting to connected sockets
          setEmit(true);

          // toggle Scroll Div state
          setToggleScrollDiv(v => !v)
          
        }}
      >
        <Send />
      </div>
    </div>
  );
};

export default AdminChatInput;
