import { FC } from "react";
import { ChatStatus } from "./UserChatDialog";
import { formatTimeAMPM } from "@/lib/utils";

interface ShowChatUiProps {
  message: string;
  timeStamp: number;
  className?: string;
  author: "client" | "admin";
  isAdmin: boolean;
}
const ShowChatUi: FC<ShowChatUiProps> = ({
  message,
  timeStamp,
  author,
  isAdmin,
  ...props
}) => {
  return (
    <div>
      {isAdmin ? (
        <div
          className={`flex flex-col justify-center w-full h-fit ${
            author === "client" ? "items-start" : "items-end"
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
              {formatTimeAMPM(timeStamp)}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`flex flex-col justify-center w-full h-fit ${
            author === "admin" ? "items-start" : "items-end"
          }`}
        >
          <div
            className={`my-2 relative px-3 py-3 pb-3 break-words h-fit ${
              props.className && props.className
            } ${author && props.className} ${
              author === "client"
                ? "bg-amber-100 rounded-tl-[10px] rounded-b-[10px]"
                : "bg-white rounded-tr-[10px] rounded-b-[10px]"
            }`}
          >
            <div className={`text-sm pb-2`}>{message}</div>
            <div className="absolute right-2 bottom-[2px] text-[10px]">
              {formatTimeAMPM(timeStamp)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowChatUi;
