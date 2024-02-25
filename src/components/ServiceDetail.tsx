import { FC } from "react";
import ServiceQuestionaire from "./book-a-cleaner/ServiceQuestionaire";
import {
  antiviralServiceQuestionaire,
  carpetOrRugCleaningServiceQuestionaire,
  endofTenancyCleaningQuestionaire,
  ovencleaningServiceQuestionaire,
  uphosteryCleaningServiceQuestionaire,
  windowCleaningServiceQuestionaire,
} from "@/helpers/servicesToSelect";

interface ServiceDetailProps {
  serviceName: string;
}
const ServiceDetail: FC<ServiceDetailProps> = ({ serviceName }) => {
  const serviceQuestionaireGenerator = () => {
    let ui = <ServiceQuestionaire info={antiviralServiceQuestionaire} />;

    switch (serviceName) {
      case "Antiviral Sanitisation":
        ui = <ServiceQuestionaire info={antiviralServiceQuestionaire} />;
        break;

      case "End Of Tenancy Cleaning":
        ui = <ServiceQuestionaire info={endofTenancyCleaningQuestionaire} />;
        break;

      case "Oven Cleaning":
        ui = <ServiceQuestionaire info={ovencleaningServiceQuestionaire} />;
        break;
      case "Carpet / Rug Cleaning":
        ui = (
          <ServiceQuestionaire info={carpetOrRugCleaningServiceQuestionaire} />
        );
        break;
      case "Window Cleaning":
        ui = <ServiceQuestionaire info={windowCleaningServiceQuestionaire} />;
        break;
      case "Uphostery Cleaning":
        ui = (
          <ServiceQuestionaire info={uphosteryCleaningServiceQuestionaire} />
        );
        break;

      default:
        break;
    }

    return ui;
  };

  return (
    <div className="p-8 pt-6">
      <div className="text-greenaccentcol font-light flex justify-start text-2xl border-b-[1px] border-greenaccentcol/15 pb-2">
        {serviceName}
      </div>
      <div>{serviceQuestionaireGenerator()}</div>
    </div>
  );
};

export default ServiceDetail;
