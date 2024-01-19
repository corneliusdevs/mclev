import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { FC } from "react"
import { VariantProps } from "class-variance-authority"

 interface HomeheroButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
   text: string
}

const HomeheroButton: FC<HomeheroButtonProps> = ({variant, size, className, text})=>{
    return(
        <div>
          <button className={cn(buttonVariants({ variant, size, className }))}>
               {text}
          </button>
        </div>
    )
}

export default HomeheroButton