import { SelectItem } from "@/components/SelectComponent";


// The services to select are created in this fashion so as to separate what is rendered on the ui with what will be sent and stored in the database

// name field is what is rendered in the ui
// value field is what is used to access and store the service in the state and in database
export const servicesToSelect: SelectItem[] = [
  {
    "name": "Antiviral Sanitisation", 
    "value": "antiviralSanitisation",
  },
  {
    "name": "End Of Tenancy Cleaning",
    "value": "EndOfTenancyCleaning",
  },
  {
    "name": "Carpet / Rug Cleaning",
    "value": "carpetRugCleaning",
  },
  {
    "name": "Window Cleaning",
    "value": "windowCleaning",
  },
  {
    "name": "Oven Cleaning",
    "value": "ovenCleaning",
  },
  {
    "name": "Deep Cleaning",
    "value": "deepCleaning",
  },
  {
    "name": "Standard Cleaning",
    "value": "standardCleaning",
  },
  {
    "name": "Office Cleaning",
    "value": "officeCleaning",
  },
  {
    "name": "Regular Cleaning",
    "value": "regularCleaning",
  },
  {
    "name": "Move-in/out Cleaning",
    "value": "moveInOutCleaning",
  },
  {
    "name": "Specific Area Cleaning",
    "value": "specificAreaCleaning",
  },
];


interface servicesToSelectLookupType {
  [index: string] : string
}

// takes in the name and value of the selected service e.g { name: "office clean", value: "officeClean" }, transforms the input and return it in the format { value: name} so { name: "office clean", value: "officeClean" } becomes {officeClean: "office clean"}

const servicesToSelectLookupGenerator = (servicesToSelect: SelectItem[]) => {
  let servicesToSelectLookup:servicesToSelectLookupType = {};

  servicesToSelect.map((service) => {
    servicesToSelectLookup = {
      ...servicesToSelectLookup,
      [service.value]: service.name,
    };
  });

  return { ...servicesToSelectLookup };
};

export const servicesToSelectLookup =
  servicesToSelectLookupGenerator(servicesToSelect);



export type ServiceQuestionaireOptions = {
  imageSrc?: string;
  caption: string;
};



export type ServiceQuestionaire = {
  questionaireType: "ImageWithCaption" | "TextSelect" | "ImageWithLongCaption" | "UserInput";
  question: string;
  inputType?: "string" | "number"
  required: boolean;
  placeholderText?: string;
  titleText?: string;
  options?: ServiceQuestionaireOptions[];
};

export const antiviralServiceQuestionaire: ServiceQuestionaire[] = [
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Please tell us about your place",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "working.png",
  //       caption: "Studio",
  //     },
  //     {
  //       imageSrc: "flats1.png",
  //       caption: "House/Flat",
  //     },
  //   ],
  // },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Frequency",
    question: "How often do you need cleaning?",
    required: true,
    placeholderText: "e.g weekly, bi-weekly, monthly, one-time."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Location",
    question: "Where is the cleaning needed?",
    required: true,
    placeholderText: "e.g full address including any specific instruction or access details."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Size of the Space",
    question: "What is the size of the area to be cleaned?",
    required: true,
    placeholderText: "e.g number of bedrooms, bathrooms, square footage."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Special Requests",
    question: "Are there any areas or tasks you want us to focus on?",
    required: true,
    placeholderText: "e.g particular rooms, appliances or surfaces"
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Pets",
    question: "Are there any pets in the household that our cleaners should be aware of?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Parking and Access",
    question: "Is there any parking available nearby?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    question: "Are there any parking access or restrictions or instructions for our cleaners?",
    required: true,
    placeholderText: ""
  },
];

