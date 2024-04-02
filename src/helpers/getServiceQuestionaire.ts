import { antiviralServiceQuestionaire, endofTenancyCleaningQuestionaire, ovencleaningServiceQuestionaire, carpetOrRugCleaningServiceQuestionaire, windowCleaningServiceQuestionaire, uphosteryCleaningServiceQuestionaire } from "./servicesToSelect"



export const getServiceQuestionaire = (serviceName:string)=>{
    let questionaire = antiviralServiceQuestionaire
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
        case "Uphostery Cleaning":
            questionaire = uphosteryCleaningServiceQuestionaire;
          break;
  
        default:
            questionaire = antiviralServiceQuestionaire
          break;
      }

      return questionaire

}