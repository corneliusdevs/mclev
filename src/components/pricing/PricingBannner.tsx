import Image from "next/image";

const PricingBanner = () => {
  return (
    <div className="relative mb-8">
      <div>
        <Image
          src="/assets/banner/banner15.jpeg"
          width={500}
          height={500}
          quality={100}
          alt="Pricing banner"
          className="w-full [52vh] md:h-[60vh] object-fill"
          // className="w-full h-[50vh] object-fill lg:object-cover lg:-bg-[bottom_100px]"
        />
      </div>
      <div className="absolute top-0 bg-black/60 text-white w-full h-full text-3xl flex justify-center items-center">
        Our Pricing
      </div>
    </div>
  );
};

export default PricingBanner;
