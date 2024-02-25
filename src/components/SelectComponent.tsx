import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, FC, SetStateAction } from "react";

export type SelectItem = {
  value: string;
  name: string;
};

interface SelectProps {
  placeholder: string;
  label: string;
  itemsToSelect: SelectItem[];
  onValueChange: Dispatch<SetStateAction<string>>
}

const SelectComponent: FC<SelectProps> = ({
  placeholder,
  label,
  itemsToSelect,
  onValueChange,
  ...props
}) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="max-w-[230px]">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>

          {itemsToSelect.map((item, index) => {
            return (
              <SelectItem key={item.name + index} value={item.value}>
                {item.name}
              </SelectItem>
            );
          })}

          
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectComponent;
