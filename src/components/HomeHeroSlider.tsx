import { HomeCarousel } from "./Carousel";
import HomeCarouselBanner from "./HomeCarouselBanner";

const HomeHeroSlider = () => {
  return (
    <div className="bg-homegray flex flex-col items-center">
      <div className="w-full">
        <HomeCarousel
          previousArrowClassName={"p-2 transform scale-[1.3] hidden md:block"}
          nextArrowClassName={"p-2 transform scale-[1.3] hidden md:block"}
          items={[
            <HomeCarouselBanner 
            key={"banner1"}
            src={"/assets/banner/banner12.jpg"}
            captionPreText="We know you are busy"
            captionHeader="Professional Cleaning Services Provider"
            captionText="We take pride in providing excellent cleaning services all time. Your satisfaction is our joy."
            alt="Home banner 1"
            imageStyling="animate-accordion-down"
            />,
            <HomeCarouselBanner 
            key={"banner2"}
            src={"/assets/banner/banner11.jpg"}
            captionPreText="We know you are busy"
            captionHeader="Professional Cleaning Services Provider"
            captionText="We take pride in providing excellent cleaning services all time. Your satisfaction is our joy."
            imageStyling="animate-accordion-down"
            alt="Home banner 2"
            />,
            <HomeCarouselBanner 
            key={"banner3"}
            src={"/assets/img/banner1.jpg"}
            alt="Home banner 3"
            captionPreText="We know you are busy"
            captionHeader="Professional Cleaning Services Provider"
            imageStyling="animate-accordion-down"
            captionText="We take pride in providing excellent cleaning services all time. Your satisfaction is our joy."
            />,
          ]}
        />
      </div>
    </div>
  );
};

export default HomeHeroSlider;
