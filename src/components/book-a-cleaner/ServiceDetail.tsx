import { Dispatch, FC, SetStateAction } from "react";
import ServiceQuestionaire from "@/components/book-a-cleaner/ServiceQuestionaire";
import {
  antiviralServiceQuestionaire,
  carpetOrRugCleaningServiceQuestionaire,
  deepCleaningQuestionaire,
  endofTenancyCleaningQuestionaire,
  moveInOutCleaningQuestionaire,
  officeCleaningQuestionaire,
  ovencleaningServiceQuestionaire,
  regularCleaningQuestionaire,
  specificAreaCleaningQuestionaire,
  standardCleaningQuestionaire,
  windowCleaningServiceQuestionaire,
} from "@/helpers/servicesToSelect";
import { SelectedOptionWithAnswers } from "@/helpers/updateSelectedOptions";

interface ServiceDetailProps {
  serviceName: string;
  updateSelectedAnswers?: Dispatch<SetStateAction<SelectedOptionWithAnswers[]>>;
}
const ServiceDetail: FC<ServiceDetailProps> = ({
  serviceName,
  updateSelectedAnswers,
}) => {
  const serviceQuestionaireGenerator = () => {
    let ui = updateSelectedAnswers ? (
      <ServiceQuestionaire
        questionaire={antiviralServiceQuestionaire}
        updateSelectedAnswers={updateSelectedAnswers}
      />
    ) : (
      <ServiceQuestionaire questionaire={antiviralServiceQuestionaire} />
    );

    switch (serviceName) {
      case "Antiviral Sanitisation":
        ui = updateSelectedAnswers ? (
          <ServiceQuestionaire
            questionaire={antiviralServiceQuestionaire}
            updateSelectedAnswers={updateSelectedAnswers}
          />
        ) : (
          <ServiceQuestionaire questionaire={antiviralServiceQuestionaire} />
        );
        break;

      case "End Of Tenancy Cleaning":
        ui = updateSelectedAnswers ? (
          <ServiceQuestionaire
            questionaire={endofTenancyCleaningQuestionaire}
            updateSelectedAnswers={updateSelectedAnswers}
          />
        ) : (
          <ServiceQuestionaire
            questionaire={endofTenancyCleaningQuestionaire}
          />
        );
        break;

      case "Oven Cleaning":
        ui = updateSelectedAnswers ? (
          <ServiceQuestionaire
            questionaire={ovencleaningServiceQuestionaire}
            updateSelectedAnswers={updateSelectedAnswers}
          />
        ) : (
          <ServiceQuestionaire
            questionaire={ovencleaningServiceQuestionaire}
            updateSelectedAnswers={updateSelectedAnswers}
          />
        );
        break;

      case "Carpet / Rug Cleaning":
        ui = updateSelectedAnswers ? (
          <ServiceQuestionaire
            questionaire={carpetOrRugCleaningServiceQuestionaire}
            updateSelectedAnswers={updateSelectedAnswers}
          />
        ) : (
          <ServiceQuestionaire
            questionaire={carpetOrRugCleaningServiceQuestionaire}
          />
        );
        break;

      case "Window Cleaning":
        ui = updateSelectedAnswers ? (
          <ServiceQuestionaire
            questionaire={windowCleaningServiceQuestionaire}
            updateSelectedAnswers={updateSelectedAnswers}
          />
        ) : (
          <ServiceQuestionaire
            questionaire={windowCleaningServiceQuestionaire}
          />
        );
        break;

      case "Office Cleaning":
        ui = updateSelectedAnswers ? (
          <ServiceQuestionaire
            questionaire={officeCleaningQuestionaire}
            updateSelectedAnswers={updateSelectedAnswers}
          />
        ) : (
          <ServiceQuestionaire questionaire={officeCleaningQuestionaire} />
        );
        break;

      case "Deep Cleaning":
        ui = updateSelectedAnswers ? (
          <ServiceQuestionaire
            questionaire={deepCleaningQuestionaire}
            updateSelectedAnswers={updateSelectedAnswers}
          />
        ) : (
          <ServiceQuestionaire questionaire={deepCleaningQuestionaire} />
        );
        break;

      case "Standard Cleaning":
        ui = updateSelectedAnswers ? (
          <ServiceQuestionaire
            questionaire={standardCleaningQuestionaire}
            updateSelectedAnswers={updateSelectedAnswers}
          />
        ) : (
          <ServiceQuestionaire questionaire={standardCleaningQuestionaire} />
        );
        break;

      case "Regular Cleaning":
        ui = updateSelectedAnswers ? (
          <ServiceQuestionaire
            questionaire={regularCleaningQuestionaire}
            updateSelectedAnswers={updateSelectedAnswers}
          />
        ) : (
          <ServiceQuestionaire questionaire={regularCleaningQuestionaire} />
        );
        break;

      case "Move-in/out Cleaning":
        ui = updateSelectedAnswers ? (
          <ServiceQuestionaire
            questionaire={moveInOutCleaningQuestionaire}
            updateSelectedAnswers={updateSelectedAnswers}
          />
        ) : (
          <ServiceQuestionaire questionaire={moveInOutCleaningQuestionaire} />
        );
        break;

      case "Specific Area Cleaning":
        ui = updateSelectedAnswers ? (
          <ServiceQuestionaire
            questionaire={specificAreaCleaningQuestionaire}
            updateSelectedAnswers={updateSelectedAnswers}
          />
        ) : (
          <ServiceQuestionaire
            questionaire={specificAreaCleaningQuestionaire}
          />
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