export const endofTenancyCleaningQuestionaire: ServiceQuestionaire[] = [
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Please tell us about your place",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "house.png",
  //       caption: "Single",
  //     },
  //     {
  //       imageSrc: "flats.png",
  //       caption: "Double",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Which of the following applies to your property",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "kitchen-table.png",
  //       caption: "Combined kitchen/living",
  //     },
  //     {
  //       imageSrc: "kitchen2.png",
  //       caption: "Separated kitchen/living",
  //     },
  //     {
  //       imageSrc: "washing-machine.png",
  //       caption: "Utility room",
  //     },
  //     {
  //       imageSrc: "studyroom-office.png",
  //       caption: "Study room/office",
  //     },
  //     {
  //       imageSrc: "conservatory.png",
  //       caption: "Conservatory",
  //     },
  //     {
  //       imageSrc: "additional-areas.png",
  //       caption: "Additional areas",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "TextSelect",
  //   question: "How would you like your carpets/rugs to be cleaned?",
  //   required: true,
  //   options: [
  //     {
  //       caption: "Hoovered only",
  //     },
  //     {
  //       caption: "Professionally cleaned",
  //     },
  //     {
  //       caption: "I don't have carpets",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "TextSelect",
  //   question: "Are there any blinds, which would require dusting?",
  //   required: true,
  //   options: [
  //     {
  //       caption: "Yes",
  //     },
  //     {
  //       caption: "No",
  //     },
  //   ],
  // },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Frequency",
    question: "How often do you need cleaning?",
    required: true,
    placeholderText: "e.g weekly, bi-weekly, monthly, one-time."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Location",
    question: "Where is the cleaning needed?",
    required: true,
    placeholderText: "e.g full address including any specific instruction or access details."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Size of the Space",
    question: "What is the size of the area to be cleaned?",
    required: true,
    placeholderText: "e.g number of bedrooms, bathrooms, square footage."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Special Requests",
    question: "Are there any areas or tasks you want us to focus on?",
    required: true,
    placeholderText: "e.g particular rooms, appliances or surfaces"
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Pets",
    question: "Are there any pets in the household that our cleaners should be aware of?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Parking and Access",
    question: "Is there any parking available nearby?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    question: "Are there any parking access or restrictions or instructions for our cleaners?",
    required: true,
    placeholderText: ""
  },
];

export const officeCleaningQuestionaire: ServiceQuestionaire[] = [
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Please tell us about your office",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "house.png",
  //       caption: "Single",
  //     },
  //     {
  //       imageSrc: "flats.png",
  //       caption: "Double",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Which of the following applies to your property",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "kitchen-table.png",
  //       caption: "Combined kitchen/living",
  //     },
  //     {
  //       imageSrc: "kitchen2.png",
  //       caption: "Separated kitchen/living",
  //     },
  //     {
  //       imageSrc: "washing-machine.png",
  //       caption: "Utility room",
  //     },
  //     {
  //       imageSrc: "studyroom-office.png",
  //       caption: "Study room/office",
  //     },
  //     {
  //       imageSrc: "conservatory.png",
  //       caption: "Conservatory",
  //     },
  //     {
  //       imageSrc: "additional-areas.png",
  //       caption: "Additional areas",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "TextSelect",
  //   question: "How would you like your carpets/rugs to be cleaned?",
  //   required: true,
  //   options: [
  //     {
  //       caption: "Hoovered only",
  //     },
  //     {
  //       caption: "Professionally cleaned",
  //     },
  //     {
  //       caption: "I don't have carpets",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "TextSelect",
  //   question: "Are there any blinds, which would require dusting?",
  //   required: true,
  //   options: [
  //     {
  //       caption: "Yes",
  //     },
  //     {
  //       caption: "No",
  //     },
  //   ],
  // },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Frequency",
    question: "How often do you need cleaning?",
    required: true,
    placeholderText: "e.g weekly, bi-weekly, monthly, one-time."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Location",
    question: "Where is the cleaning needed?",
    required: true,
    placeholderText: "e.g full address including any specific instruction or access details."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Size of the Space",
    question: "What is the size of the area to be cleaned?",
    required: true,
    placeholderText: "e.g number of bedrooms, bathrooms, square footage."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Special Requests",
    question: "Are there any areas or tasks you want us to focus on?",
    required: true,
    placeholderText: "e.g particular rooms, appliances or surfaces"
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Pets",
    question: "Are there any pets in the household that our cleaners should be aware of?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Parking and Access",
    question: "Is there any parking available nearby?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    question: "Are there any parking access or restrictions or instructions for our cleaners?",
    required: true,
    placeholderText: ""
  },
];

