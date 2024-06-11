import { Bird, Loader2, MoveLeft, Rabbit, RefreshCcw } from "lucide-react";
import { FC, useEffect, useState } from "react";
import "./bookings/bookings.css";
import { trpc } from "@/trpc-client/client";
import ButtonWithIcons from "@/ui/admin-dashboard/ButtonWithIcon";
import { formatTimeDuration } from "@/helpers/utilities";
import { formatDistanceToNowStrict } from "date-fns";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import ContactInfo from "./ContactInfo";
import SearchUi from "@/ui/admin-dashboard/Search";
import { SearchUiPayload } from "./types";
import { TContactUs } from "@/db/models/contact-us-model";
import ContactList from "@/ui/admin-dashboard/ContactList";

interface ContactsUsProps {}

type ContactUsState = {
  isViewingContacts: boolean;
  contactId: string;
};

const Contacts: FC<ContactsUsProps> = ({}) => {
  const [contactUsState, setContactUsState] = useState<ContactUsState>({
    isViewingContacts: false,
    contactId: "",
  });

  const [contacts, setContacts] = useState<TContactUs[]>([]);
  const {
    data,
    isLoading: isFetchingContacts,
    error,
    refetch: refetchContacts,
  } = trpc.contact.get.useQuery();

  const {
    mutate: markContactAsReadMutation,
    isLoading: isMarkingContactAsRead,
    error: errorMarkingContactAsRead,
  } = trpc.contact.markAsRead.useMutation({
    networkMode: "always",
  });



  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [shouldMarkAsRead, setShouldMarkAsRead] = useState<{
    markAsRead: boolean;
    contactId: string;
  }>({
    markAsRead: false,
    contactId: "",
  });

  const [isRefetchingContacts, setIsRefetchingContacts] =
    useState<boolean>(false);

  const [isDataSearched, setIsDataSearched] = useState<boolean>(false);

  const [searchResults, setSearchResults] = useState<SearchUiPayload>([]);
 

  useEffect(() => {
    if (isRefetchingContacts) {
      const fetchPromise = refetchContacts();

      // show toast notifications
      toast.promise(fetchPromise, {
        loading: "Updating Contacts",
        success: "Contacts up to date",
        error: "Could not update contacts",
      });

      setIsRefetchingContacts(false);
    }

    if (data && data?.contacts.length !== 0) {
      setContacts(data.contacts);
      setIsLoading(false);
    }
    if (!isFetchingContacts) {
      setIsLoading(false);
    }
  }, [isFetchingContacts, data, isRefetchingContacts]);

  const getContactInfoFromState = (state: TContactUs[], contactId: string) => {
    for (let i = 0; i < state.length; i++) {
      if (state[i]._id === contactId) {
        return <ContactInfo contactInfo={state[i]} />;
      }
    }

    return <ContactInfo contactInfo={state[0]} />;
  };

  useEffect(() => {
    // register admin socket Id
    if (shouldMarkAsRead.markAsRead) {
      console.log("marking as read...");
      markContactAsReadMutation({
        contactId: shouldMarkAsRead.contactId,
      });
    }

    setShouldMarkAsRead({
      markAsRead: false,
      contactId: "",
    });
  }, [shouldMarkAsRead.markAsRead]);


  let contactsToBeRendered = isDataSearched ? searchResults : contacts

  return (
    <div>
      {contactUsState.isViewingContacts && (
        <div className="sticky z-20 top-[50px] left-0 flex w-full">
          {/* BACK BUTTON */}
          <ButtonWithIcons
            icon={<MoveLeft size={20} />}
            text={"All Contacts"}
            extraInfo=""
            className={`w-full rounded-none font-xl`}
            variant={"outline"}
            clickHandler={() => {
              setContactUsState({
                isViewingContacts: false,
                contactId: "",
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
      ) : contacts.length === 0 && !isFetchingContacts ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex justify-center text-gray-500 transform rotateYOnHover">
              <Bird size={170} strokeWidth={1} />{" "}
            </div>
            <p className="flex items-center justify-center text-gray-600 text-xl">
              No Contacts yet
            </p>
            <p className="flex items-center justify-center text-gray-600 text-xl pt-2">
              <Button
                variant={"outline"}
                onClick={() => {
                  setIsRefetchingContacts(true);
                }}
              >
                <span className="pr-2">Refresh</span>
                <RefreshCcw
                  className={`${isRefetchingContacts && "animate-spin"}`}
                />
              </Button>
            </p>
          </div>
        </div>
      ) : data && !contactUsState.isViewingContacts ? (
        <div className="">
          <div className="sticky z-20 top-[50px] bg-white/95 text-black flex items-center justify-center text-xl border-b-[1px] border-greenaccentcol/15 py-1 text-center">
            <span className="mr-4">All Contacts</span>
            <Button
              variant={"outline"}
              onClick={() => {
                setIsRefetchingContacts(true);
              }}
            >
              <span>
                <RefreshCcw size={19} className="text-slate-600" />
              </span>
            </Button>
          </div>

          {/* SEARCH UI */}
          <div className="flex justify-center items-center w-full p-2">
            <SearchUi
              dataToBeSearched={contacts}
              dataName={"contacts"}
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
          {isDataSearched && contactsToBeRendered.length === 0 && (
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
            {contactsToBeRendered.map((contact, index) => {
              return (
                <ContactList
                  key={contact._id + index}
                  contactId={contact._id}
                  title={
                    contact.name.length > 12
                      ? contact.name.slice(0, 11) + "..."
                      : contact.name
                  }
                  subTitle={contact.email}
                  unread={!contact.isViewed}
                  description={contact.message.length > 20
                    ? contact.message.slice(0, 19) + "..."
                    : contact.message}
                  refreshContactState={setIsRefetchingContacts}
                  timeStamp={formatTimeDuration(
                    formatDistanceToNowStrict(new Date(contact.timeStamp), {
                      addSuffix: true,
                    })
                  )}
                  clickHandler={() => {
                    setContactUsState({
                      isViewingContacts: true,
                      contactId: contact._id,
                    });

                    if (!contact.isViewed) {
                      setShouldMarkAsRead({
                        markAsRead: true,
                        contactId: contact._id,
                      });
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      ) : contactUsState.isViewingContacts ? (
        <div>
          {getContactInfoFromState(contacts, contactUsState.contactId)}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Contacts;
