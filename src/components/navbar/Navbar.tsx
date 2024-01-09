"use client"

import React,{ FC, useState } from "react";
import Image from "next/image";
import { AlignJustify } from "lucide-react";
import MaxwidthWrapper from "../MaxwidthWrapper";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = () => {
  const navbarItems = [
    "Home",
    "Services",
    "Prices",
    "About Us",
    "Contact Us",
    "Book Now",
  ];

  const [openNavbar, setOpenNavbar] = useState<boolean>(false)

  return (
    <nav className="sticky h-14 top-0 z-40 bg-white/90 inset-x-0 backdrop-blur-lg transition-all w-full">
      <MaxwidthWrapper>
        <div className="flex justify-between items-center">
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
          <div className="flex items-center justify-center mx-4 hover:cursor-pointer"
            onClick={()=>{
              setOpenNavbar(v =>!v)
            }}
          >
            <AlignJustify />
          </div>
        </div>

        {/* Mobile device Menu Items */}
        {/* Use framer motion to control navbar animation */}
        { openNavbar && (<div className="bg-white/70  transition-all duration-[2000]">
          {navbarItems.map((item, index) => {
            return <div key={item + index} className="hover:bg-secondarycol hover:text-white text-center py-2 border-b-[1px] backdrop-blur-lg transition-all duration-300">{item}</div>;
          })}
        </div>)}
      </MaxwidthWrapper>
    </nav>
  );
};

export default Navbar;
