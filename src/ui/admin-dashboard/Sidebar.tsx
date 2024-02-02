import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, X } from "lucide-react";
import { FC } from "react";

interface SidebarProps  {
    side: "top" | "bottom" | "left" | "right" | null | undefined,
    generalStye?: string,
    childComponent: React.ReactNode
}
const Sidebar:FC<SidebarProps> = ({side , ...props})=> {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost"><AlignJustify /></Button>
      </SheetTrigger>
      <SheetContent  side={side} className={`pt-11 px-2 ${props.generalStye && props.generalStye}`}>
        <SheetHeader className="">
          {/* <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription> */}
          {
            props.childComponent
          }
        </SheetHeader>
        
        <SheetFooter>
          {/* <SheetClose asChild>
            <Button type="submit"><X /></Button>
          </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default Sidebar
