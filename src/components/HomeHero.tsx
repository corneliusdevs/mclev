import React from "react";
import HomeheroButton from "./ui/HomeheroButton";

const HomeHero = () => {
  return (
    <div className="w-full overflow-hidden">
      <section className="bg-home-hero transform h-[380px] -bg-[right_bottom_10%] bg-cover bg-no-repeat relative w-[full] md:bg-cover smd:bg-cover">
        <div
          id="first-homehero-overlay"
          className="bg-homeheroGradient abolute top-0 -mt-[80px] -ml-[40px] w-[62%] h-[115%] rotate-[14deg] opacity-95 md:w-[60%] md:h-[125%] md:-mt-[120px]"
        ></div>
        <div
          id="second-homehero-overlay"
          className="bg-homeheroGradient abolute top-0 -mt-[410px] ml-[47.5%] w-[15%] h-[100%] rotate-[14deg] z-10 opacity-[0.8] md:w-[17%] md:ml-[52%] md:opacity-[0.75] md:-mt-[430px]"
        ></div>
        <div
          id="third-homehero-overlay"
          className="bg-homeheroGradient abolute top-0 -mt-[410px] ml-[63.3%] w-[7%] h-[110%] rotate-[14deg] z-10 opacity-[0.55] md:ml-[67.8%] md:opacity-[0.50]"
        ></div>

        <div className="absolute top-10 h-[100%] z-30 mb-4">
          <div className="flex flex-col p-6 max-w-[80%] md:pt-16">
            <div className="mt-10 text-primarycol smd:mt-14">End Of Tenancy Cleaning London</div>
            <div className="mt-8 text-[0.85rem] text-slate-700">
              Lorem Ipsum Dolor Sit <br/> amet dolor sit amet lorem ipsum. Lorem Ipsum
              Dolor <br/> Sit amet dolor sit amet lorem ipsum.
            </div>
            <HomeheroButton variant={"outline"} className="mt-4 bg-accentcol text-white rounded-none hover:bg-transparent hover:border-slate-600" size={"default"} text="REQUEST A QUOTE"/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeHero;
