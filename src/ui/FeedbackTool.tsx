import DrawerComponent from "@/components/DrawerComponent";
import { MessageSquareMore } from "lucide-react";
import FeedbackUi from "./FeedbackUi";
import { useState } from "react";

const FeedbackTool = () => {
  const [rating, setRating] = useState<number>(0);
  const [ratingExperience, setRatingExperience] = useState<string>("");
  const [username, setUsername] = useState<string>("")

  // FIX THE BOX SHADOW EFFECT ON HOVER
  return (
    <div>
    <DrawerComponent
      mainContentComponent = {<FeedbackUi ratingsState={rating} ratingsStateHandler={setRating} 
      username =  {username}
      setUsername = {setUsername}
      ratingExperience={ratingExperience} ratingExperienceHandler={setRatingExperience}/>}
      // closeButtonDisabled={ratingExperience === "" ? true : false}
      // closeButtonText={rating > 0 ? "Submit" : undefined}
      // closeButtonClassName={"hover:bg-secondarycol hover:text-white"}
      triggerComponent={
        <div className="fixed -rotate-90 top-[45%] -right-[40px] bg-primarycol flex items-center flex-row-reverse h-10 px-2 pb-1 rounded-[4px] z-40 hover:shadow-[0px_0px_20px_5px_#909090e3] hover:-translate-x-[2.5px] hover:cursor-pointer transition-all">
          <div className="text-white">
            <span className="text-xs">Feedback</span>
          </div>
          <div className="flex justify-center items-center mr-1.5">
            <MessageSquareMore className="text-white rotate-90 scale-90" />
          </div>
        </div>
      }
    />
    
    <div>

    </div>
    </div>
  );
};

export default FeedbackTool;
