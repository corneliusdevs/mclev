import { homeServicesGalleryInfo } from "@/helpers/homeImages";
import React from "react";
import ImageCard from "./ImageCard";
import Link from "next/link";
import HomeheroButton from "./ui/HomeheroButton";

const HomeImageGallery = () => {
  return (
    <section className="flex flex-col items-center bg-homegray py-4 md:pb-8">
      <div className="flex justify-center items-center text-slate-600 text-2xl">
        <span>Our Services</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-[10%] gap-y-[20px] md:gap-y-[10%] smd:gap-x-[8%] md:gap-x-[10%] w-[90%] smd:w-[80%] mb-10 max-w-[410px] md:w-[80%] md:max-w-[80%]">
        {homeServicesGalleryInfo.map((imageInfo, index) => {
          return (
            <div
              className="border-b-[1px] mt-3 md:mt-8  rounded-md overflow-hidden smd:h-full shadow-sm hover:translate-y-2 transition-all duration-1000"
              key={imageInfo.text + index + "parent div"}
            >
              <Link href={imageInfo.link}>
                <ImageCard
                  key={imageInfo.imageAlt + index}
                  src={`${imageInfo.imageSrc}`}
                  alt={`${imageInfo.imageAlt}`}
                  caption={`${imageInfo.text}`}
                  className="w-full smd:w-full h-[80px] smd:h-full smd:max-h-[250px] flex justify-center bg-contain hover:scale-[1.4] transition-all duration-700"
                />
              </Link>
            </div>
          );
        })}
      </div>

      {/* ALL SERVICES BUTTON */}
      <div className="flex md:mt-6 justify-center pb-4">
        <Link href={"/services"} className="animate-pulse duration-[1500ms]">
          <HomeheroButton
            text={"ALL SERVICES"}
            variant={"outline"}
            className="mt-1 bg-primarycol text-white hover:bg-transparent hover:border-primarycol hover:text-primarycol rounded-lg"
            size={"default"}
            onClick={() => {}}
          />
        </Link>
      </div>
    </section>
  );
};

export default HomeImageGallery;
