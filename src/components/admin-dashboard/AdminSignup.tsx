"use client";

import { FC, useEffect, useState } from "react";
import AdminButton from "@/ui/admin-dashboard/AdminButton";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  AdminLoginSchemaType,
  adminLoginSchema,
} from "@/helpers/admin/adminLoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "@/trpc-client/client";
import AlertDialogComponent from "../AlertDialogComponent";
import { useRouter } from "next/navigation";
import {
  AdminSignupSchemaType,
  adminSignupSchema,
} from "@/helpers/admin/adminSignupSchema";

const AdminSignup: FC = (props): React.ReactNode => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminSignupSchemaType>({
    resolver: zodResolver(adminSignupSchema),
  });

  const { mutate, isLoading } = trpc.auth.signUpAdmin.useMutation({
    networkMode: "always",
  });

  const router = useRouter();
  const [httpStatus, setHttpStatus] = useState<number>();
  const [isUsernameAndPassFieldNotEmpty, setIsUsernameAndPassFieldNotEmpty] =
    useState({
      email: false,
      password: false,
    });

  const onSubmit = async (info: { email: string; password: string }) => {
    // send the request to the api
    mutate(
      {
        ...info,
      },
      {
        onSuccess: (data) => {
          setHttpStatus(data.httpStatus);
        },
        onError: (error) => {
          setHttpStatus(error.data?.httpStatus);
          console.log("error signing up ", error);
        },
      }
    );
  };

  useEffect(()=>{

    if(httpStatus === 201){
      router.push("/sign-in");
    }
  }, [httpStatus, router])

  return (
    <main className="bg-white">
      <div className="flex justify-center items-center w-full h-[100vh] bg-primarycol/20">
        <div className="flex flex-col w-fit bg-white p-4 py-6 pb-4 rounded-md shadow-xl max-w-[260px]">
          <div className="flex justify-center mb-4 ">
            <span className="font-semibold">Sign Up</span>
          </div>

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
            <div className="flex flex-col mb-4 w-full border-[1px] border-primarycol/10">
              <input
                className="p-2"
                placeholder="email"
                type="text"
                {...register("email")}
                onChange={(e) => {
                  e.target.value.length > 4
                    ? setIsUsernameAndPassFieldNotEmpty((prev) => {
                        return {
                          ...prev,
                          email: true,
                        };
                      })
                    : setIsUsernameAndPassFieldNotEmpty((prev) => {
                        return {
                          ...prev,
                          email: false,
                        };
                      });
                }}
              />
            </div>

            <div className="flex flex-col justify-center items-start relative w-full border-[1px] border-primarycol/10">
              <input
                className="p-2 pr-[40px] w-full"
                placeholder="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                onChange={(e) => {
                  e.target.value.length > 7
                    ? setIsUsernameAndPassFieldNotEmpty((prev) => {
                        return {
                          ...prev,
                          password: true,
                        };
                      })
                    : setIsUsernameAndPassFieldNotEmpty((prev) => {
                        return {
                          ...prev,
                          password: false,
                        };
                      });
                }}
              />
              <div
                className="cursor-pointer absolute right-2 bg-white"
                onClick={() => {
                  setShowPassword((val) => !val);
                }}
              >
                {!showPassword ? <EyeOff /> : <Eye />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
            <div
              className={`flex justify-center p-4 mt-2 ${
                isUsernameAndPassFieldNotEmpty.email &&
                isUsernameAndPassFieldNotEmpty.password
                  ? ""
                  : "pointer-events-none opacity-35"
              }`}
            >
              <AlertDialogComponent
                title={
                  isLoading === true
                    ? "Signing You Up..."
                    : httpStatus === 201
                    ? "Success!"
                    : httpStatus === 400
                    ? "User Exists!"
                    : httpStatus === 401
                    ? "Invalid Credentials"
                    : "Ooops! Something went wrong. Please try again later"
                }
                buttonClassname=""
                actionButtonClassName={`${
                  httpStatus === 201 && "bg-primarycol hover:bg-primarycol"
                } ${
                  httpStatus === 401 && "bg-red-400 hover:bg-red-500"
                } px-8 transform hover:scale-90`}
                buttonSize={"lg"}
                buttonText="Ok"
                actionText="Ok"
                description=""
                buttonVariant={"outline"}
                isDisabled={isLoading}
                customButton={
                  <AdminButton
                    type="submit"
                    text="Sign Up"
                    className={`bg-primarycol px-8 transform hover:scale-90`}
                    // onClick={() => {
                    //   setLoginError(0);
                    // }}
                  />
                }
              />
            </div>
          </form>
          <div></div>
        </div>
      </div>
    </main>
  );
};

export default AdminSignup;
