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
import { FC } from "react";
import HomeheroButton from "./ui/HomeheroButton";
import { Button } from "./ui/button";

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
  title: string;
  buttonSize: "default" | "sm" | "lg" | "icon" | null | undefined;
  cancelText?: string;
  cancelButtonClassName?: string;
  actionButtonClassName?: string;
  actionText: string;
};

const AlertDialogComponent = ({
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
}: AlertDialogComponentProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="">
        <Button
          variant={buttonVariant}
          className={buttonClassname}
          size={buttonSize}
        >
          {buttonText}
        </Button>
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
