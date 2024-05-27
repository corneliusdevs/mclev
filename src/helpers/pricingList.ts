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
    service: "Carpet cleaning",
    prices: [
      {
        detail: "1 bedroom",
        price: 23,
      },
      {
        detail: "2 bedroom",
        price: 32,
      },
      {
        detail: "3 bedroom",
        price: 34,
      },
    ],
  },{
    service: "Rug cleaning",
    prices: [
      {
        detail: "1 bedroom",
        price: 23,
      },
      {
        detail: "2 bedroom",
        price: 32,
      },
      {
        detail: "3 bedroom",
        price: 34,
      },
    ],
  },{
    service: "End Of Tenancy cleaning",
    prices: [
      {
        detail: "1 bedroom",
        price: 23,
      },
      {
        detail: "2 bedroom",
        price: 32,
      },
      {
        detail: "3 bedroom",
        price: 34,
      },
    ],
  },{
    service: "Uphostery cleaning",
    prices: [
      {
        detail: "1 bedroom",
        price: 23,
      },
      {
        detail: "2 bedroom",
        price: 32,
      },
      {
        detail: "3 bedroom",
        price: 34,
      },
    ],
  },
  {
    service: "Antiviral sanitation",
    prices: [
      {
        detail: "1 bedroom",
        price: 23,
      },
      {
        detail: "2 bedroom",
        price: 32,
      },
      {
        detail: "3 bedroom",
        price: 34,
      },
    ],
  },
];
