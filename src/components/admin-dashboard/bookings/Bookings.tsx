import BookingList from "@/ui/admin-dashboard/BookingList";
import { ArrowLeft, Bird, Loader2, MoveLeft } from "lucide-react";
import { FC, useEffect, useState } from "react";
import "./bookings.css";
import { trpc } from "@/trpc-client/client";
import { TBooking } from "@/db/models/bookings-model";
import Booking from "@/components/Booking";
import { DummyBookingType, dummyBooking } from "@/helpers/dummyBooking";
import ButtonWithIcons from "@/ui/admin-dashboard/ButtonWithIcon";

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
  const {
    data,
    isLoading: isFetchingBookings,
    error,
  } = trpc.getBookings.useQuery();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data && data?.bookings.length !== 0) {
      setBookings(data.bookings);
      setIsLoading(false);
    }
    if (!isFetchingBookings) {
      setIsLoading(false);
    }
    
  }, [isFetchingBookings, data]);

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
          <div className="sticky z-20 top-[50px] bg-white/95 text-black flex flex-col justify-start text-2xl border-b-[1px] border-greenaccentcol/15 pb-2 text-center">
            <span>All Bookings</span>
          </div>
          {data.bookings.map((booking, index) => {
            return (
              <BookingList
                key={booking._id + index}
                title={booking.selectedService}
                subTitle={booking.name}
                unread={!booking.isRead}
                description={
                  booking.additionalNotes ? booking.additionalNotes : ""
                }
                timeStamp={"3 hours ago"}
                clickHandler={() => {
                  setBookingsState({
                    viewingBooking: true,
                    bookingId: booking._id,
                  });
                }}
              />
            );
          })}
        </div>
      ) : bookingsState.viewingBooking ? (
        <div>{getBookingInfoFromState(bookings, bookingsState.bookingId)}</div>
      ) : (
        <div>
          {/* <BookingList
            title="William Smith"
            subTitle="Meeting Tomorrow"
            description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
            timeStamp={"3 hours ago"}
            unread={true}
          />
          <BookingList
            title="John James"
            subTitle="Meeting Tomorrow"
            description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
            timeStamp={"3 hours ago"}
            unread={true}
          />
          <BookingList
            title="Janet Ruth"
            subTitle="Meeting Tomorrow"
            description="I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details I would love to make enquiries on a number of services you render, seeing you are the best cleaning service in south London and I love your deication and attention to details"
            timeStamp={"3 hours ago"}
            unread={true}
          /> */}
        </div>
      )}
    </div>
  );
};

export default Bookings;
