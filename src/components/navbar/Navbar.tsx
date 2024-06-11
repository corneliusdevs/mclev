"use client";

import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { AlignJustify, X } from "lucide-react";
import MaxwidthWrapper from "@/components/Max_Min_widthWrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
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
      text: "Pricing",
      link: "pricing",
    },
    {
      text: "Book Now",
      link: "book-a-cleaner",
    },
  ];

  const [openNavbar, setOpenNavbar] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);

  const currentPath = usePathname();
  const { isLoading, data, error } = trpc.auth.getUserSession.useQuery();

  useEffect(() => {
    if (typeof data === "object" && data !== null && "kindeDetails" in data) {
      setIsUser(true);
    }
  }, [isLoading, data]);

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
              <div className="bg-white/85  transition-all duration-[2000ms] z-100 animate-accordion-down ease-in-out">
                {navbarItems.map((item, index) => {
                  return (
                    <Link
                      key={item.link + item.text + index}
                      href={`/${item.link}`}
                      onClick={() => {
                        setOpenNavbar((v) => !v);
                      }}
                      className=""
                    >
                      <div 
                       key={"div" + item.text + index}
                      className="hover:bg-secondarycol hover:text-white text-center py-2 border-b-[1px] backdrop-blur-lg transition-all duration-300">
                        {item.text}
                      </div>
                    </Link>
                  );
                })}
                {isUser ? (
                  <LogoutLink key={Date.now() + "link 1"}>
                    <div
                      className="hover:bg-secondarycol hover:text-white text-center py-2 border-b-[1px] backdrop-blur-lg transition-all duration-300"
                      onClick={() => {
                        setOpenNavbar((v) => !v);
                      }}
                    >
                      Logout
                    </div>
                  </LogoutLink>
                ) : (
                  <Link
                    href={"/sign-in"}
                    key={Date.now() + "link 2"}
                    onClick={() => {
                      setOpenNavbar((v) => !v);
                    }}
                  >
                    <div className="hover:bg-secondarycol hover:text-white text-center py-2 border-b-[1px] backdrop-blur-lg transition-all duration-300">
                      Sign In
                    </div>
                  </Link>
                )}
                <Link
                  href={"/admin-dashboard"}
                  key={Date.now()}
                  onClick={() => {
                    setOpenNavbar((v) => !v);
                  }}
                >
                  <div className="hover:bg-secondarycol hover:text-white text-center py-2 border-b-[1px] backdrop-blur-lg transition-all duration-300">
                    Dashboard
                  </div>
                </Link>
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
