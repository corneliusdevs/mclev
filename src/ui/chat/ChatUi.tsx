import { FC } from "react";

interface ChatUiProps {
  message: string;
  timeStamp: string;
  className?: string;
  author: "client" | "admin";
}
const ChatUi: FC<ChatUiProps> = ({ message, timeStamp, ...props }) => {
  return (
    <div
      className={`flex flex-col justify-center w-full h-fit ${
        props.author ==="admin"? "items-end" : "items-start"
      }`}
    >
      <div
        className={`my-2 relative px-3 py-3 pb-3 break-words h-fit ${
          props.className && props.className
        } ${props.author && props.className} ${
            props.author ==="admin"? "bg-amber-100 rounded-tl-[10px] rounded-b-[10px]" : "bg-white rounded-tr-[10px] rounded-b-[10px]"
          }`}
      >
        <div className={`text-sm pb-2`}
      >{message}</div>
        <div className="absolute right-2 bottom-[2px] text-[10px]">
          {timeStamp}
        </div>
      </div>
    </div>
  );
};

export default ChatUi;
