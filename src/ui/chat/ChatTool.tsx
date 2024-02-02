import { faMessage } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageCircleMore } from "lucide-react";

const ChatTool = () => {
  return (
    <div className="flex justify-center items-center rounded-full w-14 h-14 bg-secondarycol text-white shadow-md hover:cursor-pointer hover:scale-[1.15] transition-all"
        >
      {/* <MessageCircleMore className="transform scale-[1.2]"/> */}
      
      
      <FontAwesomeIcon  icon={faMessage} className="transform scale-[0.6]" />

    </div>
  );
};

export default ChatTool;
