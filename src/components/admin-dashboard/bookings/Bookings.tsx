import BookingList from "@/ui/admin-dashboard/BookingList";
import { Bird, Loader2, MoveLeft, Rabbit, RefreshCcw } from "lucide-react";
import { FC, useEffect, useState } from "react";
import "./bookings.css";
import { trpc } from "@/trpc-client/client";
import Booking from "@/components/Booking";
import { DummyBookingType, dummyBooking } from "@/helpers/dummyBooking";
import ButtonWithIcons from "@/ui/admin-dashboard/ButtonWithIcon";
import { formatTimeDuration } from "@/helpers/utilities";
import { formatDistanceToNowStrict } from "date-fns";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Search from "@/ui/admin-dashboard/Search";
import SearchUi from "@/ui/admin-dashboard/Search";
import { SearchUiPayload } from "../types";

interface BookingsProps {}

type BookingsState = {
  viewingBooking: boolean;
  bookingId: string;
};

const Bookings: FC<BookingsProps> = () => {
  const [bookingsState, setBookingsState] = useState<BookingsState>({
    viewingBooking: false,
    bookingId: "",
  });

  const [bookings, setBookings] = useState<DummyBookingType[]>([]);

  const [isDataSearched, setIsDataSearched] = useState<boolean>(false);

  const [searchResults, setSearchResults] = useState<SearchUiPayload>([]);

  const {
    data,
    isLoading: isFetchingBookings,
    error,
    refetch: refetchBookings,
  } = trpc.bookings.get.useQuery();

  const {
    mutate: markBookingAsReadMutation,
    isLoading: isMarkingChatAsRead,
    error: errorMarkingChatAsRead,
  } = trpc.bookings.markAsRead.useMutation({
    networkMode: "always",
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [shouldMarkAsRead, setShouldMarkAsRead] = useState<{
    markAsRead: boolean;
    bookingId: string;
  }>({
    markAsRead: false,
    bookingId: "",
  });

  const [isRefetchingBookings, setIsRefetchingBookings] =
    useState<boolean>(false);

  useEffect(() => {
    if (isRefetchingBookings) {
      const fetchPromise = refetchBookings();

      // show toast notifications
      toast.promise(fetchPromise, {
        loading: "Updating bookings",
        success: "Bookings up to date",
        error: "Could not update bookings",
      });

      setIsRefetchingBookings(false);
    }

    if (data && data?.bookings.length !== 0) {
      setBookings(data.bookings);
      setIsLoading(false);
    }
    if (!isFetchingBookings) {
      setIsLoading(false);
    }
  }, [isFetchingBookings, data, isRefetchingBookings]);

  const getBookingInfoFromState = (
    state: DummyBookingType[],
    bookingId: string
  ) => {
    for (let i = 0; i < state.length; i++) {
      if (state[i]._id === bookingId) {
        return <Booking bookingInfo={state[i]} />;
      }
    }

    return <Booking bookingInfo={dummyBooking} />;
  };

  useEffect(() => {
    // register admin socket Id
    if (shouldMarkAsRead.markAsRead) {
      console.log("marking as read...");
      markBookingAsReadMutation({
        bookingId: shouldMarkAsRead.bookingId,
      });
    }

    setShouldMarkAsRead({
      markAsRead: false,
      bookingId: "",
    });
  }, [shouldMarkAsRead.markAsRead]);

  let bookingsToBeMapped = isDataSearched ? searchResults : bookings

  return (
    <div>
      {bookingsState.viewingBooking && (
        <div className="sticky z-20 top-[50px] left-0">
          {/* BACK BUTTON */}
          <ButtonWithIcons
            icon={<MoveLeft size={20} />}
            text={"All Bookings"}
            extraInfo=""
            className={`w-full rounded-none font-xl`}
            variant={"outline"}
            clickHandler={() => {
              setBookingsState({
                viewingBooking: false,
                bookingId: "",
              });
            }}
          />
        </div>
      )}
      {isLoading ? (
        <div className="relative w-full h-[50vh] flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex justify-center text-gray-500 animate-spin">
              <Loader2 size={100} strokeWidth={1} />{" "}
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
      ) : bookings.length === 0 && !isFetchingBookings ? (
        <div className="w-full h-[50vh] flex justify-center items-center">
          <div className="flex flex-col">
            <div className="flex justify-center text-gray-500 transform rotateYOnHover">
              <Bird size={170} strokeWidth={1} />{" "}
            </div>
            <p className="flex items-center justify-center text-gray-600 text-xl">
              No Booking yet
            </p>
          </div>
        </div>
      ) : data && !bookingsState.viewingBooking ? (
        <div className="">
          <div className="sticky z-20 top-[50px] bg-white/95 text-black flex items-center justify-center text-xl border-b-[1px] border-greenaccentcol/15 py-1 text-center">
            <span className="mr-4">All Bookings</span>
            <Button
              variant={"outline"}
              onClick={() => {
                setIsRefetchingBookings(true);
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
            dataToBeSearched={bookings}
            dataName={"bookings"}
            setSearchResults={setSearchResults}
            onSearch={() => {
              setIsDataSearched(true);
            }}
            onClearSearchResults={() => {
              setIsDataSearched(false);
            }}

            placeholder={"lookup name or service"}
          />
        </div>
          {isDataSearched && bookingsToBeMapped.length === 0 && (
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
            {bookingsToBeMapped.map((booking, index) => {
              return (
                <BookingList
                  key={booking._id + index}
                  bookingId={booking._id}
                  title={booking.selectedService}
                  subTitle={booking.name}
                  unread={!booking.isRead}
                  refreshBookingState={setIsRefetchingBookings}
                  description={
                    booking.additionalNotes ? booking.additionalNotes : ""
                  }
                  timeStamp={formatTimeDuration(
                    formatDistanceToNowStrict(new Date(booking.timeStamp), {
                      addSuffix: true,
                    })
                  )}
                  clickHandler={() => {
                    setBookingsState({
                      viewingBooking: true,
                      bookingId: booking._id,
                    });

                    if (!booking.isRead) {
                      setShouldMarkAsRead({
                        markAsRead: true,
                        bookingId: booking._id,
                      });
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      ) : bookingsState.viewingBooking ? (
        <div>{getBookingInfoFromState(bookings, bookingsState.bookingId)}</div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Bookings;
