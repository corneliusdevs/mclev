"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc-client/client";
import { Pen, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface SaveUserNameProps {
  userId: string;
  nameOfUser: string;
}

// component collects and stores the user's name in the database
const SaveUserName = ({ userId, nameOfUser }: SaveUserNameProps) => {
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  const {
    mutate: saveUserName,
    isLoading: isSavingUser,
    data,
    error,
  } = trpc.adminChats.saveUsername.useMutation({
    networkMode: "always",
  });

  useEffect(() => {
    if (submitted && userName) {
      saveUserName(
        {
          userId: userId,
          username: userName,
        },
        {
          onSuccess: (data) => {
            if (data.success) {
              toast.success("User name saved");
            } else {
              toast.error("User name not saved");
            }
          },
          onError: (error) => {
            toast.error("User name not saved");
          },
        }
      );

      setSubmitted(false);
    }
  }, [submitted]);

  return (
    <div className="sticky z-20 top-0 bg-white shadow">
      <div className="relative flex-col justify-center items-center">
        {!openInput ? (
          <div
            className="text-black flex justify-center text-2xl border-b-[1px] border-greenaccentcol/15 py-2 text-center hover:cursor-pointer w-full items-center"
            onClick={() => {
              setOpenInput(true);
            }}
          >
            <span className="text-[16px]">{nameOfUser}</span>
            <span className="ml-2">
              <Pen size={16} />
            </span>
          </div>
        ) : (
          <div className="relative pt-2 px-4  pb-8 flex flex-col">
            <div className="flex justify-center">
              <span className="text-sm pb-1">Edit User Name</span>
            </div>
            <div
              className="absolute top-1 right-2 text-gray-400 hover:cursor-pointer"
              onClick={() => {
                setOpenInput(false);
              }}
            >
              <X />
            </div>
            <div className="">
              <Input
                value={userName}
                onChange={(e) => {
                  e.preventDefault();
                  setUserName(e.target.value);
                }}
              />
            </div>
            {/* <div className="flex justify-end"> */}
            <div
              className={`${
                (userName.length < 3 || isSavingUser) && "pointer-events-none"
              } pr-2 absolute right-2 top-8`}
            >
              <Button
                variant={"outline"}
                className="hover:bg-accentcol hover:text-white"
                onClick={() => {
                  setOpenInput(false);
                  setSubmitted(true);
                }}
              >
                submit
              </Button>
            </div>
            {/* <div className={``}>
                <Button
                  variant={"destructive"}
                  onClick={() => {
                    setOpenInput(false);
                  }}
                >
                  Cancel
                </Button>
              </div> */}
          </div>
          //   </div>
        )}
      </div>
    </div>
  );
};

export default SaveUserName;
