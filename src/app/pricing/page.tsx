import Pricing from "@/components/pricing/Pricing"
import PricingBanner from "@/components/pricing/PricingBannner"
import { pricings } from "@/helpers/pricingList"


const PricesPage = ()=>{
    return(
     <main>
       <div>
         <PricingBanner />
         <Pricing  pricingList={ pricings }/>
       </div>
     </main>
    )
 }
 
 export default PricesPage
 
 
 