export const regularCleaningQuestionaire: ServiceQuestionaire[] = [
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Please tell us about your office",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "house.png",
  //       caption: "Single",
  //     },
  //     {
  //       imageSrc: "flats.png",
  //       caption: "Double",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Which of the following applies to your property",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "kitchen-table.png",
  //       caption: "Combined kitchen/living",
  //     },
  //     {
  //       imageSrc: "kitchen2.png",
  //       caption: "Separated kitchen/living",
  //     },
  //     {
  //       imageSrc: "washing-machine.png",
  //       caption: "Utility room",
  //     },
  //     {
  //       imageSrc: "studyroom-office.png",
  //       caption: "Study room/office",
  //     },
  //     {
  //       imageSrc: "conservatory.png",
  //       caption: "Conservatory",
  //     },
  //     {
  //       imageSrc: "additional-areas.png",
  //       caption: "Additional areas",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "TextSelect",
  //   question: "How would you like your carpets/rugs to be cleaned?",
  //   required: true,
  //   options: [
  //     {
  //       caption: "Hoovered only",
  //     },
  //     {
  //       caption: "Professionally cleaned",
  //     },
  //     {
  //       caption: "I don't have carpets",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "TextSelect",
  //   question: "Are there any blinds, which would require dusting?",
  //   required: true,
  //   options: [
  //     {
  //       caption: "Yes",
  //     },
  //     {
  //       caption: "No",
  //     },
  //   ],
  // },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Frequency",
    question: "How often do you need cleaning?",
    required: true,
    placeholderText: "e.g weekly, bi-weekly, monthly, one-time."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Location",
    question: "Where is the cleaning needed?",
    required: true,
    placeholderText: "e.g full address including any specific instruction or access details."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Size of the Space",
    question: "What is the size of the area to be cleaned?",
    required: true,
    placeholderText: "e.g number of bedrooms, bathrooms, square footage."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Special Requests",
    question: "Are there any areas or tasks you want us to focus on?",
    required: true,
    placeholderText: "e.g particular rooms, appliances or surfaces"
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Pets",
    question: "Are there any pets in the household that our cleaners should be aware of?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Parking and Access",
    question: "Is there any parking available nearby?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    question: "Are there any parking access or restrictions or instructions for our cleaners?",
    required: true,
    placeholderText: ""
  },
];

