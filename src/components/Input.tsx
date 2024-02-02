import { FC } from "react";
import { Input } from "./ui/input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  placeholder?: string
}

const InputElement: FC<InputProps> = ({ className, placeholder, ...props }) => {

  return (
    <div>
      <Input className={`${className && className}`} placeholder={`${placeholder ? placeholder : ""}`}
       
      {...props}
      />
    </div>
  );
};

export default InputElement;
