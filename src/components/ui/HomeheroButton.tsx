import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { FC } from "react"
import { VariantProps } from "class-variance-authority"

 interface HomeheroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
   text: string;
   icon?: React.ReactNode;
}

const HomeheroButton: FC<HomeheroButtonProps> = ({variant, size, className, text, ...props})=>{
    return(
        <div>
          <button className={cn(buttonVariants({ variant, size, className }))}
          {...props}
          >
               {text}
               {props.icon && props.icon}
          </button>
        </div>
    )
}

export default HomeheroButton