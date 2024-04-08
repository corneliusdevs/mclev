import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button, buttonVariants } from "./ui/button";
import React, { FC } from "react";

interface DrawerComponentProps {
  triggerComponent?: React.ReactNode;
  titleText?: string;
  descriptionText?: string;
  closeButtonText?: string;
  closeButtonClassName?: string;
  mainContentComponent?: React.ReactNode;
  closeButtonDisabled?: boolean;
}

const DrawerComponent: FC<DrawerComponentProps> = ({
  triggerComponent,
  titleText,
  descriptionText,
  closeButtonText,
  closeButtonClassName,
  mainContentComponent,
  closeButtonDisabled
}) => {
  return (
    <Drawer  >
      <DrawerTrigger>
        {
          // if trigger component prop is passed, render it
          triggerComponent && triggerComponent
        }
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{titleText && titleText}</DrawerTitle>
          <DrawerDescription className="w-fit">
            {descriptionText && descriptionText}
          </DrawerDescription>
        </DrawerHeader>
            {mainContentComponent && mainContentComponent}
        <DrawerFooter>
          {/* <Button>Submit</Button> */}
          <DrawerClose>
             {
              closeButtonText ? closeButtonDisabled ? <Button variant={"outline"} className={`${closeButtonClassName && closeButtonClassName}`} disabled>{closeButtonText}</Button> : <Button variant={"outline"} className={`${closeButtonClassName && closeButtonClassName}`}>{closeButtonText}</Button> : null
             } 
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
