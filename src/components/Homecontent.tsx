import { phoneNumber } from "@/helpers/siteInfo";
import HomeImageGallery from "./HomeImageGalery";
import HomeheroButton from "./ui/HomeheroButton";
import ImageCard from "./ImageCard";
import CarouselComponent from "./Carousel";
import { happyCustomersImages } from "@/helpers/homeImages";

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

      {/* Gallery section */}
      <HomeImageGallery />
      <div className="flex justify-center pb-4">
        <HomeheroButton
          text={"ALL SERVICES"}
          variant={"outline"}
          className="mt-4 bg-primarycol text-white rounded-none hover:bg-transparent hover:border-primarycol hover:text-primarycol"
          size={"default"}
        />
      </div>

      {/* certifications */}
      <div className="border-[1px] p-3">
        <span className="font-bold ">
          Our professional cleaners are certified and accredited by:
        </span>

        <div className="flex text-center italic">
          Your certifications go here
        </div>
      </div>

      {/* Domestic cleaning service in London */}
      <div className="bg-homegray">
        <article className="py-4 px-6">
          <div className="text-slate-500 text-xl">
            Domestic Cleaning Service in London
          </div>
          <p className="mt-3 text-black/75 text-sm leading-6">
            We take pride in creating spotless environments that improve the
            quality of life of and work of our clients. <br />
            We know you are busy, we are here to take care of your home,
            restaurant office, event centre and community. We offer a wide range
            of cleaning services from domestic to commercial to clients in
            London and South East London.
          </p>
        </article>
        <article className="py-4 px-6">
          <div className="text-slate-500 text-xl">About Our Cleaners</div>
          <p className="mt-3 text-black/75 text-sm leading-6">
            We take pride in creating spotless environments that improve the
            quality of life of and work of our clients. <br />
            We know you are busy, we are here to take care of your home,
            restaurant office, event centre and community. We offer a wide range
            of cleaning services from domestic to commercial to clients in
            London and South East London.
          </p>
        </article>

        {/* employees image */}
        <div className="h-300px p-3 px-6">
          <ImageCard
            src="/assets/home/employee23.jpeg"
            alt="cleaning employees"
            className="h-[200px] xsm:h-[200px] smd:h-[300px] smd:w-[350px] w-[250px]"
            quality={100}
          />
        </div>
      </div>

      {/* happy clients carousel */}
      <div className="pt-4 pb-2">
        <div className="text-slate-500 text-xl text-center">
          Our Happy Clients
        </div>
        <div className="flex justify-center">
          <CarouselComponent images={[...happyCustomersImages, ...happyCustomersImages]} />
        </div>
      </div>
    </section>
  );
};

export default Homecontent;
