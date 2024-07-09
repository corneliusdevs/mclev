import { companyPhoneNumber } from "@/helpers/siteInfo";
import HomeheroButton from "../ui/HomeheroButton";
import Link from "next/link";

const AboutCallToAction = () => {
  return (
    <div>
      <div className="bg-homegray">
        <article className="py-4 px-6">
        <div className="text-slate-600 text-2xl text-center">
              How to Get in Touch
            </div>
            <p className="mt-3 text-black/85 leading-6 text-center">
              Experience the difference with McLev Cleaning&#46; Contact us on{" "}
              <span className="text-secondarycol">{companyPhoneNumber}</span> today to schedule your cleaning service and discover a cleaner&#44; healthier space&#46;
            </p>
        </article>

        {/* book now and request a quote buttons */}
        <div className="flex flex-col items-center justify-center py-6">
          <Link href={"/book-now"}>
          <HomeheroButton
            key={Date.now.toString() + 13}
            text={"BOOK NOW"}
            variant={"outline"}
            className="mt-4 bg-accentcol text-white rounded-none hover:bg-transparent hover:border-black/75 hover:text-black/75
            transition-all"
            size={"default"}
            />
            </Link>
          {/* <HomeheroButton
            key={Date.now.toString() + 14}
            text={"REQUEST A QUOTE"}
            variant={"outline"}
            className="mt-4 bg-transparent text-accentcol rounded-none hover:bg-transparent border-accentcol hover:border-2 hover:tracking-wider hover:text-accentcol transition-all"
            size={"default"}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default AboutCallToAction
