

import { Dispatch, FC, SetStateAction } from "react";
import ServiceQuestionaire from "@/components/book-a-cleaner/ServiceQuestionaire";
import {
  antiviralServiceQuestionaire,
  carpetOrRugCleaningServiceQuestionaire,
  endofTenancyCleaningQuestionaire,
  ovencleaningServiceQuestionaire,
  uphosteryCleaningServiceQuestionaire,
  windowCleaningServiceQuestionaire,
} from "@/helpers/servicesToSelect";
import { SelectedOptionWithAnswers } from "@/helpers/updateSelectedOptions";

interface ServiceDetailProps {
  serviceName: string;
  updateSelectedAnswers?: Dispatch<SetStateAction<SelectedOptionWithAnswers[]>>; 
}
const ServiceDetail: FC<ServiceDetailProps> = ({ serviceName, updateSelectedAnswers }) => {
 
  const serviceQuestionaireGenerator = () => {
    let ui = updateSelectedAnswers?  <ServiceQuestionaire info={antiviralServiceQuestionaire} updateSelectedAnswers = {updateSelectedAnswers}/> : <ServiceQuestionaire info={antiviralServiceQuestionaire} /> ;

    switch (serviceName) {
      case "Antiviral Sanitisation":
        ui = updateSelectedAnswers?  <ServiceQuestionaire info={antiviralServiceQuestionaire} updateSelectedAnswers = {updateSelectedAnswers}/> : <ServiceQuestionaire info={antiviralServiceQuestionaire} />;
        break;

      case "End Of Tenancy Cleaning":
        ui = updateSelectedAnswers? <ServiceQuestionaire info={endofTenancyCleaningQuestionaire} updateSelectedAnswers = {updateSelectedAnswers}/>: <ServiceQuestionaire info={endofTenancyCleaningQuestionaire} />;
        break;

      case "Oven Cleaning":
        ui = updateSelectedAnswers? <ServiceQuestionaire info={ovencleaningServiceQuestionaire} updateSelectedAnswers={updateSelectedAnswers} /> : <ServiceQuestionaire info={ovencleaningServiceQuestionaire} updateSelectedAnswers={updateSelectedAnswers}/>;
        break;
      case "Carpet / Rug Cleaning":
        ui =  updateSelectedAnswers? <ServiceQuestionaire info={carpetOrRugCleaningServiceQuestionaire}  updateSelectedAnswers={updateSelectedAnswers}/> : <ServiceQuestionaire info={carpetOrRugCleaningServiceQuestionaire} />;
        break;
      case "Window Cleaning":
        ui = updateSelectedAnswers? <ServiceQuestionaire info={windowCleaningServiceQuestionaire} updateSelectedAnswers={updateSelectedAnswers}/> : <ServiceQuestionaire info={windowCleaningServiceQuestionaire} />;
        break;
      case "Uphostery Cleaning":
        ui = updateSelectedAnswers? <ServiceQuestionaire info={uphosteryCleaningServiceQuestionaire} updateSelectedAnswers={updateSelectedAnswers} />: <ServiceQuestionaire info={uphosteryCleaningServiceQuestionaire} />;
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
