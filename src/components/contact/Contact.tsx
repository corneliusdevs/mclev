import { companyAddress, companyPhoneNumber, companyEmail } from "@/helpers/siteInfo";
import { MailIcon, MapPin, Phone } from "lucide-react";

const ContactUs = () => {
  return (
    <div className="px-4 mb-6">
      <div className="w-full mt-8 p-1 mb-4 font-bold text-2xl">
        <header><span className="underline underline-offset-[8px]" style={{textDecorationColor:"green", textDecorationThickness:"4px", lineHeight:"2.5rem"}}>Con</span>tact Info</header>
      </div>
      <div className="flex border-[1px] border-primarycol/10 p-4 mb-6 items-center">
        <div className="mr-4 text-red-500"><MapPin /></div>
        <div>{companyAddress}</div>
      </div>
      <div className="flex border-[1px] border-primarycol/10 p-4 mb-6">
        <div className="mr-4 text-red-500"><Phone /></div>
        <div>{companyPhoneNumber}</div>
      </div>
      <div className="flex border-[1px] border-primarycol/10 p-4 mb-6">
        <div className="mr-4 text-red-500"><MailIcon /></div>
        <div>{companyEmail}</div>
      </div>
    </div>
  );
};

export default ContactUs;
