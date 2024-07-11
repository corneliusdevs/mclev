"use client";

import React, { FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AlignJustify, Home, X } from "lucide-react";
import MaxwidthWrapper from "@/components/Max_Min_widthWrapper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { trpc } from "@/trpc-client/client";

interface DesktopNavbarProps {}

const DesktopNavbar: FC<DesktopNavbarProps> = () => {
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
      text: "About",
      link: "about-us",
    },
    {
      text: "Contact",
      link: "contact-us",
    },
    {
      text: "Pricing",
      link: "pricing",
    },
    {
      text: "Book",
      link: "book-now",
    },
  ];

  const [openNavbar, setOpenNavbar] = useState<boolean>(false);
  const [isUser, setIsUser] = useState<boolean>(false);
  const [scrollYPosition, setScrollYposition] = useState<number>(0);

  const scrollYPositionRef = useRef<number>(0);

  const currentPath = usePathname();
  const { isLoading, data, error } = trpc.auth.getUserSession.useQuery();

  useEffect(() => {
    if (typeof data === "object" && data !== null && "kindeDetails" in data) {
      setIsUser(true);
    }
  }, [isLoading, data]);

  useEffect(() => {
    const handleScrollY = () => {
      console.log("scroll position ", window.scrollY);
      setScrollYposition(window.scrollY);
      scrollYPositionRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, [scrollYPositionRef.current]);

  const shouldBgBeWhite = (currentPath: string) => {
    // determines if the desktop nav bar should have a transparent or white background based on the current url
    if (
      currentPath?.toLowerCase().indexOf("contact") !== -1 ||
      currentPath?.toLowerCase().indexOf("book") !== -1 ||
      currentPath?.toLowerCase().indexOf("admin") !== -1 ||
      currentPath?.toLowerCase().indexOf("sign") !== -1 ||
      currentPath?.toLowerCase().indexOf("log") !== -1 ||
      currentPath?.toLowerCase().indexOf("auth") !== -1 ||
      currentPath?.toLowerCase().indexOf("policy") !== -1 ||
      currentPath?.toLowerCase().indexOf("conditions") !== -1
    ) {
      return true;
    }
    return false;
  };

  // change the background color when the scroll position gets updated
  const uiTools = (): React.ReactNode => {
    if (currentPath && currentPath !== "/admin-dashboard") {
      return (
        <nav
          className={`hidden md:flex items-center fixed ${
            scrollYPositionRef.current > 240 || shouldBgBeWhite(currentPath)
              ? "bg-white/90"
              : "bg-transparent"
          } h-14 top-0 z-[100] inset-x-0 backdrop-blur-sm transition-all w-full border-b-[0.1px] border-slate-20`}
        >
          <MaxwidthWrapper className="bg-transparent">
            <div className="flex justify-between items-center bg-transparent">
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

              <div
                className="flex items-center justify-center mx-4 hover:cursor-pointer w-full bg-transparent"
                onClick={() => {}}
              >
                <div className="flex transition-all items-center duration-[2000ms] z-100 animate-accordion-down ease-in-out text-white bg-transparent w-full max-w-[1000px] justify-around">
                  {navbarItems.map((item, index) => {
                    return (
                      <Link
                        key={item.link + item.text + index}
                        href={`/${item.link}`}
                        onClick={() => {
                          setOpenNavbar((v) => !v);
                        }}
                        className={`mr-2 ${
                          scrollYPositionRef.current > 240 ||
                          shouldBgBeWhite(currentPath)
                            ? "bg-none"
                            : "bg-transparent"
                        }`}
                      >
                        <div
                          key={"div" + item.text + index}
                          className={`${
                            scrollYPositionRef.current > 240 ||
                            shouldBgBeWhite(currentPath)
                              ? "bg-none text-black/80 hover:text-secondarycol"
                              : "bg-transparent hover:bg-secondarycol hover:text-white"
                          } text-center py-2 transition-all duration-300 px-2`}
                        >
                          {/* change the home icon toa better one */}
                          {/* {item.text === "Home" ? <Home /> : item.text} */}
                          {item.text}
                        </div>
                      </Link>
                    );
                  })}
                  {isUser ? (
                    <LogoutLink
                      key={Date.now() + "link 1"}
                      className={`mr-2 ${
                        scrollYPositionRef.current > 240 ||
                        shouldBgBeWhite(currentPath)
                          ? "bg-none"
                          : "bg-transparent"
                      }`}
                    >
                      <div
                        className={`${
                          scrollYPositionRef.current > 240 ||
                          shouldBgBeWhite(currentPath)
                            ? "bg-none text-black/80 hover:text-secondarycol"
                            : "bg-transparent hover:bg-secondarycol hover:text-white"
                        } text-center py-2 transition-all duration-300 px-2`}
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
                      className={`mr-2 ${
                        scrollYPositionRef.current > 240 ||
                        shouldBgBeWhite(currentPath)
                          ? "bg-none"
                          : "bg-transparent"
                      }`}
                      key={Date.now() + "link 2"}
                      onClick={() => {
                        setOpenNavbar((v) => !v);
                      }}
                    >
                      <div
                        className={`${
                          scrollYPositionRef.current > 240 ||
                          shouldBgBeWhite(currentPath)
                            ? "bg-none text-black/80 hover:text-secondarycol"
                            : "bg-transparent hover:bg-secondarycol hover:text-white"
                        } text-center py-2 transition-all duration-300 px-2`}
                      >
                        {`Sign In`}
                      </div>
                    </Link>
                  )}
                  <Link
                    href={"/admin-dashboard"}
                    key={Date.now()}
                    onClick={() => {
                      setOpenNavbar((v) => !v);
                    }}
                    className={`mr-2 ${
                      scrollYPositionRef.current > 240 ||
                      shouldBgBeWhite(currentPath)
                        ? "bg-none"
                        : "bg-transparent"
                    }`}
                  >
                    <div
                      className={`${
                        scrollYPositionRef.current > 240 ||
                        shouldBgBeWhite(currentPath)
                          ? "bg-none text-black/80 hover:text-secondarycol"
                          : "bg-transparent hover:bg-secondarycol hover:text-white"
                      } text-center py-2 transition-all duration-300 px-2`}
                    >
                      Dashboard
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </MaxwidthWrapper>
        </nav>
      );
    }

    return <div className="hidden"></div>;
  };

  return <>{uiTools()}</>;
};

export default DesktopNavbar;
