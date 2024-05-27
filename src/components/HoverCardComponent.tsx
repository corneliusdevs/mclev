import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";

interface HoverCardComponentProps {
  text: string;
  textClassname?: string;
  triggerText?: string;
  customTriggerComponent?: React.ReactNode;
  triggerClassname?: string;
}

const HoverCardComponent = ({
  text,
  textClassname,
  triggerText,
  customTriggerComponent,
  triggerClassname
}: HoverCardComponentProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger className={`${triggerClassname && triggerClassname}`} asChild>

         { triggerText ? <Button variant={"ghost"} className="max-w-[100px] underline underline-offset-2">{triggerText}</Button> :customTriggerComponent }
      </HoverCardTrigger>
      <HoverCardContent className={`${textClassname && textClassname}`}>
        {text}
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardComponent;
