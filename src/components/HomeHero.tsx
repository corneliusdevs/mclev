import React from "react";

const HomeHero = () => {
  return (
    <div className="w-full overflow-hidden">
      <section className="bg-home-hero h-[350px] bg-[top_right_70%] bg-no-repeat relative">
        <div
          id="first-homehero-overlay"
          className="bg-homeheroGradient abolute top-0 -mt-[30px] -ml-[40px] w-[60%] h-[110%] rotate-[14deg] opacity-95"
        ></div>
        <div
          id="second-homehero-overlay"
          className="bg-homeheroGradient abolute top-0 -mt-[380px] ml-[47.5%] w-[15%] h-[100%] rotate-[14deg] z-10 opacity-[0.8]"
        ></div>
        <div
          id="third-homehero-overlay"
          className="bg-homeheroGradient abolute top-0 -mt-[380px] ml-[63.8%] w-[7%] h-[110%] rotate-[14deg] z-10 opacity-[0.55]"
        ></div>

        <div className="absolute top-10 h-[100%] z-30">
          <div className="flex flex-col p-6 max-w-[80%]">
            <div className="mt-4 text-primarycol">End Of Tenancy Cleaning London</div>
            <div className="mt-8 text-[0.85rem]">
              Lorem Ipsum Dolor Sit <br/> amet dolor sit amet lorem ipsum. Lorem Ipsum
              Dolor <br/> Sit amet dolor sit amet lorem ipsum.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeHero;
