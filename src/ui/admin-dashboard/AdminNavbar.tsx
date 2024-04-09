"use-client";

import { CalendarDays, Mail } from "lucide-react";
import ButtonWithIcons from "./ButtonWithIcon";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { Dispatch, FC, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import HomeheroButton from "@/components/ui/HomeheroButton";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

interface AdminNavbarProps {
  handleDashboardState: Dispatch<
    SetStateAction<"chats" | "dashboard" | "bookings" | "chatDialog">
  >;
  dashBoardState: "chats" | "dashboard" | "bookings" | "chatDialog";
  isAdminLoggedIn: boolean;
}

const AdminNavbar: FC<AdminNavbarProps> = (props) => {

  return (
    <div className="w-full flex justify-between items-center sticky top-0 z-40 bg-white">
      {/* logo */}
      <div className="">
        <Image
          src="/assets/mclev_logo_transparent.png"
          alt="mclev logo"
          height={100}
          width={100}
          className="object-fill opacity-100 transform scale-[0.85]"
        />
      </div>
      <div className="">
        <Sidebar
          side={"right"}
          childComponent={
            <div className="h-[90px] flex flex-col justify-around pt-4">
              <ButtonWithIcons
                icon={<Mail size={20} />}
                text={"Chats"}
                extraInfo="12"
                className={`w-full ${
                  props.dashBoardState === "chats" &&
                  "bg-accentcol hover:bg-accentcol"
                }`}
                variant={`${
                  props.dashBoardState === "chats" ? "default" : "outline"
                }`}
                clickHandler={() => {
                  props.handleDashboardState("chats");
                  console.log("chats  clicked");
                }}
              />
              <ButtonWithIcons
                icon={<CalendarDays size={20} />}
                text={"Bookings"}
                extraInfo="12"
                className={`w-full mt-3 ${
                  props.dashBoardState === "bookings" &&
                  "bg-accentcol hover:bg-accentcol"
                }`}
                variant={`${
                  props.dashBoardState === "bookings" ? "default" : "outline"
                }`}
                clickHandler={() => {
                  console.log("bbokings  clicked");
                  props.handleDashboardState("bookings");
                }}
              />
              <Link href={"/"}>
              <HomeheroButton
                text={"Home"}
                className={`w-full mt-3`}
                variant={"outline"}
                />
              
              </Link>
              {
                props.isAdminLoggedIn && <LogoutLink>
                  <HomeheroButton
                text={"Logout"}
                className={`w-full mt-3`}
                variant={"outline"}
                />
                </LogoutLink>
              }
            </div>
          }
        />
      </div>
    </div>
  );
};

export default AdminNavbar;
