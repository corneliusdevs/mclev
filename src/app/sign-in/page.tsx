"use client";

import Input from "@/components/Input";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc-client/client";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [isAuthorised, setIsAuthorized] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const router = useRouter();
  const [httpStatus, setHttpStatus] = useState<number>();

  const { mutate, isLoading } = trpc.auth.validateAdminSignInPass.useMutation({
    networkMode: "always",
  });

  const submit = async () => {
    // send the request to the auth.validateAdminSignInPass route
    mutate(
      {
        password,
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

  useEffect(() => {
    // if password validation is successfull, then setIsAuthorized to true and allow the user to sign in or create an account
    if (httpStatus === 200) {
      setIsAuthorized(true);
    }
  }, [httpStatus, router]);

  return (
    <div>
      <div className="h-[60vh]  w-full flex flex-col items-center justify-center">
        {isAuthorised ? (
          // UI TO EITHER CREATE AN ACCOUNT OR TO SIGN IN
          <div>
            <div className="flex justify-center">
              <Link href={"/admin-dashboard/create-account"}>
                <div className={"underline pb-2"}>Create An Account</div>
              </Link>
            </div>
            <div className="flex justify-center">
              <LoginLink>
                <div className={"underline pb-2"}>Sign In</div>
              </LoginLink>
            </div>
          </div>
        ) : (
          // UI TO ENSURE THAT ONLY AUTHORISED USERS CAN CREATE AN ACCOUNT OR SIGN IN
          <div className="flex flex-col justify-center px-4 py-5 border-[1px] border-gray-300 rounded-sm min-w-[200px] max-w-[210px] smd:w-[370px] smd:max-w-[270px] h-[210px] md:mt-[50px]">
            <div className="text-center mb-4">Password</div>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="animate-spin" />
              </div>
            ) : (
              <div>
                {httpStatus !== 200 && httpStatus && (
                  <div className="text-red-500 text-center text-sm">
                    Invalid Password
                  </div>
                )}
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="focus:border-black/80 pr-10"
                  />
                  <div
                    className="cursor-pointer absolute right-2 bg-white top-[6px]"
                    onClick={() => {
                      setShowPassword((val) => !val);
                    }}
                  >
                    {!showPassword ? <Eye /> : <EyeOff />}
                  </div>
                </div>
                <div className="flex justify-center mt-4">
                  {password.length < 5 ? (
                    <Button
                      variant={"secondary"}
                      className="hover:bg-secondarycol hover:text-white"
                      onClick={() => {
                        // submit user details for validation
                        submit();
                      }}
                      disabled
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      variant={"secondary"}
                      className="hover:bg-secondarycol hover:text-white"
                      onClick={() => {
                        // submit user details for validation
                        submit();
                      }}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
