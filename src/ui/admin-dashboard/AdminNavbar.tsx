import { CalendarDays, Mail } from "lucide-react"
import ButtonWithIcons from "./ButtonWithIcon"
import Image from "next/image"
import Sidebar from "./Sidebar"
import { Dispatch, FC, SetStateAction } from "react"

interface AdminNavbarProps {
   handleDashboardState: Dispatch<SetStateAction<"chats" | "dashboard" | "bookings" | "chatDialog">>,
   dashBoardState: "chats" | "dashboard" | "bookings" | "chatDialog",
}

const AdminNavbar:FC<AdminNavbarProps> = (props)=>{
    return(
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
              <div className="h-[90px] flex flex-col justify-around ">
                <ButtonWithIcons
                  icon={<Mail size={20} />}
                  text={"Chats"}
                  extraInfo="12"
                  className={`w-full ${props.dashBoardState === "chats" && "bg-accentcol hover:bg-accentcol"}`}
                  variant={`${props.dashBoardState === "chats" ? "default": "outline"}`}

                  clickHandler={()=>{
                    props.handleDashboardState("chats")
                    console.log("chats  clicked")
                  }}
                />
                <ButtonWithIcons
                  icon={<CalendarDays size={20} />}
                  text={"Bookings"}
                  extraInfo="12"
                  className={`w-full ${props.dashBoardState === "bookings" && "bg-accentcol hover:bg-accentcol"}`}
                  variant={`${props.dashBoardState === "bookings" ? "default": "outline"}`}

                  clickHandler={()=>{
                    console.log("bbokings  clicked");
                    props.handleDashboardState("bookings")
                  }}
                />
              </div>
            }
          />
        </div>
      </div>
    )
}

export default AdminNavbar