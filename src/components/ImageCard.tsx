import { FC } from "react";
import Image from "next/image";
interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
  caption?: string;
  quality?: number;
}

const ImageCard: FC<ImageCardProps> = ({ src, alt, caption, className, ...restProps }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-md items-center justify-center smd:h-full">
      <div className="flex justify-center overflow-hidden h-full w-full smd:min-h-[100px] md:min-h-[150px]">
        <Image
          src={src}
          alt={alt}
          width={300}
          height={300}
          className={`${className}`}

          {...restProps}
        />
      </div>
      <div className="w-full h-full border-x-[1px] flex items-center justify-center text-center text-sm py-1 whitespace-pre-line cursor-pointer hover:text-secondarycol transition-all break-words md:text-[16px]">
         {caption}
      </div>
    </div>
  );
};

export default ImageCard;
