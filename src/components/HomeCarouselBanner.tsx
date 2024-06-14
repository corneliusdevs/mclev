import { FC } from "react";
import Image from "next/image";
import HomeheroButton from "./ui/HomeheroButton";
import Link from "next/link";

interface HomeCarouselBannerProps {
  src: string;
  alt: string;
  caption?: string;
  quality?: number;
  captionPreText: string;
  captionText: string;
  captionHeader: string;
  imageStyling?: string;
}

const HomeCarouselBanner: FC<HomeCarouselBannerProps> = ({
  src,
  alt,
  caption,
  captionPreText,
  captionText,
  captionHeader,
  imageStyling,
  ...restProps
}) => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex justify-center w-full h-[52vh] md:h-[70vh]">
          <Image
            src={src}
            alt={alt}
            width={700}
            height={500}
            quality={100}
            className={`${
              imageStyling && imageStyling
            } w-full object-cover md:object-fill`}
            {...restProps}
          />
        </div>
      </div>
      <div className="absolute top-0 py-1 md:pt-[70px] text-center flex items-center text-2xl   whitespace-pre-line bg-black/40 transition-all w-full h-full text-white">
        <div className="flex flex-col justify-center mx-[10%] md:mx-[10%] text-left">
          {captionPreText && (
            <div className="text-[16px] smd:text-[18px] md:text-[1rem] mb-2">
              {typeof captionPreText === "string" &&
                captionPreText.toLocaleUpperCase()}
            </div>
          )}
          {captionHeader && (
            <div className="font-bold text-[18px] smd:text-[20px] md:text-3xl mb-4 tracking-wider">
              {captionHeader}
            </div>
          )}
          {captionText && (
            <div className="text-[14px] smd:[17px] mr-[50px]">
              {captionText}
            </div>
          )}
          <div className="md:mt-4 relative w-fit">
            <Link href={"/book-now"} className="w-fit">
              <HomeheroButton
                variant={"outline"}
                className="mt-6 bg-white text-black rounded-xl font-bold hover:text-white hover:bg-transparent hover:border-white outline-white outline outline-offset-2 outline-1"
                size={"default"}
                text="BOOK NOW"
              />
              <div className="absolute top-0 left-0 w-fit">
                <HomeheroButton
                  variant={"outline"}
                  className="mt-6 bg-white text-black rounded-xl font-bold hover:text-white hover:bg-transparent hover:border-white outline-white outline outline-offset-2 outline-1 animate-ping duration-[3000ms] delay-1000 px-10 ml-4 py-1"
                  size={"default"}
                  text=""
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCarouselBanner;
