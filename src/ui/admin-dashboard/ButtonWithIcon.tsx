import { cn } from "@/lib/utils";
import { FC } from "react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import React from "react"
interface ButtonWithIconsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text: string;
  icon: React.ReactNode;
  extraInfo?: string;
  clickHandler?: Function
}

const ButtonWithIcons: FC<ButtonWithIconsProps> = ({
  variant,
  size,
  className,
  text,
  icon,
  ...props
}) => {
  return (
    <div>
      <button className={cn(buttonVariants({ variant, size, className }))}
      onClick={()=>{
        if (props.clickHandler)props.clickHandler()
      }}>
        <div className={`flex justify-between items-center w-full max-w-[110px]`}>
          <span className=""> {icon}</span>
          <span>{text}</span>
          {props.extraInfo && <span>&#40;{props.extraInfo}&#41;</span>}
        </div>
      </button>
    </div>
  );
};

export default ButtonWithIcons;
