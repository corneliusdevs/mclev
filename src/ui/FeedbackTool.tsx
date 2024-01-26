import { MessageSquareMore, Phone } from "lucide-react";

const FeedbackTool = () => {

    // FIX THE BOX SHADOW EFFECT ON HOVER
  return (
    <div className="fixed -rotate-90 top-[45%] -right-9 bg-primarycol flex items-center flex-row-reverse h-10 px-2 pb-1 rounded-[4px] z-40 hover:shadow-[0px_0px_20px_5px_#909090e3] hover:-translate-x-[2.5px] hover:cursor-pointer transition-all">
      <div className="text-white">
        <span className="text-xs">Feedback</span>
      </div>
      <div className="flex justify-center items-center mr-1.5">
        <MessageSquareMore className="text-white rotate-90 scale-90"/>
      </div>
    </div>
  );
};

export default FeedbackTool;
