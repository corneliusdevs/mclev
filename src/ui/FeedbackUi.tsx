import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc-client/client";
import { Loader2, MailCheck, Squirrel, Star } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";

type ratingsText = {
  [x: string]: string;
};
interface FeedbackUiProps {
  ratingsState: number;
  ratingsStateHandler: Dispatch<SetStateAction<number>>;
  ratingExperience: string;
  ratingExperienceHandler: Dispatch<SetStateAction<string>>;
}

const FeedbackUi: FC<FeedbackUiProps> = ({
  ratingsState: rating,
  ratingsStateHandler: setRating,
  ratingExperience,
  ratingExperienceHandler: setRatingExperience,
}) => {
  const ratingsText: ratingsText = {
    "1": "Very Bad",
    "2": "Bad",
    "3": "Average",
    "4": "Satisfied",
    "5": "Very satisfied",
  };

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { mutate, isLoading, isSuccess, error, data } =
    trpc.createFeedback.useMutation({
      networkMode: "always",
    });

  const handleSubmitFeedback = () => {
    console.log("submitting feedback");
    mutate({
      rating: rating,
      experience: ratingExperience,
    });
  };

  return (
    <div className="flex flex-col items-center min-w-full">
      {isSuccess && data.httpStatus !== 500 && (
        <div className="">
          <div className="flex justify-center text-green-700">
            <MailCheck size={40}/>
          </div>
          <div className="text-black pt-1">Thank you for your feedback.</div>
        </div>
      )}
      {
        (error || data?.httpStatus === 500) && <div>
             <div className="flex justify-center text-red-600">
            <Squirrel size={40}/>
          </div>
          <div className="text-black pt-1 text-center">Please try again later.</div>
          </div>
      }
      {isSubmitted === false && (
        <p className="font-bold text-black pb-3 text-center">
          How would you describe your Experience?
        </p>
      )}
      {isLoading && (
        <div>
          <div className="flex justify-center text-gray-500 animate-spin">
            <Loader2 size={50} strokeWidth={1} />{" "}
          </div>
          <p>Submitting...</p>
        </div>
      )}
      {isLoading === false && isSubmitted === false && (
        <div className="flex flex-col w-full items-center max-w-[400px]">
          <div className="flex justify-around w-full max-w-[200px]">
            <div
              className="flex justify-center text-secondarycol"
              onClick={() => {
                if (rating === 1) {
                  setRating(0);
                  return;
                }
                setRating(1);
              }}
            >
              <Star
                key={"star" + Date.now().toString}
                strokeWidth={2}
                size={24}
                className={`${
                  rating >= 1 ? "fill-secondarycol" : "fill-white"
                }`}
              />
            </div>
            <div
              className="flex text-secondarycol"
              onClick={() => {
                setRating(2);
              }}
            >
              <Star
                key={"star" + Date.now().toString}
                strokeWidth={2}
                size={24}
                className={`${
                  rating >= 2 ? "fill-secondarycol" : "fill-white"
                }`}
              />
            </div>
            <div
              className="flex text-secondarycol"
              onClick={() => {
                setRating(3);
              }}
            >
              <Star
                key={"star" + Date.now().toString}
                strokeWidth={2}
                size={24}
                className={`${
                  rating >= 3 ? "fill-secondarycol" : "fill-white"
                }`}
              />
            </div>
            <div
              className="flex text-secondarycol"
              onClick={() => {
                setRating(4);
              }}
            >
              <Star
                key={"star" + Date.now().toString}
                strokeWidth={2}
                size={24}
                className={`${
                  rating >= 4 ? "fill-secondarycol" : "fill-white"
                }`}
              />
            </div>
            <div
              className="flex text-secondarycol"
              onClick={() => {
                setRating(5);
              }}
            >
              <Star
                key={"star" + Date.now().toString}
                strokeWidth={2}
                size={24}
                className={`${
                  rating === 5 ? "fill-secondarycol" : "fill-white"
                }`}
              />
            </div>
          </div>
          {/* Ratings description */}
          <div>
            {rating < 1
              ? "Please select a rating"
              : ratingsText[rating.toString()]}
          </div>
        </div>
      )}
      {rating > 0 && isSubmitted === false && (
        <div className="flex flex-col items-center w-full p-3 text-center">
          <div className="pb-3 text-center">Tell us about your experience</div>
          <textarea
            className="p-2 border-[1.5px] border-primarycol/10 w-full max-w-[450px]"
            onChange={(e) => {
              setRatingExperience(() => {
                return e.target.value;
              });
            }}
            value={ratingExperience}
            rows={10}
            // cols={}
            name="additional-details"
          ></textarea>
        </div>
      )}
      {ratingExperience.length > 1 && !isLoading && isSubmitted === false && (
        <div>
          <Button
            variant={"outline"}
            onClick={() => {
              handleSubmitFeedback();
              setIsSubmitted(true);
              setRating(0);
              setRatingExperience("")
              console.log("calling handleSubmitFeedback");
            }}
            className={`hover:bg-secondarycol hover:text-white`}
          >
            Submit
          </Button>
        </div>
      )}
      <div className="h-[10px]"></div>
    </div>
  );
};

export default FeedbackUi;
