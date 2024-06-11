"use-client";

import { CalendarDays, Contact2, Mail, MailCheck } from "lucide-react";
import ButtonWithIcons from "./ButtonWithIcon";
import Image from "next/image";
import Sidebar from "./Sidebar";
import { Dispatch, FC, SetStateAction } from "react";
import HomeheroButton from "@/components/ui/HomeheroButton";
import Link from "next/link";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { trpc } from "@/trpc-client/client";
import { DashboardStateType } from "@/components/admin-dashboard/types";

interface AdminNavbarProps {
  handleDashboardState: Dispatch<SetStateAction<DashboardStateType>>;
  dashBoardState: DashboardStateType;
  isAdminLoggedIn: boolean;
  chatsNumber: number;
}

const AdminNavbar: FC<AdminNavbarProps> = (props) => {
  const {
    isLoading: isCountingBookings,
    data: bookingsCount,
    error: bookingsCountError,
  } = trpc.bookings.count.useQuery();

  const {
    isLoading: isCountingFeedbacks,
    data: feedbacksCount,
    error: feedbacksCountError,
  } = trpc.feedback.count.useQuery();

  const {
    isLoading: isCountingContacts,
    data: contactsCount,
    error: contactsCountError,
  } = trpc.contact.count.useQuery();

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
            <div className="h-[90px] flex flex-col justify-around pt-[60px]">
              <ButtonWithIcons
                icon={<Mail size={20} />}
                text={"Chats"}
                extraInfo={`${props.chatsNumber}`}
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
                extraInfo={`${
                  bookingsCount?.httpStatus === 200 &&
                  bookingsCount.bookingsCount
                }`}
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
              <ButtonWithIcons
                icon={<MailCheck size={20} />}
                text={"Feedbacks"}
                extraInfo={`${
                  feedbacksCount?.httpStatus === 200 &&
                  feedbacksCount.feedbacksCount
                }`}
                className={`w-full mt-3 ${
                  props.dashBoardState === "feedbacks" &&
                  "bg-accentcol hover:bg-accentcol"
                }`}
                variant={`${
                  props.dashBoardState === "feedbacks" ? "default" : "outline"
                }`}
                clickHandler={() => {
                  console.log("feedbacks  clicked");
                  props.handleDashboardState("feedbacks");
                }}
              />
              <ButtonWithIcons
                icon={<Contact2 size={20} />}
                text={"Contacts"}
                extraInfo={`${
                  contactsCount?.httpStatus === 200 &&
                  contactsCount.contactsCount
                }`}
                className={`w-full mt-3 ${
                  props.dashBoardState === "contacts" &&
                  "bg-accentcol hover:bg-accentcol"
                }`}
                variant={`${
                  props.dashBoardState === "contacts" ? "default" : "outline"
                }`}
                clickHandler={() => {
                  console.log("contacts  clicked");
                  props.handleDashboardState("contacts");
                }}
              />
              <Link href={"/"}>
                <HomeheroButton
                  text={"Home"}
                  className={`w-full mt-3`}
                  variant={"outline"}
                />
              </Link>
              {props.isAdminLoggedIn && (
                <LogoutLink>
                  <HomeheroButton
                    text={"Logout"}
                    className={`w-full mt-3`}
                    variant={"outline"}
                  />
                </LogoutLink>
              )}
            </div>
          }
        />
      </div>
    </div>
  );
};

export default AdminNavbar;
