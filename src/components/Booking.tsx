import { TBooking } from "@/db/models/bookings-model";
import { DummyBookingType } from "@/helpers/dummyBooking";
import { removeCharactersFromString } from "@/helpers/utilities";
import { FC } from "react";

interface BookingProps {
  bookingInfo: DummyBookingType;
}

const Booking: FC<BookingProps> = ({ bookingInfo }) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full p-2"
      onClick={() => {}}
    >
      <div className="w-full">
        <div className="text-state-700 flex flex-col justify-center text-xl border-b-[1px] border-t-[1px] border-greenaccentcol/15 py-2">
          <span>Personal Details</span>
        </div>
        <div className="text-state-700 font-light flex justify-start text-[16px] border-greenaccentcol/15 pb-2">
          <p>
            {" "}
            <span>
              Name: <span className="w-full text-slate-600">{bookingInfo.name}</span>
            </span>
          </p>
        </div>
        <div className="text-state-700 font-light flex justify-start text-[16px] border-greenaccentcol/15 pb-2">
          <p>
            {" "}
            <span>
              Phone Number:{" "}
              <span className="w-full text-slate-600">{bookingInfo.phoneNumber}</span>
            </span>
          </p>
        </div>
        <div className="text-state-700 font-light flex justify-start text-[16px] border-greenaccentcol/15 pb-2">
          <p>
            {" "}
            <span>
              Email: <span className="w-full text-slate-600">{bookingInfo.email}</span>
            </span>
          </p>
        </div>
        <div className="text-state-700 font-light flex justify-start text-[16px] border-greenaccentcol/15 pb-2">
          <p>
            {" "}
            <span>
              Post Code: <span className="w-full text-slate-600">{bookingInfo.postcode}</span>
            </span>
          </p>
        </div>
        <div className="text-state-700 font-light flex justify-start text-[16px] border-greenaccentcol/15 pb-2">
          <p>
            {" "}
            <span>
              Preffered Date:{" "}
              <span className="w-full text-slate-600">{bookingInfo.prefferedDate}</span>
            </span>
          </p>
        </div>
        <div className="text-state-700 font-light flex justify-start text-[16px] border-greenaccentcol/15 pb-2">
          <p>
            {" "}
            <span>
              Preffered Time:{" "}
              <span className="w-full text-slate-600">{bookingInfo.prefferedTime}</span>
            </span>
          </p>
        </div>
        {/* SELECTED SERVICE DETAILS */}

        <div className="text-state-700 mt-4 flex flex-col justify-center text-xl border-b-[1px] border-greenaccentcol/15 border-t-[1px] py-2">
          <span>{bookingInfo.selectedService}</span>
        </div>
        <div className="pl-4">
          <ol className="list-decimal text-state-700">
            {bookingInfo.bookingInfo.map((info, index) => {
              return (
                <li key={index + info._id}>
                  <div className="text-state-700 font-light flex justify-start text-[16px] border-greenaccentcol/15 pb-2">
                    <p>
                      {removeCharactersFromString(info.question, [":", "?"])}:{" "}
                      <span className="text-slate-600 font-normal">
                        {info.answers.map((answer, index) => {
                          if(index === 0){
                            return (
                              <span key={answer + index} className="w-full">
                                {answer}
                              </span>
                            );
                          } 
                          return (
                            <span key={answer + index} className="w-full">
                              {", " + answer}
                            </span>
                          );
                        })}
                      </span>
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {bookingInfo?.additionalNotes !== "" && (
          <>
            <div className="text-state-700 flex flex-col justify-center text-xl border-b-[1px] border-t-[1px] border-greenaccentcol/15 py-2">
              <span>Additional Notes</span>
            </div>
            <div className="text-state-700 font-light flex justify-start text-[16px] border-greenaccentcol/15 pb-2">
              <p>
                {" "}
                <span>
                  <span className="w-full text-slate-600">{bookingInfo.additionalNotes}</span>
                </span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Booking;
