import { ChevronRight } from "lucide-react";
import React from "react";

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
    "ALL Cleaning Services"
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
              <div key={usefulLink + index} className="text-white/75 flex border-b-[1px] border-secondarycol py-2 transition-all duration-300 hover:cursor-pointer  hover:text-secondarycol">
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
              <div key={serviceLink + index}  className="text-white/75 flex border-b-[1px] border-secondarycol py-2 transition-all duration-300 hover:cursor-pointer hover:text-secondarycol">
                <span className="mr-0.9">
                  <ChevronRight />
                </span>
                <span>{serviceLink}</span>
              </div>
            );
          })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
