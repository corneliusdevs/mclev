"use client";

import { Pricing } from "@/helpers/pricingList";
import { ChevronsDown, ChevronsRight } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface PricingCollapsibleProps {
  details: Pricing;
}

const PricingCollapsible = ({ details }: PricingCollapsibleProps) => {
  const [expandPriceList, setExpandPriceList] = useState<boolean>(false);

  return (
    <div
      className="w-full border-[1px] border-footergray/40 transition duration-[2000ms] ease-in-out"
      onClick={() => {
        setExpandPriceList((val) => {
          return !val;
        });
      }}
    >
      <div className="flex border-l-2 p-4 border-secondarycol w-full justify-between hover:bg-homegray hover:cursor-pointer">
        <div className="font-bold text-black/80">{details.service}</div>
        <div>{expandPriceList ? <ChevronsDown /> : <ChevronsRight />}</div>
      </div>
      <div
        className={`${
          !expandPriceList && "hidden"
        } text-[15px] p-2 flex flex-col justify-center`}
      >
        {details.prices.map((price) => {
          return (
            <div
              key={price.detail + price.price + "iuytre"}
              className="flex px-2 border-[1px] border-footergray/40"
            >
              <div className="mr-4">{price.detail}</div>
              <div className="text-red-500">&#xA3;{price.price}</div>
            </div>
          );
        })}
        <div className="flex pt-4 justify-center items-center">
          <Link href={"/book-a-cleaner"}>
            <Button className="bg-secondarycol text-white hover:text-black" variant={"outline"}>
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingCollapsible;
