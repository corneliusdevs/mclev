import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChevronRight, Facebook, Mail, Youtube } from "lucide-react";
import React from "react";
import { faPinterestP, faXTwitter } from "@fortawesome/free-brands-svg-icons";

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
        <div>
          <div>
            <h5 className="text-secondarycol pt-8 pb-4">
              McLev Cleaning Company
            </h5>
          </div>
          <div>
            <div className="text-textwhitecol">
              Address <br />
              Lorem Ipsum, Dolor sit amet.
            </div>
            <div className="text-textwhitecol">
              <span className="text-secondarycol">Phone: 000 0000 0000 </span>
              {/* this is the email address */}
              office@mclevcleaning.ng.com
            </div>

            {/* social media links and icons */}
            <div className="flex font-bolder mt-8 text-secondarycol mb-4">
              <div className="bg-white mr-2 p-[2px] rounded-sm flex justify-center items-center w-6 h-6 hover:cursor-pointer transition-all duration-200 hover:text-textwhitecol hover:bg-secondarycol" title="Facebook">
                <Facebook className="w-6 h-6" />
              </div>
              <div className="bg-white mr-2 p-[2px] rounded-sm flex justify-center items-center w-6 h-6 hover:cursor-pointer hover:text-textwhitecol hover:bg-secondarycol" title="Twitter">
                <FontAwesomeIcon icon={faXTwitter} className="w-6 h-6" />
              </div>
              <div className="bg-white mr-2 p-[2px] rounded-sm flex justify-center items-center w-6 h-6 hover:cursor-pointer hover:text-textwhitecol hover:bg-secondarycol" title="Youtube">
                <Youtube className="w-4 h-4" />
              </div>
              <div className="bg-white mr-2 p-[2px] rounded-sm w-6 h-6 flex justify-center items-center hover:cursor-pointer hover:text-textwhitecol hover:bg-secondarycol" title="Pinterest">
                <FontAwesomeIcon icon={faPinterestP} className="w-6 h-6" />
              </div>
              <div className="bg-white mr-2 p-[2px] rounded-sm flex justify-center items-center w-6 h-6 hover:cursor-pointer hover:text-textwhitecol hover:bg-secondarycol" title="Mail">
                <Mail className="w-6 h-6" />
              </div>
            </div>
            <br />
            <br />
            <br />
            <br />
          </div>


        </div>
      </div>
    </footer>
  );
};

export default Footer;
