import { faMessage } from "@fortawesome/free-regular-svg-icons"
import { MessageSquare, X } from "lucide-react";
import { Dispatch, FC, SetStateAction } from "react";

interface ChatToolProps {
  handleChatDialogState: Dispatch<SetStateAction<boolean>>,
  chatDialogState: boolean,
}

const ChatTool:FC<ChatToolProps> = ({handleChatDialogState, chatDialogState}) => {
  
  return (
    <div className="fixed bottom-6 right-2 flex justify-center items-center rounded-full w-14 h-14 bg-secondarycol text-white shadow-md hover:cursor-pointer hover:scale-[1.15] transition-all z-[100]"

    onClick={()=>{
      handleChatDialogState( (state)=> !state )
    }}
        >
      {/* <MessageCircleMore className="transform scale-[1.2]"/> */}
      
      {
        chatDialogState ? <X size={28} className="text-accentcol"/> : <MessageSquare  size={28} />
      }
      

    </div>
  );
};

export default ChatTool;
