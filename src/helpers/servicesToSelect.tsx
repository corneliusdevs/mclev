import { SelectItem } from "@/components/SelectComponent";

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
    "name": "Uphostery Cleaning",
    "value": "uphosteryCleaning",
  },
  {
    "name": "Window Cleaning",
    "value": "windowCleaning",
  },
  {
    "name": "Oven Cleaning",
    "value": "ovenCleaning",
  },
  // {
  //   "name": "One off Cleaning",
  //   "value": "oneOffCleaning",
  // },
  // {
  //   "name": "Regular / Fortnightly Cleaning",
  //   "value": "regularFortnightlyCleaning",
  // },
  // {
  //   "name": "Office Cleaning",
  //   "value": "officeCleaning",
  // },

  // {
  //   "name": "After Builders Cleaning",
  //   "value": "afterBuildersCleaning",
  // },
  // {
  //   "name": "Mattress Cleaning",
  //   "value": "mattressCleaning",
  // },
  // {
  //   "name": "Sofa Cleaning",
  //   "value": "sofaCleaaning",
  // },
];


interface servicesToSelectLookupType {
  [index: string] : string
}

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
  required?: boolean;
  options?: ServiceQuestionaireOptions[];
};

export const antiviralServiceQuestionaire: ServiceQuestionaire[] = [
  {
    questionaireType: "ImageWithCaption",
    question: "Please tell us about your place",
    required: true,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Studio",
      },
      {
        imageSrc: "oven3.png",
        caption: "House/Flat",
      },
    ],
  },
];

export const endofTenancyCleaningQuestionaire: ServiceQuestionaire[] = [
  {
    questionaireType: "ImageWithCaption",
    question: "Please tell us about your place",
    required: true,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Single",
      },
      {
        imageSrc: "oven3.png",
        caption: "Double",
      },
    ],
  },
  {
    questionaireType: "ImageWithCaption",
    question: "Which of the following apply to your property",
    required: true,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Combined kitchen/living",
      },
      {
        imageSrc: "oven3.png",
        caption: "Separated kitchen/living",
      },
      {
        imageSrc: "oven3.png",
        caption: "Utility room",
      },
      {
        imageSrc: "oven3.png",
        caption: "Study room/office",
      },
      {
        imageSrc: "oven3.png",
        caption: "Conservatory",
      },
      {
        imageSrc: "oven3.png",
        caption: "Additional areas",
      },
    ],
  },
  {
    questionaireType: "TextSelect",
    question: "How would you like your carpets/rugs to be cleaned?",
    required: true,
    options: [
      {
        caption: "Hoovered only",
      },
      {
        caption: "Professionally cleaned",
      },
      {
        caption: "I don't have carpets",
      },
    ],
  },
  {
    questionaireType: "TextSelect",
    question: "Are there any blinds, which would require dusting?",
    required: true,
    options: [
      {
        caption: "Yes",
      },
      {
        caption: "No",
      },
    ],
  },
  {
    questionaireType: "ImageWithCaption",
    question: "Would you like any uphostery to be cleaned?",
    required: false,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Sofa",
      },
      {
        imageSrc: "oven3.png",
        caption: "Armchair",
      },
      {
        imageSrc: "oven3.png",
        caption: "Mattress",
      },
      {
        imageSrc: "oven3.png",
        caption: "Curtains",
      },
    ],
  },
  {
    questionaireType: "ImageWithCaption",
    question: "Most of our clients who book end of tenancy cleaning also add",
    required: false,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Window cleaning",
      },
      {
        imageSrc: "oven3.png",
        caption: "Balcony Cleaning",
      },
      {
        imageSrc: "oven3.png",
        caption: "Garage Cleaning",
      },
    ],
  },
];

export const carpetOrRugCleaningServiceQuestionaire: ServiceQuestionaire[] = [
  {
    questionaireType: "ImageWithCaption",
    question: "Which areas need carpet cleaning",
    required: true,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Bedroom",
      },
      {
        imageSrc: "oven3.png",
        caption: "Living room",
      },
      {
        imageSrc: "oven3.png",
        caption: "Dining room",
      },
      {
        imageSrc: "oven3.png",
        caption: "Hallway",
      },
      {
        imageSrc: "oven3.png",
        caption: "Staircase",
      },
      {
        imageSrc: "oven3.png",
        caption: "Landing",
      },
    ],
  },

  {
    questionaireType: "ImageWithLongCaption",
    question: "If there are any rugs to be cleaned, please select below",
    required: false,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Small / up to 4sq.m",
      },
      {
        imageSrc: "oven3.png",
        caption: "Medium / up to 8sq.m",
      },
      {
        imageSrc: "oven3.png",
        caption: "Large / up to 15sq.m",
      },
    ],
  },
  {
    questionaireType: "TextSelect",
    question: "What fibres are your carpets/rugs made of?",
    required: false,
    options: [
      {
        caption: "Standard / fabric, synthetic, etc",
      },
      {
        caption: "Delicate / wool, cotton, etc",
      },
    ],
  },
  {
    questionaireType: "ImageWithCaption",
    question: "Most of our clients who book carpet cleaning also add:",
    required: true,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Window Cleaning",
      },
      {
        imageSrc: "oven3.png",
        caption: "Carpet Cleaning",
      },
      {
        imageSrc: "oven3.png",
        caption: "Uphostery Cleaning",
      },
      {
        imageSrc: "oven3.png",
        caption: "One off Cleaning",
      },
    ],
  },
];

