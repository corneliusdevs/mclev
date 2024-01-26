import { FC } from "react"

interface IconTextProps {
  text: string,
  icon: React.ReactNode,
  iconStyle?: string,
  textStyle?: string,
  generalStyle?: string
}

const IconText:FC<IconTextProps> = (props)=>{
    return (
        <div className={`flex items-start mb-4 ${props.generalStyle}`}>
          <div className={`flex items-center justify-center ${props.iconStyle&& props.iconStyle}`}>
            {props.icon}
          </div>
          <div className={`flex items-center justify-center ${props.textStyle&& props.textStyle}`}>
             {props.text}
          </div>
        </div>
    )
}

export default IconText