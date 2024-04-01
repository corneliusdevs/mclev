import { FC, forwardRef } from "react";
import { Input } from "./ui/input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string
}

const InputElement = forwardRef<HTMLInputElement,  InputProps>(({ className, placeholder, ...props }, ref) => {

  return (
    <div>
      <Input className={`${className && className}`} placeholder={`${placeholder ? placeholder : ""}`}
       
      {...props}
      />
    </div>
  );
});

export default InputElement;
