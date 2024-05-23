import { Bird, Loader2, MailCheck, MailMinus, MoveLeft, Rabbit, RefreshCcw, Ticket } from "lucide-react";
import { FC, useEffect, useState } from "react";
import "./bookings/bookings.css";
import { trpc } from "@/trpc-client/client";
import ButtonWithIcons from "@/ui/admin-dashboard/ButtonWithIcon";
import { formatTimeDuration } from "@/helpers/utilities";
import { formatDistanceToNowStrict } from "date-fns";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { TFeedback } from "@/db/models/feedback-model";
import AdminFeedbackUi from "../AdminFeedbackUi";
import FeedbackList from "@/ui/admin-dashboard/FeedbackList";
import SearchUi from "@/ui/admin-dashboard/Search";
import { SearchUiPayload } from "./types";

interface FeedbacksProps {}

type FeedbacksState = {
  isViewingFeedbacks: boolean;
  feedbackId: string;
  isPublished: boolean;
};

const Feedbacks: FC<FeedbacksProps> = ({}) => {
  const [feedbacksState, setFeedbacksState] = useState<FeedbacksState>({
    isViewingFeedbacks: false,
    feedbackId: "",
    isPublished: false
  });

  const [feedbacks, setFeedbacks] = useState<TFeedback[]>([]);
  const {
    data,
    isLoading: isFetchingFeedbacks,
    error,
    refetch: refetchFeedbacks,
  } = trpc.feedback.get.useQuery();

  const {
    mutate: markFeedBackAsReadMutation,
    isLoading: isMarkingChatAsRead,
    error: errorMarkingChatAsRead,
  } = trpc.feedback.markAsRead.useMutation({
    networkMode: "always",
  });



  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [shouldMarkAsRead, setShouldMarkAsRead] = useState<{
    markAsRead: boolean;
    feedbackId: string;
  }>({
    markAsRead: false,
    feedbackId: "",
  });

  const [isRefetchingFeedbacks, setIsRefetchingFeedbacks] =
    useState<boolean>(false);

  const [isDataSearched, setIsDataSearched] = useState<boolean>(false);

  const [searchResults, setSearchResults] = useState<SearchUiPayload>([]);
 



 

  useEffect(() => {
    if (isRefetchingFeedbacks) {
      const fetchPromise = refetchFeedbacks();

      // show toast notifications
      toast.promise(fetchPromise, {
        loading: "Updating feedbacks",
        success: "feedbacks up to date",
        error: "Could not update feedbacks",
      });

      setIsRefetchingFeedbacks(false);
    }

    if (data && data?.feedbacks.length !== 0) {
      setFeedbacks(data.feedbacks);
      setIsLoading(false);
    }
    if (!isFetchingFeedbacks) {
      setIsLoading(false);
    }
  }, [isFetchingFeedbacks, data, isRefetchingFeedbacks]);

  const getFeedbackInfoFromState = (state: TFeedback[], feedbackId: string) => {
    for (let i = 0; i < state.length; i++) {
      if (state[i]._id === feedbackId) {
        return <AdminFeedbackUi feedbackInfo={state[i]} />;
      }
    }

    return <AdminFeedbackUi feedbackInfo={state[0]} />;
  };

  useEffect(() => {
    // register admin socket Id
    if (shouldMarkAsRead.markAsRead) {
      console.log("marking as read...");
      markFeedBackAsReadMutation({
        feedbackId: shouldMarkAsRead.feedbackId,
      });
    }

    setShouldMarkAsRead({
      markAsRead: false,
      feedbackId: "",
    });
  }, [shouldMarkAsRead.markAsRead]);


  let feedbacksToBeRendered = isDataSearched ? searchResults : feedbacks

  return (
    <div>
      {feedbacksState.isViewingFeedbacks && (
        <div className="sticky z-20 top-[50px] left-0 flex w-full">
          {/* BACK BUTTON */}
          <ButtonWithIcons
            icon={<MoveLeft size={20} />}
            text={"All Feedbacks"}
            extraInfo=""
            className={`w-full rounded-none font-xl`}
            variant={"outline"}
            clickHandler={() => {
              setFeedbacksState({
                isViewingFeedbacks: false,
                feedbackId: "",
                isPublished: false

              });
            }}
          />
        </div>
      )}
      {isLoading ? (
        <div className="relative w-full h-[50vh] flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex justify-center text-slate-500 animate-spin">
              <Loader2 size={24} strokeWidth={1} />{" "}
            </div>
            <p className="flex items-center justify-center text-gray-600 text-xl">
              Fetching...
            </p>
          </div>
        </div>
      ) : error ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex justify-center text-gray-500 transform rotateYOnHover">
              <Bird size={170} strokeWidth={1} />{" "}
            </div>
            <p className="flex items-center justify-center text-gray-600 text-xl">
              Oops! Something Went Wrong
            </p>
          </div>
        </div>
      ) : feedbacks.length === 0 && !isFetchingFeedbacks ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex justify-center text-gray-500 transform rotateYOnHover">
              <Bird size={170} strokeWidth={1} />{" "}
            </div>
            <p className="flex items-center justify-center text-gray-600 text-xl">
              No Feedback yet
            </p>
            <p className="flex items-center justify-center text-gray-600 text-xl pt-2">
              <Button
                variant={"outline"}
                onClick={() => {
                  setIsRefetchingFeedbacks(true);
                }}
              >
                <span className="pr-2">Refresh</span>
                <RefreshCcw
                  className={`${isRefetchingFeedbacks && "animate-spin"}`}
                />
              </Button>
            </p>
          </div>
        </div>
      ) : data && !feedbacksState.isViewingFeedbacks ? (
        <div className="">
          <div className="sticky z-20 top-[50px] bg-white/95 text-black flex items-center justify-center text-xl border-b-[1px] border-greenaccentcol/15 py-1 text-center">
            <span className="mr-4">All Feedbacks</span>
            <Button
              variant={"outline"}
              onClick={() => {
                setIsRefetchingFeedbacks(true);
              }}
            >
              <span>
                <RefreshCcw size={19} className="text-slate-600" />
              </span>
            </Button>
          </div>

          {/* SEARCH UI */}
          <div className="flex justify-center items-center max-w[400px] w-full p-2">
            <SearchUi
              dataToBeSearched={feedbacks}
              dataName={"feedbacks"}
              setSearchResults={setSearchResults}
              onSearch={() => {
                setIsDataSearched(true);
              }}
              onClearSearchResults={() => {
                setIsDataSearched(false);
              }}
              placeholder={"client's name"}
            />
          </div>
          {isDataSearched && feedbacksToBeRendered.length === 0 && (
            <div className="relative w-full h-[50vh] flex justify-center items-center">
              <div className="flex flex-col">
                <div className="flex justify-center text-gray-500">
                  <Rabbit size={50} strokeWidth={1} />{" "}
                </div>
                <p className="flex items-center justify-center text-gray-600 text-xl">
                  No Match Found.
                </p>
              </div>
            </div>
          )}
          <div className="flex px-2 flex-col">
            {feedbacksToBeRendered.map((feedback, index) => {
              return (
                <FeedbackList
                  key={feedback._id + index}
                  feedbackId={feedback._id}
                  title={
                    feedback.name.length > 12
                      ? feedback.name.slice(0, 11) + "..."
                      : feedback.name
                  }
                  subTitle={""}
                  unread={!feedback.isViewed}
                  description={feedback.experience}
                  refreshFeedbackState={setIsRefetchingFeedbacks}
                  timeStamp={formatTimeDuration(
                    formatDistanceToNowStrict(new Date(feedback.timeStamp), {
                      addSuffix: true,
                    })
                  )}
                  clickHandler={() => {
                    setFeedbacksState({
                      isViewingFeedbacks: true,
                      feedbackId: feedback._id,
                      isPublished: feedback.publishToFrontend
                    });

                    if (!feedback.isViewed) {
                      setShouldMarkAsRead({
                        markAsRead: true,
                        feedbackId: feedback._id,
                      });
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      ) : feedbacksState.isViewingFeedbacks ? (
        <div>
          {getFeedbackInfoFromState(feedbacks, feedbacksState.feedbackId)}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Feedbacks;