export const specificAreaCleaningQuestionaire: ServiceQuestionaire[] = [
//   {
//     questionaireType: "ImageWithCaption",
//     question: "Please tell us about your office",
//     required: true,
//     options: [
//       {
//         imageSrc: "house.png",
//         caption: "Single",
//       },
//       {
//         imageSrc: "flats.png",
//         caption: "Double",
//       },
//     ],
//   },
//   {
//     questionaireType: "ImageWithCaption",
//     question: "Which of the following applies to your property",
//     required: true,
//     options: [
//       {
//         imageSrc: "kitchen-table.png",
//         caption: "Combined kitchen/living",
//       },
//       {
//         imageSrc: "kitchen2.png",
//         caption: "Separated kitchen/living",
//       },
//       {
//         imageSrc: "washing-machine.png",
//         caption: "Utility room",
//       },
//       {
//         imageSrc: "studyroom-office.png",
//         caption: "Study room/office",
//       },
//       {
//         imageSrc: "conservatory.png",
//         caption: "Conservatory",
//       },
//       {
//         imageSrc: "additional-areas.png",
//         caption: "Additional areas",
//       },
//     ],
//   },
//   {
//     questionaireType: "TextSelect",
//     question: "How would you like your carpets/rugs to be cleaned?",
//     required: true,
//     options: [
//       {
//         caption: "Hoovered only",
//       },
//       {
//         caption: "Professionally cleaned",
//       },
//       {
//         caption: "I don't have carpets",
//       },
//     ],
//   },
//   {
//     questionaireType: "TextSelect",
//     question: "Are there any blinds, which would require dusting?",
//     required: true,
//     options: [
//       {
//         caption: "Yes",
//       },
//       {
//         caption: "No",
//       },
//     ],
//   },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Frequency",
    question: "How often do you need cleaning?",
    required: true,
    placeholderText: "e.g weekly, bi-weekly, monthly, one-time."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Location",
    question: "Where is the cleaning needed?",
    required: true,
    placeholderText: "e.g full address including any specific instruction or access details."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Size of the Space",
    question: "What is the size of the area to be cleaned?",
    required: true,
    placeholderText: "e.g number of bedrooms, bathrooms, square footage."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Special Requests",
    question: "Are there any areas or tasks you want us to focus on?",
    required: true,
    placeholderText: "e.g particular rooms, appliances or surfaces"
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Pets",
    question: "Are there any pets in the household that our cleaners should be aware of?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Parking and Access",
    question: "Is there any parking available nearby?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    question: "Are there any parking access or restrictions or instructions for our cleaners?",
    required: true,
    placeholderText: ""
  },
];

export const moveInOutCleaningQuestionaire: ServiceQuestionaire[] = [
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Please tell us about your office",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "house.png",
  //       caption: "Single",
  //     },
  //     {
  //       imageSrc: "flats.png",
  //       caption: "Double",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Which of the following applies to your property",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "kitchen-table.png",
  //       caption: "Combined kitchen/living",
  //     },
  //     {
  //       imageSrc: "kitchen2.png",
  //       caption: "Separated kitchen/living",
  //     },
  //     {
  //       imageSrc: "washing-machine.png",
  //       caption: "Utility room",
  //     },
  //     {
  //       imageSrc: "studyroom-office.png",
  //       caption: "Study room/office",
  //     },
  //     {
  //       imageSrc: "conservatory.png",
  //       caption: "Conservatory",
  //     },
  //     {
  //       imageSrc: "additional-areas.png",
  //       caption: "Additional areas",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "TextSelect",
  //   question: "How would you like your carpets/rugs to be cleaned?",
  //   required: true,
  //   options: [
  //     {
  //       caption: "Hoovered only",
  //     },
  //     {
  //       caption: "Professionally cleaned",
  //     },
  //     {
  //       caption: "I don't have carpets",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "TextSelect",
  //   question: "Are there any blinds, which would require dusting?",
  //   required: true,
  //   options: [
  //     {
  //       caption: "Yes",
  //     },
  //     {
  //       caption: "No",
  //     },
  //   ],
  // },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Frequency",
    question: "How often do you need cleaning?",
    required: true,
    placeholderText: "e.g weekly, bi-weekly, monthly, one-time."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Location",
    question: "Where is the cleaning needed?",
    required: true,
    placeholderText: "e.g full address including any specific instruction or access details."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Size of the Space",
    question: "What is the size of the area to be cleaned?",
    required: true,
    placeholderText: "e.g number of bedrooms, bathrooms, square footage."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Special Requests",
    question: "Are there any areas or tasks you want us to focus on?",
    required: true,
    placeholderText: "e.g particular rooms, appliances or surfaces"
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Pets",
    question: "Are there any pets in the household that our cleaners should be aware of?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Parking and Access",
    question: "Is there any parking available nearby?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    question: "Are there any parking access or restrictions or instructions for our cleaners?",
    required: true,
    placeholderText: ""
  },
];



