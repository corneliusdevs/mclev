import Image from "next/image";
import Link from "next/link";
import HomeheroButton from "../ui/HomeheroButton";

const ServicesBanner = () => {
  return (
    <div className="relative mb-8">
      <div>
        <Image
          src="/assets/img/new5.jpg"
          width={500}
          height={500}
          quality={100}
          alt="about us banner"
          className="w-full h-[60vh] object-fill"
        />
      </div>
      <div className="absolute top-0 bg-black/50 text-white w-full h-full text-3xl flex flex-col justify-center items-center">
        <span>Our Services</span>
        <div className="md:mt-4 relative w-fit">
          <Link href={"/book-now"} className="w-fit">
            <HomeheroButton
              variant={"outline"}
              className="mt-6 bg-white text-black rounded-xl font-bold hover:text-white hover:bg-transparent hover:border-white outline-white outline outline-offset-2 outline-1"
              size={"default"}
              text="BOOK NOW"
            />
          </Link>
          {/* <div className="absolute top-0 left-0 w-fit">
            <HomeheroButton
              variant={"outline"}
              className="mt-6 bg-white text-black rounded-xl font-bold hover:text-white hover:bg-transparent hover:border-white outline-white outline outline-offset-2 outline-1 animate-ping duration-[3000ms] delay-1000 px-10 ml-4 py-1"
              size={"default"}
              text=""
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ServicesBanner;
