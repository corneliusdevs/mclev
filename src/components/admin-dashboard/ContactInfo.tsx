import { ContactUsType } from "@/db/models/contact-us-model";
import { FC } from "react";

interface ContactsProps {
  contactInfo: ContactUsType;
}

const Booking: FC<ContactsProps> = ({ contactInfo }) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full p-2"
      onClick={() => {}}
    >
      <div className="w-full">
        <div className="text-state-700 flex flex-col justify-center text-xl border-b-[1px] border-t-[1px] border-greenaccentcol/15 py-2">
          <span>Contact Details</span>
        </div>
        <div className="text-state-700 font-light flex justify-start text-[16px] border-greenaccentcol/15 pb-2 mt-2">
          <p>
            {" "}
            <span>
              Name:{" "}
              <span className="w-full text-slate-600">{contactInfo.name}</span>
            </span>
          </p>
        </div>
        {contactInfo?.phoneNumber && (
          <div className="text-state-700 font-light flex justify-start text-[16px] border-greenaccentcol/15 pb-2">
            <p>
              {" "}
              <span>
                Phone Number:{" "}
                <span className="w-full text-slate-600">
                  {contactInfo.phoneNumber}
                </span>
              </span>
            </p>
          </div>
        )}

        <div className="text-state-700 font-light flex justify-start text-[16px] border-greenaccentcol/15 pb-2">
          <p>
            {" "}
            <span>
              Email:{" "}
              <span className="w-full text-slate-600">{contactInfo.email}</span>
            </span>
          </p>
        </div>

        {contactInfo?.message !== "" && (
          <>
            <div className="text-state-700 flex flex-col justify-center text-xl border-b-[1px] border-t-[1px] border-greenaccentcol/15 py-2 mt-4">
              <span>Message</span>
            </div>
            <div className="text-state-700 font-light flex justify-start text-[16px] border-greenaccentcol/15 pb-2 mt-2">
              <p>
                {" "}
                <span>
                  Subject:{" "}
                  <span className="w-full text-slate-600">
                    {contactInfo.subject}
                  </span>
                </span>
              </p>
            </div>
            <div className="text-state-700 font-light flex justify-start text-[16px] border-greenaccentcol/15 pb-2">
              <p>
                {" "}
                <span>
                  Message:{" "}
                  <span className="w-full text-slate-600">
                    {contactInfo.message}
                  </span>
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
