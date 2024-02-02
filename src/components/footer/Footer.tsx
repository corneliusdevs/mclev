import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronRight, Facebook, Mail, Youtube } from "lucide-react";
import React from "react";
import { faPinterestP, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { phoneNumber, webEmail } from "@/helpers/siteInfo";
import TooltipComponent from "../Tooltip";

const usefulLinks = [
  "Home",
  "Contact Us",
  "About Us",
  "Prices",
  "EOT Cleaning Checklist",
  "Testimonials",
  "Book a Cleaner",
  "Work with us",
];

const ourServicesLinks = [
  "Antiviral Sanitisation ",
  "End Of Tenancy Cleaning",
  "One Off Deep Cleaning",
  "Carpet Cleaning",
  "Rug Cleaning",
  "Upholstery Cleaning",
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
      <div className="bg-footergray pl-10">
        {/* Useful links section */}
        <div className="text-secondarycol pt-8 pb-4">
          <span>Useful Links</span>
        </div>

        {/* Useful links */}
        <div>
          {usefulLinks.map((usefulLink, index) => {
            return (
              <div
                key={usefulLink + index}
                className="text-white/75 flex border-b-[1px] border-secondarycol py-2 transition-all duration-300 hover:cursor-pointer  hover:text-secondarycol"
              >
                <span className="mr-0.9">
                  <ChevronRight />
                </span>
                <span>{usefulLink}</span>
              </div>
            );
          })}
        </div>

        {/* Our services section */}
        <div className="text-secondarycol pt-8 pb-4">
          <span>Our Services</span>
        </div>

        {/* Our Services Links */}
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
        </div>

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
              Lorem Ipsum, Dolor sit amet.
            </div>
            <div className="text-textwhitecol">
              <span className="text-secondarycol">Phone: {phoneNumber} </span>
              {/* this is the email address */}
              <span className="block break-words">{webEmail}</span>
            </div>

            {/* social media links and icons */}
            <div className="flex font-bolder mt-8 text-secondarycol mb-4">
              <TooltipComponent
                childComponent={
                  <div className="bg-white mr-2 p-[2px] rounded-md flex justify-center items-center w-8 h-8  hover:cursor-pointer transition-all duration-200 hover:text-textwhitecol hover:bg-secondarycol">
                    <Facebook className="" size={20} />
                  </div>
                }
                info="facebook"
              />

              <TooltipComponent
                childComponent={
                  <div className="bg-white mr-2 p-[2px] rounded-md flex justify-center items-center w-8 h-8 hover:cursor-pointer hover:text-textwhitecol hover:bg-secondarycol transform-[1.2]">
                    <FontAwesomeIcon
                      icon={faXTwitter}
                      className="w-[18px] h-[18px]"
                    />
                  </div>
                }
                info="Twitter"
              />

              <TooltipComponent
                childComponent={
                  <div className="bg-white mr-2 p-[2px] rounded-md flex justify-center items-center w-8 h-8  hover:cursor-pointer hover:text-textwhitecol hover:bg-secondarycol">
                    <Youtube className="" size={20} />
                  </div>
                }
                info="Youtube"
              />

              <TooltipComponent
                info="Pinterest"
                childComponent={
                  <div
                    className="bg-white mr-2 p-[2px] rounded-md w-8 h-8 flex justify-center items-center hover:cursor-pointer hover:text-textwhitecol hover:bg-secondarycol"
                  >
                    <FontAwesomeIcon
                      icon={faPinterestP}
                      className="w-[18px] h-[18px]"
                    />
                  </div>
                }
              />

              <TooltipComponent
                info="email"
                childComponent={
                  <div
                    className="bg-white mr-2 p-[2px] rounded-md flex justify-center items-center w-8 h-8 hover:cursor-pointer hover:text-textwhitecol hover:bg-secondarycol"
                    
                  >
                    <Mail className="" size={20} />
                  </div>
                }
              />
            </div>
          </div>
          {/* customer's first section */}
          <div className="text-secondarycol pt-8 pb-4">
            <span>Customer&apos;s first</span>
          </div>
          <p className="text-white text-smallCustom font-thin pb-8">
            We at McLev Cleaning provide high-quality cleaning services to
            residents and business owners in London. <br />
            Our local cleaners are vetted and insured, trained to deal with any
            task – from carpet or domestic cleaning to end of tenancy cleaning.{" "}
            <br />
            Our simple booking process allows you to get a cleaner fast and
            easy. Emergency booking and same day cleaning now available
          </p>
        </div>
      </div>
      {/* copyright */}
      <div className="bg-white text-black/75 text-center font-smallCustom font-thin py-4 flex justify-center items-center">
      &#169; copyright {new Date().getFullYear()} | mclevcleaning.co.uk | All Rights Reserved |
        Terms & Conditions | Privacy Policy
      </div>
    </footer>
  );
};

export default Footer;
