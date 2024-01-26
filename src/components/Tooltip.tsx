
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { FC } from "react"

interface TooltipComponentProps{
  childComponent: React.ReactNode
  info: string
}

const TooltipComponent:FC<TooltipComponentProps> =(props)=> {
  return (
    <TooltipProvider>
      <Tooltip >
        <TooltipTrigger asChild>
          {/* <Button variant="outline">Hover</Button> */}
          {props.childComponent}
        </TooltipTrigger>
        <TooltipContent className="bg-black/65 delay-0">
          {props.info}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default TooltipComponent