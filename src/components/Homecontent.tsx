import { phoneNumber } from "@/helpers/siteInfo";
import HomeImageGallery from "./HomeImageGalery";

const Homecontent = () => {
  return (
    <section>
      <article className="text-center py-6 px-3">
        <div className="flex items-center justify-center text-slate-600 text-2xl smd:text-2xl">
          <div className="inline-block smd:w-[3%] mr-3 h-[1px] bg-accentcol lgmd:w-[8%] lgmd:mr-4"></div>
          McLev Cleaning Company
          <div className="inline-block smd:w-[3%] ml-3 h-[1px] bg-accentcol lgmd:w-[8%] lgmd:mr-4"></div>
        </div>
        <span className="text-slate-500 block pt-4">
          McLev is a leading cleaning company dedicated to providing first-class
          cleaning services personalised to meet the exceptional needs of our
          clients in London and South East London.
          <br />
          We know you are busy, We are here to take care of your home,
          restaurant, office, event center and community.
          <br />
          Our dedicated team of cleaning professionals is passionate about
          delivering outstanding and high-quality cleaning solutions tailored to
          your unique needs. Don’t hesitate to call us today on <br />
          <span className="text-secondarycol">{phoneNumber}</span>
        </span>
      </article>
      <HomeImageGallery />
    </section>
  );
};

export default Homecontent;
