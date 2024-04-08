"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { AlignJustify, AlignRight, X } from "lucide-react";
import MaxwidthWrapper from "../Max_Min_widthWrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getServerSession } from "@/app/getServerSession";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import HomeheroButton from "../ui/HomeheroButton";
import { trpc } from "@/trpc-client/client";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const navbarItems = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "Services",
      link: "services",
    },
    {
      text: "About Us",
      link: "about-us",
    },
    {
      text: "Contact Us",
      link: "contact-us",
    },
    {
      text: "Prices",
      link: "prices",
    },
    {
      text: "Book Now",
      link: "book-a-cleaner",
    },
  ];

  const [openNavbar, setOpenNavbar] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);
 
  const currentPath = usePathname();
  const { isLoading, data, error } = trpc.getUserSession.useQuery();


  useEffect(()=>{
    if(typeof data === 'object' && data !== null && 'kindeDetails' in data){
       setIsUser(true);
    }
  }, [isLoading])

  const uiTools = (): React.ReactNode => {
    if (currentPath && currentPath !== "/admin-dashboard") {
      return (
        <nav className="sticky h-14 top-0 z-50 bg-white/90 inset-x-0 backdrop-blur-lg transition-all w-full border-b-[0.1px] border-slate-200">
          <MaxwidthWrapper>
            <div className="flex justify-between items-center ">
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
              {/* menu icon */}
              <div
                className="flex items-center justify-center mx-4 hover:cursor-pointer"
                onClick={() => {
                  setOpenNavbar((v) => !v);
                }}
              >
                {openNavbar ? <X /> : <AlignJustify />}
              </div>
            </div>

            {/* Mobile device Menu Items */}
            {/* Use framer motion to control navbar animation */}
            {openNavbar && (
              <div className="bg-white/70  transition-all duration-[2000] z-100">
                {navbarItems.map((item, index) => {
                  return (
                    <div
                      key={item.text + index}
                      className="hover:bg-secondarycol hover:text-white text-center py-2 border-b-[1px] backdrop-blur-lg transition-all duration-300"
                    >
                      <Link href={`/${item.link}`}>{item.text}</Link>
                    </div>
                  );
                })}
                {isUser ? (
                  <LogoutLink>
                    <div
                      key={Date.now()}
                      className="hover:bg-secondarycol hover:text-white text-center py-2 border-b-[1px] backdrop-blur-lg transition-all duration-300"
                    >
                      Logout
                    </div>
                  </LogoutLink>
                ) : (
                  <div
                    key={Date.now()}
                    className="hover:bg-secondarycol hover:text-white text-center py-2 border-b-[1px] backdrop-blur-lg transition-all duration-300"
                  >
                    <Link href={"/sign-in"} >Sign In</Link>
                  </div>
                )}
              </div>
            )}
          </MaxwidthWrapper>
        </nav>
      );
    }

    return <div className="hidden"></div>;
  };

  return <>{uiTools()}</>;
};

export default Navbar;
