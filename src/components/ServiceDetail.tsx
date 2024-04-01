

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
  onSelected?: Function; //  a higher order function to be executed when an option is selected by the user. This function must supply the state or store as an argument of type Array. confused? implement a setState function of this signature setState(prevStateArray => return current state)
  // This can be your setState function. It will call your setState or store manager function with the selected question and answer
  // use this to store the selected question and answer
}
const ServiceDetail: FC<ServiceDetailProps> = ({ serviceName, onSelected }) => {
 
  const serviceQuestionaireGenerator = () => {
    let ui = onSelected?  <ServiceQuestionaire info={antiviralServiceQuestionaire} onSelected = {onSelected}/> : <ServiceQuestionaire info={antiviralServiceQuestionaire} /> ;

    switch (serviceName) {
      case "Antiviral Sanitisation":
        ui = onSelected?  <ServiceQuestionaire info={antiviralServiceQuestionaire} onSelected = {onSelected}/> : <ServiceQuestionaire info={antiviralServiceQuestionaire} />;
        break;

      case "End Of Tenancy Cleaning":
        ui = onSelected? <ServiceQuestionaire info={endofTenancyCleaningQuestionaire} onSelected = {onSelected}/>: <ServiceQuestionaire info={endofTenancyCleaningQuestionaire} />;
        break;

      case "Oven Cleaning":
        ui = onSelected? <ServiceQuestionaire info={ovencleaningServiceQuestionaire} onSelected={onSelected} /> : <ServiceQuestionaire info={ovencleaningServiceQuestionaire} onSelected={onSelected}/>;
        break;
      case "Carpet / Rug Cleaning":
        ui =  onSelected? <ServiceQuestionaire info={carpetOrRugCleaningServiceQuestionaire}  onSelected={onSelected}/> : <ServiceQuestionaire info={carpetOrRugCleaningServiceQuestionaire} />;
        break;
      case "Window Cleaning":
        ui = onSelected? <ServiceQuestionaire info={windowCleaningServiceQuestionaire} onSelected={onSelected}/> : <ServiceQuestionaire info={windowCleaningServiceQuestionaire} />;
        break;
      case "Uphostery Cleaning":
        ui = onSelected? <ServiceQuestionaire info={uphosteryCleaningServiceQuestionaire} onSelected={onSelected} />: <ServiceQuestionaire info={uphosteryCleaningServiceQuestionaire} />;
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
