import { cn } from "@/lib/utils";
import React, { FC } from "react";

interface MaxwidthWrapperProps {
  className?: string;
  children: React.ReactNode;
}

const MaxwidthWrapper: FC<MaxwidthWrapperProps> = ({ className, children }) => {
  return (
    <div className={cn('mx-auto w-full max-w-screen-xl', className)}>
      {children}
    </div>
  );
};

export default MaxwidthWrapper;