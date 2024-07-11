"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ArrowRightIcon,
  ChevronRight,
  Facebook,
  Mail,
  Youtube,
} from "lucide-react";
import React from "react";
import { faPinterestP, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  companyPhoneNumber,
  companyEmail,
  companyAddress,
  facebookPageUrl,
} from "@/helpers/siteInfo";
import TooltipComponent from "@/components/Tooltip";
import Link from "next/link";

const usefulLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Book Now",
    link: "/book-now",
  },
  {
    name: "Contact Us",
    link: "/contact-us",
  },
  {
    name: "About Us",
    link: "/about-us",
  },
  {
    name: "Prices",
    link: "/pricing",
  },
];

const ourServicesLinks = [
  "Antiviral Sanitisation ",
  "End Of Tenancy Cleaning",
  "One Off Deep Cleaning",
  "Carpet Cleaning",
  "Rug Cleaning",
  "Oven Cleaning",
  "Window Cleaning",
  "After Builders Cleaning",
  "Domestic Cleaning",
  "ALL Cleaning Services",
];

const Footer = () => {
  return (
    <footer>
      {/* top part of footer */}
      <div className="bg-footergray/80 px-6 py-4">
        {/* Useful links section */}
        {/* <div className="text-secondarycol pt-8 pb-4">
          <span>Useful Links</span>
        </div> */}

        {/* Useful links */}
        <div>
          {usefulLinks.map((usefulLink, index) => {
            return (
              <div
                key={usefulLink.link + index}
                className="text-white/70 flex border-b-[1px] border-secondarycol py-2 transition-all duration-300 hover:cursor-pointer  hover:text-secondarycol"
              >
                <span className="mr-2">
                  <ArrowRightIcon />
                </span>
                <Link href={usefulLink.link}>
                  <span>{usefulLink.name}</span>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Our services section */}
        {/* <div className="text-secondarycol pt-8 pb-4">
          <span>Our Services</span>
        </div> */}

        {/* Our Services Links
        <div>
          {ourServicesLinks.map((serviceLink, index) => {
            return (
              <div
                key={serviceLink + index}
                className="text-white/75 flex border-b-[1px] border-secondarycol py-2 transition-all duration-300 hover:cursor-pointer hover:text-secondarycol"
              >
                <span className="mr-0.9">
                  <ChevronRight />
                </span>
                <span>{serviceLink}</span>
              </div>
            );
          })}
        </div> */}

        {/* address */}
        <div className="w-[96%]">
          <div>
            <h5 className="text-secondarycol pt-8 pb-4">
              McLev Cleaning Company
            </h5>
          </div>
          <div className="">
            <div className="text-textwhitecol">
              Address <br />
              {companyAddress}
            </div>
            <div className="text-textwhitecol">
              <span className="text-secondarycol">
                Phone: {companyPhoneNumber}{" "}
              </span>
              {/* this is the email address */}
              <span className="block break-words">{companyEmail}</span>
            </div>

            {/* social media links and icons */}
            <div className="flex font-bolder mt-8 text-secondarycol mb-4">
              <TooltipComponent
                childComponent={
                  <Link href={facebookPageUrl}>
                    <div className="bg-white mr-2 p-[2px] rounded-full shadow-xl flex justify-center items-center w-8 h-8  hover:cursor-pointer transition-all duration-200 hover:text-textwhitecol hover:bg-secondarycol">
                      <Facebook className="" size={20} />
                    </div>
                  </Link>
                }
                info="facebook"
              />

              {/* TWITTER X ICON */}
              <TooltipComponent
                childComponent={
                  <div className="bg-white mr-2 p-[2px] rounded-full shadow-xl flex justify-center items-center w-8 h-8 hover:cursor-pointer hover:text-textwhitecol hover:bg-secondarycol transform-[1.2]">
                    <FontAwesomeIcon
                      icon={faXTwitter}
                      className="w-[18px] h-[18px]"
                    />
                  </div>
                }
                info="twitter"
              />
              {/* <TooltipComponent
                childComponent={
                  <div className="bg-white mr-2 p-[2px] rounded-full shadow-xl flex justify-center items-center w-8 h-8  hover:cursor-pointer hover:text-textwhitecol hover:bg-secondarycol">
                    <Youtube className="" size={20} />
                  </div>
                }
                info="youtube"
              /> */}

              {/* PINTEREST ICON */}
              <TooltipComponent
                info="pinterest"
                childComponent={
                  <div className="bg-white mr-2 p-[2px] rounded-full shadow-xl w-8 h-8 flex justify-center items-center hover:cursor-pointer hover:text-textwhitecol hover:bg-secondarycol">
                    <FontAwesomeIcon
                      icon={faPinterestP}
                      className="w-[18px] h-[18px]"
                    />
                  </div>
                }
              />

              {/* EMAIL ICON */}
              <TooltipComponent
                info="email"
                childComponent={
                  <div
                    className="bg-white mr-2 p-[2px] rounded-full shadow-xl flex justify-center items-center w-8 h-8 hover:cursor-pointer hover:text-textwhitecol hover:bg-secondarycol"
                    onClick={() => {
                      window.location.href = `mailto:${companyEmail}`;
                    }}
                  >
                    <Mail className="" size={20} />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
      {/* copyright */}
      <div className="bg-white text-black/75 text-center font-smallCustom font-thin py-4 flex justify-center items-center">
        &#169; copyright {new Date().getFullYear()} | mclevcleaning.co.uk | All
        Rights Reserved |{" "} 
        <Link href={"/termsandconditions"} className="underline mx-2">
          Terms & Conditions{" "}
        </Link>{" "} 
        |{" "} 
        <Link href={"/privacypolicy"} className="underline mx-2">
          Privacy Policy
        </Link> 
        | {" "} 
        <Link href={"/cookiespolicy"} className="underline mx-2">
          Cookies Policy
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
