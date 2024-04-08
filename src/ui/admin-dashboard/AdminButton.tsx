import { cn } from "@/lib/utils";
import { FC, forwardRef } from "react";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

interface AdminButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text: string;
  icon?: React.ReactNode;
}

const AdminButton: FC<AdminButtonProps> = forwardRef(
  ({ variant, size, className, text, ...props }, ref) => {
    return (
      <div>
        <button
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        >
          {text}
          {props.icon && props.icon}
        </button>
      </div>
    );
  }
);

AdminButton.displayName = "Admin Button";

export default AdminButton;
