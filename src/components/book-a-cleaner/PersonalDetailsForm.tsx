"use client";

import { trpc } from "@/trpc-client/client";
import AdminButton from "@/ui/admin-dashboard/AdminButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  PersonalDetailsSchemaType,
  personalDetailsSchema,
} from "@/helpers/personalDetailsSchema";
import TextSelectQuestionaire from "@/components/book-a-cleaner/TextSelectQuestionaire";
import AlertDialogComponent from "@/components/AlertDialogComponent";
import { SelectedOptionWithAnswers } from "@/helpers/updateSelectedOptions";
import { servicesToSelectLookup } from "@/helpers/servicesToSelect";
import { companyEmail, companyPhoneNumber } from "@/helpers/siteInfo";

interface PersonalDetailsFormProps {
  bookingInfo?: SelectedOptionWithAnswers[];
  selectedService: string;
}

const PersonalDetailsForm: FC<PersonalDetailsFormProps> = ({
  bookingInfo,
  selectedService,
}): React.ReactNode => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalDetailsSchemaType>({
    resolver: zodResolver(personalDetailsSchema),
  });

  const { mutate, isLoading } = trpc.bookings.create.useMutation({
    networkMode: "always",
  });

  const [httpStatus, setHttpStatus] = useState<number>();

  const [additionalNotes, setAdditionalNotes] = useState<string>("");

  const onSubmit = async (info: PersonalDetailsSchemaType) => {
    console.log(
      "selected service is ",
      servicesToSelectLookup[selectedService]
    );
    console.log({
      ...info,
      additionalNotes,
      bookingInfo,
    });

    console.log("this is booking info ", bookingInfo);

    // send the request to the api
    if (
      typeof selectedService !== "undefined" &&
      typeof bookingInfo !== "undefined"
    ) {
      mutate(
        {
          ...info,
          additionalNotes,
          selectedService: servicesToSelectLookup[selectedService],
          bookingInfo,
        },
        {
          onSuccess: (data) => {
            console.log("submit success ", data);
            setHttpStatus(data.httpStatus);
            // router.push("/admin-dashboard");
          },
          onError: (error) => {
            setHttpStatus(error.data?.httpStatus);
            console.log("error creating booking ", error);
          },
        }
      );
    }
  };

  return (
    <main className="bg-white">
      <div className="flex justify-center items-center min-w-[100%] bg-primarycol/20">
        <div className="flex flex-col w-full bg-white p-4 pt-6 pb-1">
          {/* PERSONAL DETAILS FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>

            {/* NAME SECTION */}
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            <p>
              {" "}
              <span>
                Name <span className="text-red-500">&#42;</span>
              </span>
            </p>
            {/* NAME INPUT */}
            <div className="flex flex-col mb-4 w-full border-[1px] border-primarycol/10">
              <input
                className="p-2"
                type="text"
                {...register("name")}
                placeholder="e.g Janet Johnson"
              />
            </div>


            {/* PHONE NUMBER SECTION */}
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
            <p>
              {" "}
              <span>
                Phone Number <span className="text-red-500">&#42;</span>
              </span>
            </p>
            {/* PHONE NUMBER INPUT */}
            <div className="flex flex-col mb-4 w-full border-[1px] border-primarycol/10">
              <input
                className="p-2"
                type="phone"
                placeholder={`e.g ${companyPhoneNumber}`}
                {...register("phoneNumber")}
              />
            </div>


            {/* EMAIL SECTION */}
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <p>
              {" "}
              <span>
                Email <span className="text-red-500">&#42;</span>
              </span>
            </p>
            {/* EMAIL INPUT */}
            <div className="flex flex-col mb-4 w-full border-[1px] border-primarycol/10">
              <input
                className="p-2"
                placeholder={`e.g ${companyEmail}`}
                type="text"
                {...register("email")}
              />
            </div>


            {/* POSTCODE SECTION */}
            {errors.postcode && (
              <p className="text-red-500 text-sm">{errors.postcode.message}</p>
            )}
            <p>
              {" "}
              <span>
                Postal Code <span className="text-red-500">&#42;</span>
              </span>
            </p>
            {/* POST CODE INPUT */}
            <div className="flex flex-col mb-4 w-full border-[1px] border-primarycol/10">
              <input
                className="p-2"
                placeholder={`e.g SE18 1LN`}
                type="text"
                {...register("postcode")}
              />
            </div>

            {/* PREFERRED DATE */}
            {errors.prefferedDate && (
              <p className="text-red-500 text-sm">
                {errors.prefferedDate.message}
              </p>
            )}
            <p>
              {" "}
              <span>
                Preffered Date <span className="text-red-500">&#42;</span>
              </span>
            </p>
            {/* PREFERRED DATE INPUT */}
            <div className="flex flex-col mb-4 w-full border-[1px] border-primarycol/10">
              <input
                className="p-2"
                type="text"
                placeholder="e.g dd-mm-yy or dd/mm/yy"
                {...register("prefferedDate")}
              />
            </div>


            {/* PREFERRED TIME SECTION */}
            {errors.prefferedTime && (
              <p className="text-red-500 text-sm">
                {errors.prefferedTime.message}
              </p>
            )}
            <p>
              {" "}
              <span>
                Preffered Time <span className="text-red-500">&#42;</span>
              </span>
            </p>
            {/* PREFERRED TIME INPUT */}
            <div className="flex flex-col mb-4 w-full border-[1px] border-primarycol/10">
              <input
                className="p-2"
                type="text"
                placeholder="e.g 3:00am or 4:00pm"
                {...register("prefferedTime")}
              />
            </div>


            {/* ADDITIONAL NOTES SECTION */}
            {errors.additionalNotes && (
              <p className="text-red-500 text-sm">
                {errors.additionalNotes.message}
              </p>
            )}
            <p>
              {" "}
              <span>Additional Notes</span>
            </p>
            {/* ADDITIONAL NOTES INPUT */}
            <div className="flex items-start">
              <textarea
                className="p-2 border-[1.5px] border-primarycol/10"
                placeholder="Do you have any additional instructions or information that would help us provide the best service?"
                {...register("additionalNotes")}
                onChange={(e) => {
                  setAdditionalNotes(e.target.value);
                }}
                value={additionalNotes}
                rows={10}
                cols={50}
                name="additional-details"
              ></textarea>
            </div>

            <div className={`flex justify-center p-4 mt-2`}>
              <AlertDialogComponent
                title={
                  typeof Object.values(errors)[0]?.message !== "undefined"
                    ? Object.values(errors)[0].message
                    : isLoading === true
                    ? "Processing..."
                    : httpStatus === 201
                    ? "Thanks for Booking!"
                    : "Ooops! Something went wrong. Please try again later"
                }
                buttonClassname=""
                actionButtonClassName={`${
                  httpStatus === 200
                    ? "bg-primarycol/90 hover:bg-primarycol/70"
                    : "bg-red-400 hover:bg-red-500"
                }`}
                isDisabled={isLoading}
                buttonSize={"lg"}
                buttonText="Ok"
                actionText="Ok"
                description=""
                buttonVariant={"outline"}
                customButton={
                  <AdminButton
                    type="submit"
                    text="Submit"
                    className="bg-secondarycol px-8 transform hover:bg-white hover:text-secondarycol hover:border-[2px] hover:border-secondarycol"
                    onClick={() => {
                      console.log("form state errors ", errors);
                    }}
                  />
                }
              />
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default PersonalDetailsForm;
