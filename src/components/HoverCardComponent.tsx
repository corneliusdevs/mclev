import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
      <HoverCardTrigger className={`${triggerClassname && triggerClassname}`}>
         { triggerText && triggerText }
         { customTriggerComponent && customTriggerComponent }
      </HoverCardTrigger>
      <HoverCardContent className={`${textClassname && textClassname}`}>
        {text}
      </HoverCardContent>
    </HoverCard>
  );
};

export default HoverCardComponent;
