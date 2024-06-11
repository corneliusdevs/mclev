"use client";
import { TFeedback } from "@/db/models/feedback-model";
import { FC, useEffect, useState } from "react";
import AlertDialogComponent from "../AlertDialogComponent";
import AdminButton from "@/ui/admin-dashboard/AdminButton";
import { trpc } from "@/trpc-client/client";
import toast from "react-hot-toast";
import ButtonWithIcons from "@/ui/admin-dashboard/ButtonWithIcon";
import { MailCheck, MailMinus } from "lucide-react";

interface FeedbackUiProps {
  feedbackInfo: TFeedback;
}

const AdminFeedbackUi: FC<FeedbackUiProps> = ({ feedbackInfo }) => {
  const [adminReply, setAdminReply] = useState<string>("");
  const [changePublishStatus, setChangePublishStatus] =
    useState<boolean>(false);

  const {
    mutate: addAdminResponseMutation,
    isLoading,
    isSuccess,
    error,
    data,
  } = trpc.feedback.addAdminResponse.useMutation({
    networkMode: "always",
  });

  const {
    mutate: publishToWebsite,
    isLoading: isPublishing,
    data: responseShouldPublishToWebsite,
    error: errorShouldPublishToWebsite,
  } = trpc.feedback.publish.useMutation({
    networkMode: "always",
  });

  const {
    mutate: unpublishFromWebsite,
    isLoading: isUnpublishing,
    data: responseUnPublishToWebsite,
    error: errorUnPublishFromWebsite,
  } = trpc.feedback.publish.useMutation({
    networkMode: "always",
  });

  useEffect(() => {
    if (changePublishStatus) {
      if (feedbackInfo.publishToFrontend) {
        toast("Taking down feedback");
        unpublishFromWebsite(
          {
            feedbackId: feedbackInfo._id,
            shouldPublish: false,
          },
          {
            onSuccess: (data) => {
              if (data.httpStatus === 201) {
                toast.success("Feedback taken down");
              } else {
                toast.error("Could not take down feedback");
              }
            },
            onError: (error) => {
              console.log("Could not take down feedback", error);
              toast.error("Could not take down feedback");
            },
          }
        );
      } else {
        toast("Publishing feedback...");
        publishToWebsite(
          {
            feedbackId: feedbackInfo._id,
            shouldPublish: true,
          },
          {
            onSuccess: (data) => {
              if (data.httpStatus === 201) {
                toast.success("Feedback published");
              }
            },
            onError: (error) => {
              console.log("Could not publish feedback ", error);
              toast.error("Could not publish feedback");
            },
          }
        );
      }
    }

    setChangePublishStatus(false);
  }, [changePublishStatus]);

  console.log(feedbackInfo);

  return (
    <div
      className="relative flex flex-col items-start w-full p-2 mt-10"
      onClick={() => {}}
    >
      <div className="sticky z-20 top-[-40px] right-0 flex w-full py-[2px] justify-end mt-[-46px]">
        {/* PUBLISH BUTTON */}
          <ButtonWithIcons
            icon={
              feedbackInfo.publishToFrontend ? (
                <MailMinus size={20} className="mr-2" />
              ) : (
                <MailCheck size={20} className="mr-2" />
              )
            }
            text={feedbackInfo.publishToFrontend ? "Unpublish" : "Publish"}
            extraInfo=""
            className={`w-full rounded-none font-xl`}
            variant={"outline"}
            containerStyles={"flex min-w-full"}
            clickHandler={() => {
              setChangePublishStatus(true);
            }}
          />
      </div>
      <div className="px-3 mb-2">
        <span>
          <b>From</b>: {feedbackInfo.name}
        </span>
      </div>
      <div className="flex flex-col px-3 mb-2">
        <span>
          <b>Comment</b>:{" "}
        </span>
        <span className="pl-1 italic">{feedbackInfo.experience}</span>
      </div>
      <div className="flex flex-col items-center w-full p-3 text-center mt-3">
        <textarea
          className="p-2 border-[1.5px] border-primarycol/10 w-full max-w-[450px]"
          onChange={(e) => {
            setAdminReply(() => {
              return e.target.value;
            });
          }}
          value={adminReply}
          placeholder="your reply..."
          rows={10}
          // cols={}
          name="additional-details"
        ></textarea>
      </div>
      <div className={`flex justify-center w-full p-4 mt-2`}>
        {adminReply.length > 2 && (
          <AlertDialogComponent
            title={
              isLoading
                ? "Saving Response..."
                : data?.httpStatus === 201
                ? "Response Saved!"
                : "Something went wrong"
            }
            buttonClassname=""
            actionButtonClassName={`${
              isLoading
                ? "bg-slate-500"
                : data?.httpStatus === 201
                ? "bg-primarycol/90 hover:bg-primarycol/70"
                : "bg-red-500 hover:bg-red-600"
            }${isLoading && " bg-slate-500"}`}
            buttonSize={"lg"}
            buttonText="Ok"
            actionText="Ok"
            description=""
            isDisabled={isLoading}
            buttonVariant={"outline"}
            customButton={
              <AdminButton
                type="submit"
                text="Submit"
                className={`bg-secondarycol px-8 transform hover:scale-90`}
                onClick={() => {
                  addAdminResponseMutation({
                    feedbackId: feedbackInfo._id,
                    adminResponse: adminReply,
                  });
                  console.log("form state errors ");
                }}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

export default AdminFeedbackUi;
