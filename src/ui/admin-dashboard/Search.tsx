"use cient";

import InputElement from "@/components/Input";
import {
  SearchUiPayload,
  SearchUiPayloadName,
  SearchUiSetStateSignature,
} from "@/components/admin-dashboard/types";
import { Button } from "@/components/ui/button";
import { filterSearchData } from "@/helpers/filterData";

import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchUiProps {
  setSearchResults: SearchUiSetStateSignature;
  dataName: SearchUiPayloadName;
  dataToBeSearched: SearchUiPayload;
  onSearch?: Function;
  onClearSearchResults?: Function;
  placeholder?: string
}

const SearchUi = ({
  setSearchResults,
  dataName,
  dataToBeSearched,
  onSearch,
  onClearSearchResults,
  placeholder
}: SearchUiProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSearched, setIsSearched] = useState<boolean>(false);

  return (
    <div className="w-full">
      <div className="border-2 rounded-md flex justify-begin h-10">
        <div className="flex items-center w-full">
          <InputElement
            className="ring-0 border-none p-0 w-full pl-2"
            size={50}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            placeholder={placeholder ? placeholder : ""}
          />
        </div>
        <div
          className="text-slate-600 flex items-center justify-center px-3 hover:cursor-pointer hover:bg-slate-300"
          onClick={() => {
            console.log(
              "filtered data is ",
              filterSearchData(dataName, dataToBeSearched, searchTerm)
            );

            setIsSearched(true);

            // update search results state to data from filterSearchData function
            setSearchResults(
              filterSearchData(dataName, dataToBeSearched, searchTerm)
            );

            // call the onSearh function passed in
            onSearch && onSearch();
          }}
        >
          <Search strokeWidth={1.5} size={18} />
        </div>
        {/* implement a cancel search button that runs onClearSearchResults function when Clicked */}
        <div className="text-slate-700">
          <Button
            variant={"outline"}
            className="rounded-none border-none p-3 hover:bg-slate-300"
            onClick={() => {
              setIsSearched(false);
              setSearchResults([]);
              setSearchTerm("");
              onClearSearchResults && onClearSearchResults();
            }}
          >
            <X strokeWidth={1.5} size={19} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchUi;
