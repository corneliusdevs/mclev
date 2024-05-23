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
import React, { FC } from "react";

type AlertDialogComponentProps = {
  description: string;
  buttonText?: string | React.ReactNode;
  buttonVariant?:
    | "outline"
    | "default"
    | "destructive"
    | "secondary"
    | "ghost"
    | "link";
  buttonClassname?: string;
  title: string | undefined;
  buttonSize?: "default" | "sm" | "lg" | "icon" | null | undefined;
  cancelText?: string;
  cancelButtonClassName?: string;
  actionButtonClassName?: string;
  actionText: string;
  customButton?: React.ReactNode;
  onActionButtonClickHandler?: Function;
  isDisabled?: boolean
};

const AlertDialogComponent: FC<AlertDialogComponentProps> = ({
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
  onActionButtonClickHandler,
  isDisabled,
  ...props
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="">
        {props.customButton ? (
          props.customButton
        ) : (
          <Button
            variant={buttonVariant}
            className={buttonClassname}
            size={buttonSize}
          >
            {buttonText}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent >
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {cancelText && (
            <AlertDialogCancel
              className={`${cancelButtonClassName && cancelButtonClassName}`}
            >
              {cancelText}
            </AlertDialogCancel>
          )}
          {
                !isDisabled &&
          <AlertDialogAction
            className={`${actionButtonClassName && actionButtonClassName}`}
            onClick={() => {
              onActionButtonClickHandler && onActionButtonClickHandler();
            }}
          >
            {actionText}
          </AlertDialogAction>
          }
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
