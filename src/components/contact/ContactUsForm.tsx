"use client";

import { trpc } from "@/trpc-client/client";
import AdminButton from "@/ui/admin-dashboard/AdminButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import AlertDialogComponent from "@/components/AlertDialogComponent";
import { ContactUsFormSchemaType, contactUsFormSchema } from "@/helpers/contactUsFormSchema";
import { validatePhoneNumber } from "@/helpers/utilities";

interface ContactUsFormProps {

}

const ContactUsForm: FC<ContactUsFormProps> = ({

}): React.ReactNode => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactUsFormSchemaType>({
    resolver: zodResolver(contactUsFormSchema),
  });

  const { mutate, isLoading } = trpc.contact.create.useMutation({
    networkMode: "always",
  });

  const router = useRouter();
  const [httpStatus, setHttpStatus] = useState<number>();


  const [contactMessage, setContactMessage] = useState<string>("");
  const [phoneNumber, setPhoneNumber ] = useState<string>("");


  const onSubmit = async (info: ContactUsFormSchemaType) => {
    if(!(phoneNumber !== "" && !validatePhoneNumber(phoneNumber)) && contactMessage !== ""){
      
      // send the request to the api
        mutate(
          {
            ...info,
            message: contactMessage ? contactMessage : ""
          },
          {
            onSuccess: (data) => {
              console.log("submit contact form success ", data);
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
        <div className="flex flex-col w-full bg-white p-4 py-6">
          {/* CONTACT DETAILS FORM */}
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
              <input className="p-2" type="text" {...register("name")} />
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
              <input className="p-2" type="text" {...register("email")} />
            </div>

            <p>
              {" "}
              <span>Phone</span>
            </p>
            <div className="flex items-start mb-4">
              <input
                className="p-2 border-[1.5px] border-primarycol/10 w-full"
                onChange={(e) => {setPhoneNumber(e.target.value)}}
                value={phoneNumber}
                type={"number"}
                // example uk number
                placeholder="e.g 020 3092 4468"
              />
            </div>

            {errors.subject && (
              <p className="text-red-500 text-sm">{errors.subject.message}</p>
            )}
            <p>
              {" "}
              <span>
                Subject <span className="text-red-500">&#42;</span>
              </span>
            </p>
            <div className="flex flex-col mb-4 w-full border-[1px] border-primarycol/10">
              <input className="p-2" type="text" {...register("subject")} />
            </div>

            {errors.yourMessage && (
              <p className="text-red-500 text-sm">
                {errors.yourMessage.message}
              </p>
            )}
            <p>
              {" "}
              <span>Your Message</span>
            </p>
            <div className="flex items-start">
              <textarea
                className="p-2 border-[1.5px] border-primarycol/10"
                {...register("yourMessage")}
                onChange={(e) => {setContactMessage(e.target.value)}}
                value={contactMessage}
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
                    : (phoneNumber !== "" && !validatePhoneNumber(phoneNumber)) 
                    ? "Invalid Phone Number"
                    : contactMessage === "" 
                    ? "Message cannot be empty"
                    : httpStatus === 201
                    ? "Thanks for reaching out."
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
                    className="bg-secondarycol px-8 transform hover:scale-90"
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

export default ContactUsForm;
