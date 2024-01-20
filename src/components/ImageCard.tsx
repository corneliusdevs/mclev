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
    <div className="flex flex-col items-center justify-center">
      <div className="flex justify-center overflow-hidden">
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          className={`${className}`}

          {...restProps}
        />
      </div>
      <div className="text-center text-sm py-1 whitespace-pre-line cursor-pointer hover:text-secondarycol transition-all">
         {caption}
      </div>
    </div>
  );
};

export default ImageCard;
