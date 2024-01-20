import { homeImageGalleryPayload } from "@/helpers/homeImages";
import ImageCard from "./ImageCard";

const HomeImageGallery = () => {
  return (
    <section className="flex justify-center">
      <div className="grid grid-cols-2 xsm:gap-x-[10%] p-2">
        {homeImageGalleryPayload.map((imageInfo, index) => {
          return (
            <div className="border-b-[1px] py-4">
              <ImageCard
                key={imageInfo.text + index}
                src={`/assets/home/${imageInfo.url}`}
                alt={`${imageInfo.text}`}
                caption={`${imageInfo.text}`}
                className="w-[120px] h-[80px] flex justify-center bg-contain hover:scale-[1.4] transition-all duration-300"
              />
              
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomeImageGallery;
