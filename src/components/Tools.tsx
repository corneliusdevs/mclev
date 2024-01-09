import ChatTool from "@/ui/ChatTool"
import FeedbackTool from "@/ui/FeedbackTool"
import PhoneTool from "@/ui/PhoneTool"


const Tools =()=>{
    return(
        <div className="flex fixed bottom-0 w-full justify-between py-2 z-40 mb-1 px-2">
           <PhoneTool/>
           <FeedbackTool/>
           <ChatTool/>
        </div>
    )
}

export default Tools