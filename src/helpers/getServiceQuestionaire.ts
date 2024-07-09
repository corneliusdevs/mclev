import {
  antiviralServiceQuestionaire,
  endofTenancyCleaningQuestionaire,
  ovencleaningServiceQuestionaire,
  carpetOrRugCleaningServiceQuestionaire,
  windowCleaningServiceQuestionaire,
  deepCleaningQuestionaire,
  officeCleaningQuestionaire,
  standardCleaningQuestionaire,
  moveInOutCleaningQuestionaire,
  specificAreaCleaningQuestionaire,
  regularCleaningQuestionaire,
} from "./servicesToSelect";

// Returns the appropriate questionaire based on the service name
export const getServiceQuestionaire = (serviceName: string) => {
  let questionaire = antiviralServiceQuestionaire;
  switch (serviceName) {
    case "Antiviral Sanitisation":
      questionaire = antiviralServiceQuestionaire;
      break;

    case "End Of Tenancy Cleaning":
      questionaire = endofTenancyCleaningQuestionaire;
      break;

    case "Oven Cleaning":
      questionaire = ovencleaningServiceQuestionaire;
      break;

    case "Carpet / Rug Cleaning":
      questionaire = carpetOrRugCleaningServiceQuestionaire;
      break;

    case "Window Cleaning":
      questionaire = windowCleaningServiceQuestionaire;
      break;

    case "Deep Cleaning":
      questionaire = deepCleaningQuestionaire;
      break;

    case "Standard Cleaning":
      questionaire = standardCleaningQuestionaire;
      break;

    case "Office Cleaning":
      questionaire = officeCleaningQuestionaire;
      break;

    case "Regular Cleaning":
      questionaire = regularCleaningQuestionaire;
      break;

    case "Move-in/out Cleaning":
      questionaire = moveInOutCleaningQuestionaire;
      break;

    case "Specific Area Cleaning":
      questionaire = specificAreaCleaningQuestionaire;
      break;

    default:
      questionaire = antiviralServiceQuestionaire;
      break;
  }

  return questionaire;
};
