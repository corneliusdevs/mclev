import { PricingList } from "@/helpers/pricingList"
import PricingCollapsible from "./PricingCollapsible"


interface PricingProps{
  pricingList: PricingList
}

const Pricing = ({pricingList}: PricingProps)=>{
    return(
        <div className="w-full px-2 pb-4">
           <div className="w-full flex flex-col items-center">
              {
                pricingList.map((pricing)=>{
                  return <div className="w-full mb-3 max-w-[560px]" key={pricing.service + "98765"}>
                    <PricingCollapsible  details={pricing}/>
                  </div>
                })
              }
           </div>
        </div>
    )
}

export default Pricing