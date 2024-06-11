"use client"
import AlertDialogComponent from "@/components/AlertDialogComponent";
import { trpc } from "@/trpc-client/client";
import { Trash2Icon } from "lucide-react";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ContactListProps {
  title: string;
  subTitle: string;
  description: string;
  timeStamp: string;
  unread?: boolean;
  clickHandler?: Function,
  contactId: string;
  refreshContactState: Dispatch<SetStateAction<boolean>>;  // must return a promise
}

const ContactList: FC<ContactListProps> = ({
  title,
  subTitle,
  description,
  timeStamp,
  unread,
  clickHandler,
  contactId,
  refreshContactState,
  ...props
}) => {

  const [deleteContact, setDeleteContact] = useState<boolean>(false);

  const {
    data,
    isLoading: isDeletingContacts,
    error,
    refetch: deleteContactFromDb,
  } = trpc.contact.delete.useQuery(
    {
      contactId: contactId,
    },
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (deleteContact) {
      const deleteContactPromise = deleteContactFromDb();

      //  toast notification
      toast
        .promise(deleteContactPromise, {
          loading: `Deleting ${title}`,
          success: `Contact ${title} deleted`,
          error: `Failed to delete Contact ${title}`,
        })
        .then(() => {
          refreshContactState(true);
        });
      }


    setDeleteContact(false);
    // refreshChatState(true)
  }, [deleteContact]);
  return (
    <div className="relative flex flex-col items-center justify-center w-full py-2 ">
    <div className="border-2 rounded-sm p-2 relative hover:bg-slate-200 min-w-full pb-3">
      <div
        className="font-[600] truncate text-ellipsis"
        onClick={() => {
          if (clickHandler)clickHandler();
        }}
      >
        {title.length >= 12 ? `${title.slice(0, 11)}...` : title}
      </div>
      <div className="font-[400] text-sm">{subTitle}</div>
      <div className="flex justify-between pt-1">
        <div
          className="text-[14px] truncate text-ellipsis h-[20px] text-state-300 max-w-[230px] pr-4 min-w-[50px]"
          onClick={() => {
            if (clickHandler)clickHandler();
          }}
        >
          {description}
        </div>
      </div>

      <div className="text-sm absolute top-2 right-[10px] flex items-center">
        {timeStamp}
        {unread && (
          <div className="rounded-full bg-blue-500 w-2 h-2 ml-[4px]"></div>
        )}
      </div>
      <AlertDialogComponent
        title={`Delete`}
        description={`Delete Contact ${title}?`}
        actionText={"Delete"}
        cancelText={"Cancel"}
        buttonClassname={
          "absolute right-0 bottom-1 pr-1 text-black/80 hover:text-red-500 hover:cursor-pointer hover:border-none hover:bg-transparent"
        }
        buttonText={<Trash2Icon />}
        buttonVariant={"ghost"}
        actionButtonClassName={"bg-red-500 hover:bg-red-600"}
        onActionButtonClickHandler={() => {
          setDeleteContact(true);
        }}
      />
    </div>
  </div>
  );
};

export default ContactList;
