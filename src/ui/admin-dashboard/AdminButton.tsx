import { cn } from "@/lib/utils"
import { FC } from "react"
import { VariantProps } from "class-variance-authority"
import { buttonVariants } from "@/components/ui/button";

 interface AdminButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
   text: string;
   icon?: React.ReactNode,
}

const AdminButton: FC<AdminButtonProps> = ({variant, size, className, text, ...props})=>{
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

export default AdminButton