export const standardCleaningQuestionaire: ServiceQuestionaire[] = [
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Please tell us about your place standard",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "house.png",
  //       caption: "Single",
  //     },
  //     {
  //       imageSrc: "flats.png",
  //       caption: "Double",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Which of the following applies to your property",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "kitchen-table.png",
  //       caption: "Combined kitchen/living",
  //     },
  //     {
  //       imageSrc: "kitchen2.png",
  //       caption: "Separated kitchen/living",
  //     },
  //     {
  //       imageSrc: "washing-machine.png",
  //       caption: "Utility room",
  //     },
  //     {
  //       imageSrc: "studyroom-office.png",
  //       caption: "Study room/office",
  //     },
  //     {
  //       imageSrc: "conservatory.png",
  //       caption: "Conservatory",
  //     },
  //     {
  //       imageSrc: "additional-areas.png",
  //       caption: "Additional areas",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "TextSelect",
  //   question: "How would you like your carpets/rugs to be cleaned?",
  //   required: true,
  //   options: [
  //     {
  //       caption: "Hoovered only",
  //     },
  //     {
  //       caption: "Professionally cleaned",
  //     },
  //     {
  //       caption: "I don't have carpets",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "TextSelect",
  //   question: "Are there any blinds, which would require dusting?",
  //   required: true,
  //   options: [
  //     {
  //       caption: "Yes",
  //     },
  //     {
  //       caption: "No",
  //     },
  //   ],
  // },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Frequency",
    question: "How often do you need cleaning?",
    required: true,
    placeholderText: "e.g weekly, bi-weekly, monthly, one-time."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Location",
    question: "Where is the cleaning needed?",
    required: true,
    placeholderText: "e.g full address including any specific instruction or access details."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Size of the Space",
    question: "What is the size of the area to be cleaned?",
    required: true,
    placeholderText: "e.g number of bedrooms, bathrooms, square footage."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Special Requests",
    question: "Are there any areas or tasks you want us to focus on?",
    required: true,
    placeholderText: "e.g particular rooms, appliances or surfaces"
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Pets",
    question: "Are there any pets in the household that our cleaners should be aware of?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Parking and Access",
    question: "Is there any parking available nearby?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    question: "Are there any parking access or restrictions or instructions for our cleaners?",
    required: true,
    placeholderText: ""
  },
];


export const deepCleaningQuestionaire: ServiceQuestionaire[] = [
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Please tell us about your place deep clean",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "house.png",
  //       caption: "Single",
  //     },
  //     {
  //       imageSrc: "flats.png",
  //       caption: "Double",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Which of the following applies to your property",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "kitchen-table.png",
  //       caption: "Combined kitchen/living",
  //     },
  //     {
  //       imageSrc: "kitchen2.png",
  //       caption: "Separated kitchen/living",
  //     },
  //     {
  //       imageSrc: "washing-machine.png",
  //       caption: "Utility room",
  //     },
  //     {
  //       imageSrc: "studyroom-office.png",
  //       caption: "Study room/office",
  //     },
  //     {
  //       imageSrc: "conservatory.png",
  //       caption: "Conservatory",
  //     },
  //     {
  //       imageSrc: "additional-areas.png",
  //       caption: "Additional areas",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "TextSelect",
  //   question: "How would you like your carpets/rugs to be cleaned?",
  //   required: true,
  //   options: [
  //     {
  //       caption: "Hoovered only",
  //     },
  //     {
  //       caption: "Professionally cleaned",
  //     },
  //     {
  //       caption: "I don't have carpets",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "TextSelect",
  //   question: "Are there any blinds, which would require dusting?",
  //   required: true,
  //   options: [
  //     {
  //       caption: "Yes",
  //     },
  //     {
  //       caption: "No",
  //     },
  //   ],
  // },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Frequency",
    question: "How often do you need cleaning?",
    required: true,
    placeholderText: "e.g weekly, bi-weekly, monthly, one-time."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Location",
    question: "Where is the cleaning needed?",
    required: true,
    placeholderText: "e.g full address including any specific instruction or access details."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Size of the Space",
    question: "What is the size of the area to be cleaned?",
    required: true,
    placeholderText: "e.g number of bedrooms, bathrooms, square footage."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Special Requests",
    question: "Are there any areas or tasks you want us to focus on?",
    required: true,
    placeholderText: "e.g particular rooms, appliances or surfaces"
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Pets",
    question: "Are there any pets in the household that our cleaners should be aware of?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Parking and Access",
    question: "Is there any parking available nearby?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    question: "Are there any parking access or restrictions or instructions for our cleaners?",
    required: true,
    placeholderText: ""
  },
];