export const windowCleaningServiceQuestionaire: ServiceQuestionaire[] = [
  {
    questionaireType: "ImageWithCaption",
    question: "Please tell us about your place",
    required: true,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Flat",
      },
      {
        imageSrc: "oven3.png",
        caption: "Terraced House",
      },
      {
        imageSrc: "oven3.png",
        caption: "Semi detached",
      },
      {
        imageSrc: "oven3.png",
        caption: "Detached House",
      },
    ],
  },

  {
    questionaireType: "TextSelect",
    question: "Which sides of the windows should we clean",
    required: true,
    options: [
      {
        caption: "Inside",
      },
      {
        imageSrc: "oven3.png",
        caption: "Outside",
      },
      {
        imageSrc: "oven3.png",
        caption: "Inside and Outside",
      },
    ],
  },
  {
    questionaireType: "UserInput",
    question: "How many windows do you have?",
    required: true,
  },
  {
    questionaireType: "ImageWithCaption",
    question: "Would you also like us to clean",
    required: false,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Conservatory",
      },
      {
        imageSrc: "oven3.png",
        caption: "Glass roof",
      },
      {
        imageSrc: "oven3.png",
        caption: "Skylight",
      },
    ],
  },
  {
    questionaireType: "ImageWithCaption",
    question: "Most of our clients who book window cleaning also add:",
    required: true,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Window Cleaning",
      },
      {
        imageSrc: "oven3.png",
        caption: "Carpet Cleaning",
      },
      {
        imageSrc: "oven3.png",
        caption: "Uphostery Cleaning",
      },
      {
        imageSrc: "oven3.png",
        caption: "One off Cleaning",
      },
    ],
  },

];


export const uphosteryCleaningServiceQuestionaire: ServiceQuestionaire[] = [
  {
    questionaireType: "ImageWithCaption",
    question: "What kind of Sofas/Chairs would you like cleaned?",
    required: true,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Dining chair",
      },
      {
        imageSrc: "oven3.png",
        caption: "Arm chair",
      },
      {
        imageSrc: "oven3.png",
        caption: "Two seater",
      },
      {
        imageSrc: "oven3.png",
        caption: "Three seater",
      },
      {
        imageSrc: "oven3.png",
        caption: "Four seater",
      },
      {
        imageSrc: "oven3.png",
        caption: "Five seater",
      },
    ],
  },
  {
    questionaireType: "TextSelect",
    question: "What kind of materials are your items?",
    required: true,
    options: [
      {
        caption: "Fabric",
      },
      {
        caption: "Velvet",
      },
      {
        caption: "Delicate",
      },
      {
        caption: "Other",
      },
    ],
  },
  {
    questionaireType: "ImageWithCaption",
    question: "Would you like to add matress cleaning?",
    required: false,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Single",
      },
      {
        imageSrc: "oven3.png",
        caption: "Double",
      },
      {
        imageSrc: "oven3.png",
        caption: "King size",
      },
    ],
  },
  {
    questionaireType: "ImageWithCaption",
    question: "Would you like to add curtain cleaning?",
    required: false,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Half length",
      },
      {
        imageSrc: "oven3.png",
        caption: "Full length",
      },
    ],
  },
  {
    questionaireType: "ImageWithCaption",
    question: "Most of our clients who book uphostery cleaning also add:",
    required: true,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Oven Cleaning",
      },
      {
        imageSrc: "oven3.png",
        caption: "Carpet Cleaning",
      },
      {
        imageSrc: "oven3.png",
        caption: "One off Cleaning",
      },
      {
        imageSrc: "oven3.png",
        caption: "window Cleaning",
      },
    ],
  },
];

export const ovencleaningServiceQuestionaire: ServiceQuestionaire[] = [
  {
    questionaireType: "ImageWithCaption",
    question: "What type is your oven/cooker?",
    required: true,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Single",
      },
      {
        imageSrc: "oven3.png",
        caption: "Double",
      },
      {
        imageSrc: "oven3.png",
        caption: "Range cooker",
      },
      {
        imageSrc: "oven3.png",
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
        imageSrc: "oven3.png",
        caption: "Hobs",
      },
      {
        imageSrc: "oven3.png",
        caption: "Splashback",
      },
      {
        imageSrc: "oven3.png",
        caption: "Extractor",
      },
      {
        imageSrc: "oven3.png",
        caption: "Oven only",
      },
    ],
  },
  {
    questionaireType: "ImageWithCaption",
    question: "For a spotless kitchen we also recommend/add:",
    required: true,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Fridge",
      },
      {
        imageSrc: "oven3.png",
        caption: "Microwave",
      },
      {
        imageSrc: "oven3.png",
        caption: "Washing machine",
      },
      {
        imageSrc: "oven3.png",
        caption: "Dishwasher",
      },
    ],
  },
  {
    questionaireType: "ImageWithCaption",
    question: "Most of our clients who book oven cleaning also add:",
    required: true,
    options: [
      {
        imageSrc: "oven3.png",
        caption: "Window Cleaning",
      },
      {
        imageSrc: "oven3.png",
        caption: "Carpet Cleaning",
      },
      {
        imageSrc: "oven3.png",
        caption: "Uphostery Cleaning",
      },
      {
        imageSrc: "oven3.png",
        caption: "One off Cleaning",
      },
    ],
  },
];
