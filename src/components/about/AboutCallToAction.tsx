import { companyPhoneNumber } from "@/helpers/siteInfo";
import HomeheroButton from "../ui/HomeheroButton";

const AboutCallToAction = () => {
  return (
    <div>
      <div className="">
        <article className="py-4 px-6">
          <div className="text-footergray text-xl text-center">
            How to Get in Touch
          </div>
          <p className="mt-3 text-black/85 text-sm leading-6 text-center">
            Book a service with <b>McLev Cleaning Company</b> on{" "}
            <span className="text-secondarycol">{companyPhoneNumber}</span>. You can
            call us <b>24/7</b> now. We will be more than happy to provide you
            with all the information you need about our services. Don’t hesitate
            to take advantage competitive rates! We cover all major London areas
            and no job is too big or too small for us.
          </p>
        </article>

        {/* book now and request a quote buttons */}
        <div className="flex flex-col items-center justify-center py-6">
          <HomeheroButton
            key={Date.now.toString() + 13}
            text={"BOOK NOW"}
            variant={"outline"}
            className="mt-4 bg-accentcol text-white rounded-none hover:bg-transparent hover:border-black/75 hover:text-black/75
              transition-all"
            size={"default"}
          />
          <HomeheroButton
            key={Date.now.toString() + 14}
            text={"REQUEST A QUOTE"}
            variant={"outline"}
            className="mt-4 bg-transparent text-accentcol rounded-none hover:bg-transparent border-accentcol hover:border-2 hover:tracking-wider hover:text-accentcol transition-all"
            size={"default"}
          />
        </div>
      </div>
    </div>
  );
};

export default AboutCallToAction
