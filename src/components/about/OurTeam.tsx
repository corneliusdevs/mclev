import Image from "next/image";
import { CarouselWithArrows } from "../Carousel";

// correct the sliding behaviour of your carousel
const OurTeam = () => {
  return (
    <div className="bg-white px-4 py-4 flex flex-col items-center">
      <div className="flex justify-center">
        <header className="font-bold text-2xl">Our Team</header>
      </div>
      <div className="w-full">
        <CarouselWithArrows
          previousArrowClassName={"p-2 transform scale-[1.3]"}
          nextArrowClassName={"p-2 transform scale-[1.3]"}
          items={[
            <div 
             key={"team1"}
            className="shadow-lg my-8"
            >
              <div className="flex">
                <Image
                  src={"/assets/team/team1.jpg"}
                  width={300}
                  height={300}
                  alt="Team member"
                  className="w-full"
                />
              </div>
              <div className="bg-white text-center p-4">
                This is a caption and a really long text
              </div>
            </div>,
            <div 
            key={"team2"}
            className="shadow-lg my-8">
              <div className="flex">
                <Image
                  src={"/assets/team/team4.jpg"}
                  width={300}
                  height={300}
                  alt="Team member"
                  className="w-full"
                />
              </div>
              <div className="bg-white text-center p-4">
                This is a caption and a really long text
              </div>
            </div>,
            <div
             key={"team3"}
            className="shadow-lg my-8">
              <div className="flex">
                <Image
                  src={"/assets/team/team3.jpg"}
                  width={300}
                  height={300}
                  alt="Team member"
                  className="w-full"
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
