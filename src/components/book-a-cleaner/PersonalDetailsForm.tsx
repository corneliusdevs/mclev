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
import TextSelectQuestionaire from "./TextSelectQuestionaire";
import AlertDialogComponent from "../AlertDialogComponent";
import { Booking } from "@/db/models/bookings-model";




const PersonalDetailsForm: FC = (props): React.ReactNode => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalDetailsSchemaType>({
    resolver: zodResolver(personalDetailsSchema),
  });

  const { mutate, isLoading } = trpc.createBooking.useMutation({
    networkMode: "always",
  });

  const router = useRouter();
  const [httpStatus, setHttpStatus] = useState<number>();

  const [selectedTime, setSelectedTime] = useState<string>("");
  const [additionalNotes, setAdditionalNotes] = useState<string>("")

  const controlAm = ()=>{
    if(selectedTime === "" || selectedTime === "PM"){
      return true
    }
    return false
  }

  const controlPm = ()=>{
    if(selectedTime === "" || selectedTime === "AM"){
      return true
    }
    return false
  }

  const onSubmit = async (info:PersonalDetailsSchemaType ) => {

    console.log("executed submit");
   console.log({
    ...info,
    selectedTime,
    additionalNotes
   })
    
    // send the request to the api
    mutate(
      {
        ...info,
        prefferedTime: selectedTime,
        additionalNotes
      },
      {
        onSuccess: (data) => {
          console.log("submit success ", data)
          setHttpStatus(data.httpStatus);
          // router.push("/admin-dashboard");
        },
        onError: (error) => {
          setHttpStatus(error.data?.httpStatus);
          console.log("error creating booking ", error);
        },
      }
    );
  };

  return (
    <main className="bg-white">
      <div className="flex justify-center items-center min-w-[100%] bg-primarycol/20">
        <div className="flex flex-col w-full bg-white p-4 py-6 pb-4">

          {/* PERSONAL DETAILS FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            <p>
              {" "}
              <span>
                Name <span className="text-red-500">&#42;</span>
              </span>
            </p>
            <div className="flex flex-col mb-4 w-full border-[1px] border-primarycol/10">
              <input
                className="p-2"
                type="text"
                {...register("name")}
               
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
            )}
            <p>
              {" "}
              <span>
                Phone Number <span className="text-red-500">&#42;</span>
              </span>
            </p>
            <div className="flex flex-col mb-4 w-full border-[1px] border-primarycol/10">
              <input
                className="p-2"
                type="phone"
                {...register("phoneNumber")}
                
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <p>
              {" "}
              <span>
                Email <span className="text-red-500">&#42;</span>
              </span>
            </p>
            <div className="flex flex-col mb-4 w-full border-[1px] border-primarycol/10">
              <input
                className="p-2"
                type="text"
                {...register("email")}
                
              />
            </div>
            {errors.postcode && (
              <p className="text-red-500 text-sm">{errors.postcode.message}</p>
            )}
            <p>
              {" "}
              <span>
                Postal Code <span className="text-red-500">&#42;</span>
              </span>
            </p>
            <div className="flex flex-col mb-4 w-full border-[1px] border-primarycol/10">
              <input
                className="p-2"
                type="text"
                {...register("postcode")}
              />
            </div>
            {errors.prefferedDate && (
              <p className="text-red-500 text-sm">{errors.prefferedDate.message}</p>
            )}
            <p>
              {" "}
              <span>
                Preffered Date <span className="text-red-500">&#42;</span>
              </span>
            </p>
            <div className="flex flex-col mb-4 w-full border-[1px] border-primarycol/10">
              <input
                className="p-2"
                type="text"
                {...register("prefferedDate")}
              />
            </div>
            
            <p>
              {" "}
              <span>
                Preffered Time <span className="text-red-500">&#42;</span>
              </span>
            </p>
            <div className="flex mb-4 w-full">
              <TextSelectQuestionaire
              checkOff={controlAm()}
              onSelected={
                setSelectedTime
              }
              className={"max-w-[100px]"}
              option={{caption: "AM"}} />
              <div className="w-[100px]"></div>
              <TextSelectQuestionaire
              checkOff={controlPm()}
              onSelected={
                setSelectedTime
              }
              className={"max-w-[100px]"} option={{caption: "PM"}} />
            </div>
            {errors.additionalNotes && (
              <p className="text-red-500 text-sm">{errors.additionalNotes.message}</p>
            )}
            <p>
              {" "}
              <span>
                Additional Notes
              </span>
            </p>
            <div className="flex items-start">
              <textarea
               className="p-2 border-[1.5px] border-primarycol/10"
                {...register("additionalNotes")}
                onChange={(e)=>[
                  setAdditionalNotes(e.target.value)
                ]}
                value={additionalNotes}
                rows={10}
                cols={50}
                name="abstract"
              ></textarea>
            </div>

            <div
              className={`flex justify-center p-4 mt-2`}
            >
              <AlertDialogComponent
                title={
                  selectedTime === ""? "Please select a preferred time" : isLoading === true ? "Processing..." : httpStatus === 201 ? "Thank you for your reservation!" 
                    : "Ooops! Something went wrong. Please try again later"
                }
                buttonClassname=""
                actionButtonClassName={`${httpStatus === 200 ? "bg-primarycol/90 hover:bg-primarycol/70" : "bg-red-600 hover:bg-red-700"}`}
                buttonSize={"lg"}
                buttonText="Ok"
                actionText="Ok"
                description=""
                buttonVariant={"outline"}
                customButton={
                  <AdminButton
                    type="submit"
                    text="Submit"
                    className="bg-primarycol px-8 transform hover:scale-90"
                    onClick={() => {
                      console.log("form state errors ", errors)
                    }}
                  />
                }
              />
              {/* <AdminButton
                type="submit"
                text="Submit"
                className="bg-primarycol px-8 transform hover:scale-90"
                // onClick={() => {
                //   setLoginError(0);
                // }}
              /> */}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default PersonalDetailsForm;
