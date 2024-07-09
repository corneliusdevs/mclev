export type price = {
  detail: string;
  price: number;
};

export type Pricing = {
  service: string;
  prices: price[];
};

export type PricingList = Pricing[];

export const pricings: PricingList = [
  {
    service: "Antiviral sanitation",
    prices: [
      {
        detail: "Cleaning service from",
        price: 15,
      },
    ],
  },
  {
    service: "Oven cleaning",
    prices: [
      {
        detail: "Cleaning service from",
        price: 15,
      },
    ],
  },
  {
    service: "Office cleaning",
    prices: [
      {
        detail: "Cleaning service from",
        price: 15,
      },
    ],
  },
  {
    service: "Window cleaning",
    prices: [
      {
        detail: "Cleaning service from",
        price: 15,
      },
    ],
  },
  {
    service: "Domestic cleaning",
    prices: [
      {
        detail: "Cleaning service from",
        price: 15,
      },
    ],
  },
  {
    service: "End Of Tenancy cleaning",
    prices: [
      {
        detail: "Cleaning service from",
        price: 15,
      },
    ],
  },
  {
    service: "Deep cleaning",
    prices: [
      {
        detail: "Cleaning service from",
        price: 15,
      },
    ],
  },
  {
    service: "Standard cleaning",
    prices: [
      {
        detail: "Cleaning service from",
        price: 15,
      },
    ],
  },
  {
    service: "Regular cleaning",
    prices: [
      {
        detail: "Cleaning service from",
        price: 15,
      },
    ],
  },
  {
    service: "Move-in/out cleaning",
    prices: [
      {
        detail: "Cleaning service from",
        price: 15,
      },
    ],
  },
  {
    service: "Specific Area cleaning",
    prices: [
      {
        detail: "Cleaning service from",
        price: 15,
      },
    ],
  },
];
