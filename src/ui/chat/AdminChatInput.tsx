import InputElement from "@/components/Input";
import { Send } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ChatType, ClientSideChatType } from "./UserChatDialog";
import { trpc } from "@/trpc-client/client";
import updateChatStoreHelper from "@/helpers/updateChatStoreHelper";
import { socket } from "@/lib/socket.io/connectToMsgServer";

interface AdminChatInputProps {
  updateChatStore: Dispatch<SetStateAction<ClientSideChatType[]>>;
  isAdmin: boolean;
  recipientId: string;
  chatStore: ChatType[];
  updateLocalChatStoreStatefxn: Dispatch<SetStateAction<ClientSideChatType[]>>;
  isUpdatingLocalChatStoreState: boolean;

}

const AdminChatInput: FC<AdminChatInputProps> = ({
  updateChatStore,
  isAdmin,
  recipientId,
  chatStore,
  isUpdatingLocalChatStoreState,
  updateLocalChatStoreStatefxn
}) => {
  const [message, setMessage] = useState<ClientSideChatType>({
    id: uuidv4(),
    message: "",
    timeStamp: Date.now(),
    author: "admin",
    type: "saveChat",
    status: "success",
    recipientsId: [recipientId],
  });

  const [emit, setEmit] = useState(false);

  const {
    mutate,
    isLoading: isSending,
    error,
  } = trpc.handleAdminMessages.useMutation({
    networkMode: "always",
  });

  useEffect(() => {
    // emit message
    setMessage({
      id: uuidv4(),
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
        userId: recipientId,
      });
    }

    setEmit(false);
  }, [emit]);

  return (
    <div className="bg-greengray relative m-6">
      <div className="flex rounded-sm">
        <div className="w-full rounded-sm">
          <InputElement
            className="w-full p-4 pr-8 focus:bg-white rounded-sm"
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
            recipientId: [recipientId],
            author: "admin",
          });

          mutate(
            {
              message: message.message,
              timeStamp: message.timeStamp,
              recipientsId: [recipientId],
              author: message.author,
              chatId: message.id,
            },
            {
              onSuccess: (data) => {
                console.log("mutate messages success ", data);
                // setIsLoading(false);
                if (!data.success) {
                  updateChatStore((prevState) => {
                    const nextState = updateChatStoreHelper(prevState, {
                      ...message,
                      status: "failed",
                    });
                    return [...nextState];
                  });

                  if (!isUpdatingLocalChatStoreState) {
                    console.log("out .........");
                    updateLocalChatStoreStatefxn(() => {
                      const nextState = updateChatStoreHelper(chatStore, {
                        ...message,
                        status: "failed",
                      });

                      return [...nextState];
                    });
                  }
                }
              },
              onError: (error) => {
                console.log("mutate messages error ", error);
                // setIsLoading(false);
                updateChatStore((prevState) => {
                  const nextState = updateChatStoreHelper(prevState, {
                    ...message,
                    status: "failed",
                  });
                  return [...nextState];
                });

                
                if (!isUpdatingLocalChatStoreState) {
                  updateLocalChatStoreStatefxn(() => {
                    const nextState = updateChatStoreHelper(chatStore, {
                      ...message,
                      status: "failed",
                    });

                    return [...nextState];
                  });
                }
              },
            }
          );

          updateChatStore((prevState) => {
            return [...prevState, message];
          });

          //  set state to trigger emitting to connected sockets
          setEmit(true);
        }}
      >
        <Send />
      </div>
    </div>
  );
};

export default AdminChatInput;
