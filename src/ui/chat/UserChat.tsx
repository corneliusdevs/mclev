"use client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import UserChatDialog from "./UserChatDialog";

const UserChat = () => {
  return (
    <section className="fixed top-20 w-full h-[80vh] flex flex-col items-center z-50">
      <div className="flex flex-col items-center w-[80%] rounded-lg h-[70vh] bg-white z-70 shadow-2xl overflow-x-clip">
        <div className="bg-accentcol w-full h-[50px] flex items-center justify-center">
          <div className="flex items-center w-[90%] justify-around">
            <div className="text-white/90 hover:cursor-pointer hover:scale-[1.3]">
              <ChevronLeft />
            </div>
            <div className="">
              <Image
                src={"/assets/mclev_logo.jpg"}
                alt={"mclev logo"}
                height={40}
                width={40}
                className="h-[30px] w-[30px] rounded-full border-2 border-gray-300"
              />
            </div>
            <div className="ml-2 text-white/90 tracking-tight">
              <span>McLev Cleaning Company</span>
            </div>
          </div>
        </div>
        <div className="bg-white h-[60vh] w-[98%]">
          <UserChatDialog />
        </div>
      </div>
    </section>
  );
};

export default UserChat;
