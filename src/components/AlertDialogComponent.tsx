import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { FC } from "react";


type AlertDialogComponentProps = {
  description: string;
  buttonText: string;
  buttonVariant:
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link";
  buttonClassname: string;
  title: string | undefined;
  buttonSize: "default" | "sm" | "lg" | "icon" | null | undefined;
  cancelText?: string;
  cancelButtonClassName?: string;
  actionButtonClassName?: string;
  actionText: string;
  customButton?: React.ReactNode 
};

const AlertDialogComponent:FC<AlertDialogComponentProps> =({
  description,
  buttonText,
  buttonSize,
  buttonClassname,
  buttonVariant,
  title,
  cancelText,
  actionText,
  cancelButtonClassName,
  actionButtonClassName,
  ...props
}) => {
  return (
    <AlertDialog >
      <AlertDialogTrigger asChild className="" 
      >
        {
           
            props.customButton ?  
          props.customButton : <Button
          variant={buttonVariant}
          className={buttonClassname}
          size={buttonSize}
        >
          {buttonText}
        </Button>
        }
        
      </AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelText && <AlertDialogCancel className={`${cancelButtonClassName && cancelButtonClassName}`}>{cancelText}</AlertDialogCancel>}
          <AlertDialogAction className={`${actionButtonClassName && actionButtonClassName}`}>{actionText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  };

export default AlertDialogComponent;