export const carpetOrRugCleaningServiceQuestionaire: ServiceQuestionaire[] = [
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Which areas need carpet cleaning",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "bedroom.png",
  //       caption: "Bedroom",
  //     },
  //     {
  //       imageSrc: "living-room.png",
  //       caption: "Living room",
  //     },
  //     {
  //       imageSrc: "diningroom.png",
  //       caption: "Dining room",
  //     },
  //     {
  //       imageSrc: "hallway.png",
  //       caption: "Hallway",
  //     },
  //     {
  //       imageSrc: "staircase.png",
  //       caption: "Staircase",
  //     },
  //     {
  //       imageSrc: "landing.png",
  //       caption: "Landing",
  //     },
  //   ],
  // },

  // {
  //   questionaireType: "ImageWithLongCaption",
  //   question: "If there are any rugs to be cleaned, please select below",
  //   required: false,
  //   options: [
  //     {
  //       imageSrc: "smallrug.png",
  //       caption: "Small / up to 4sq.m",
  //     },
  //     {
  //       imageSrc: "medium-rug.png",
  //       caption: "Medium / up to 8sq.m",
  //     },
  //     {
  //       imageSrc: "large-rug.png",
  //       caption: "Large / up to 15sq.m",
  //     },
  //   ],
  // },
  // {
  //   questionaireType: "TextSelect",
  //   question: "What fibres are your carpets/rugs made of?",
  //   required: false,
  //   options: [
  //     {
  //       caption: "Standard / fabric, synthetic, etc",
  //     },
  //     {
  //       caption: "Delicate / wool, cotton, etc",
  //     },
  //   ],
  // },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Frequency",
    question: "How often do you need cleaning?",
    required: true,
    placeholderText: "e.g weekly, bi-weekly, monthly, one-time."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Location",
    question: "Where is the cleaning needed?",
    required: true,
    placeholderText: "e.g full address including any specific instruction or access details."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Size of the Space",
    question: "What is the size of the area to be cleaned?",
    required: true,
    placeholderText: "e.g number of bedrooms, bathrooms, square footage."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Special Requests",
    question: "Are there any areas or tasks you want us to focus on?",
    required: true,
    placeholderText: "e.g particular rooms, appliances or surfaces"
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Pets",
    question: "Are there any pets in the household that our cleaners should be aware of?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Parking and Access",
    question: "Is there any parking available nearby?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    question: "Are there any parking access or restrictions or instructions for our cleaners?",
    required: true,
    placeholderText: ""
  },
];

