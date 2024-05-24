import Image from "next/image";
import { CarouselWithArrows } from "../Carousel";

const OurTeam = () => {
  return (
    <div className="bg-homegray px-4 py-4 flex flex-col items-center">
      <div className="flex justify-center">
        <header className="font-bold text-2xl">Our Team</header>
      </div>
      <div className="w-full">
        <CarouselWithArrows
          previousArrowClassName={"p-2 transform scale-[1.3]"}
          nextArrowClassName={"p-2 transform scale-[1.3]"}
          items={[
            <div className="shadow-lg max-w-[300px] my-8">
              <div className="flex width-[300px]">
                <Image
                  src={"/assets/banner/banner1.jpg"}
                  width={300}
                  height={300}
                  alt="Team member"
                  className=""
                />
              </div>
              <div className="bg-white text-center p-4">
                This is a caption and a really long text
              </div>
            </div>,
            <div className="shadow-lg max-w-[300px] my-8">
              <div className="flex width-[300px]">
                <Image
                  src={"/assets/banner/banner1.jpg"}
                  width={300}
                  height={300}
                  alt="Team member"
                  className=""
                />
              </div>
              <div className="bg-white text-center p-4">
                This is a caption and a really long text
              </div>
            </div>,
            <div className="shadow-lg max-w-[300px] my-8">
              <div className="flex width-[300px]">
                <Image
                  src={"/assets/banner/banner1.jpg"}
                  width={300}
                  height={300}
                  alt="Team member"
                  className=""
                />
              </div>
              <div className="bg-white text-center p-4">
                This is a caption and a really long text
              </div>
            </div>,
          ]}
        />
      </div>
    </div>
  );
};

export default OurTeam;
