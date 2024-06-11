import MaxwidthWrapper from "@/components/Max_Min_widthWrapper";
import Pricing from "@/components/pricing/Pricing";
import PricingBanner from "@/components/pricing/PricingBannner";
import { pricings } from "@/helpers/pricingList";

const PricesPage = () => {
  return (
    <main>
      <MaxwidthWrapper>
        <div>
          <PricingBanner />
          <Pricing pricingList={pricings} />
        </div>
      </MaxwidthWrapper>
    </main>
  );
};

export default PricesPage;