export const windowCleaningServiceQuestionaire: ServiceQuestionaire[] = [
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Please tell us about your place",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "flats1.png",
  //       caption: "Flat",
  //     },
  //     {
  //       imageSrc: "terraced-house.png",
  //       caption: "Terraced House",
  //     },
  //     {
  //       imageSrc: "semi-detached-house.png",
  //       caption: "Semi detached",
  //     },
  //     {
  //       imageSrc: "detached-house.png",
  //       caption: "Detached House",
  //     },
  //   ],
  // },

  {
    questionaireType: "TextSelect",
    question: "Which sides of the windows should we clean",
    required: true,
    options: [
      {
        caption: "Inside",
      },
      {
        caption: "Outside",
      },
      {
        caption: "Inside and Outside",
      },
    ],
  },
  {
    questionaireType: "UserInput",
    inputType: "number",
    question: "How many windows do you have?",
    required: true,
  },
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "Would you also like us to clean",
  //   required: false,
  //   options: [
  //     {
  //       imageSrc: "conservatory.png",
  //       caption: "Conservatory",
  //     },
  //     {
  //       imageSrc: "glass-roof.png",
  //       caption: "Glass roof",
  //     },
  //     {
  //       imageSrc: "skylight-window.png",
  //       caption: "Skylight",
  //     },
  //   ],
  // },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Frequency",
    question: "How often do you need cleaning?",
    required: true,
    placeholderText: "e.g weekly, bi-weekly, monthly, one-time."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Location",
    question: "Where is the cleaning needed?",
    required: true,
    placeholderText: "e.g full address including any specific instruction or access details."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Size of the Space",
    question: "What is the size of the area to be cleaned?",
    required: true,
    placeholderText: "e.g number of bedrooms, bathrooms, square footage."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Special Requests",
    question: "Are there any areas or tasks you want us to focus on?",
    required: true,
    placeholderText: "e.g particular rooms, appliances or surfaces"
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Pets",
    question: "Are there any pets in the household that our cleaners should be aware of?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Parking and Access",
    question: "Is there any parking available nearby?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    question: "Are there any parking access or restrictions or instructions for our cleaners?",
    required: true,
    placeholderText: ""
  },
];


export const ovencleaningServiceQuestionaire: ServiceQuestionaire[] = [
  {
    questionaireType: "ImageWithCaption",
    question: "What type is your oven/cooker?",
    required: true,
    options: [
      {
        imageSrc: "oven4.png",
        caption: "Single",
      },
      {
        imageSrc: "oven5.png",
        caption: "Double",
      },
      {
        imageSrc: "range-cooker-oven.png",
        caption: "Range cooker",
      },
      {
        imageSrc: "aga-cooker.png",
        caption: "AGA oven",
      },
    ],
  },
  {
    questionaireType: "ImageWithCaption",
    question: "Would you like to add any of the following:",
    required: true,
    options: [
      {
        imageSrc: "hob.png",
        caption: "Hobs",
      },
      {
        imageSrc: "tiles.png",
        caption: "Splashback",
      },
      {
        imageSrc: "extractor.png",
        caption: "Extractor",
      },
      {
        imageSrc: "oven3.png",
        caption: "Oven only",
      },
    ],
  },
  // {
  //   questionaireType: "ImageWithCaption",
  //   question: "For a spotless kitchen we also recommend/add:",
  //   required: true,
  //   options: [
  //     {
  //       imageSrc: "oven3.png",
  //       caption: "Fridge",
  //     },
  //     {
  //       imageSrc: "oven3.png",
  //       caption: "Microwave",
  //     },
  //     {
  //       imageSrc: "oven3.png",
  //       caption: "Washing machine",
  //     },
  //     {
  //       imageSrc: "oven3.png",
  //       caption: "Dishwasher",
  //     },
  //   ],
  // },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Frequency",
    question: "How often do you need cleaning?",
    required: true,
    placeholderText: "e.g weekly, bi-weekly, monthly, one-time."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Location",
    question: "Where is the cleaning needed?",
    required: true,
    placeholderText: "e.g full address including any specific instruction or access details."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Size of the Space",
    question: "What is the size of the area to be cleaned?",
    required: true,
    placeholderText: "e.g number of bedrooms, bathrooms, square footage."
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Special Requests",
    question: "Are there any areas or tasks you want us to focus on?",
    required: true,
    placeholderText: "e.g particular rooms, appliances or surfaces"
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Pets",
    question: "Are there any pets in the household that our cleaners should be aware of?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    titleText: "Parking and Access",
    question: "Is there any parking available nearby?",
    required: true,
    placeholderText: ""
  },
  {
    questionaireType: "UserInput",
    inputType: "string",
    question: "Are there any parking access or restrictions or instructions for our cleaners?",
    required: true,
    placeholderText: ""
  },
];
