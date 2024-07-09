import { companyPhoneNumber } from "@/helpers/siteInfo";
import Image from "next/image";

const TheCompanyYouCanTrust = () => {
  return (
    <div className="bg-homegray py-4 px-6 pb-8">
      <div className="w-full items-center flex flex-col my-3">
        <header className="font-bold text-black/90 mb-3">
          THE COMPANY YOU CAN TRUST
        </header>
        <div className="text-[14px] text-black/80 text-center">
          At McLev Cleaning&#44; our dedicated team of professional cleaners is
          committed to delivering exceptional service&#46; <br /> With years of
          expertise in the industry&#44; our cleaners uphold high standards of
          professionalism and integrity&#46; Experience the difference with
          McLev Cleaning&#46; Contact us on{" "}
          <span className="text-secondarycol">{companyPhoneNumber}</span> today
          to schedule your cleaning service and discover a cleaner&#44;
          healthier space&#46;
        </div>
      </div>
      <div className="flex justify-center mt-8 overflow-clip max-h-[350px]">
        <Image
          width={400}
          height={300}
          src="/assets/img/new10.jpeg"
          className="w-full md:max-w-[400px] object-cover"
          quality={100}
          alt="workers"
        />
      </div>
    </div>
  );
};

export default TheCompanyYouCanTrust;
