import { Select } from "native-base";
import { FC } from "react";
import { DropdownProps } from "./types";

export const CustomSelect: FC<DropdownProps> = ({
  value,
  onValueChange,
  items,
  placeholder
}) => {
  return (
    <Select placeholder={placeholder} selectedValue={value} onValueChange={onValueChange}>
      {items.map((item, index) => (
        <Select.Item key={index} label={item.label} value={item.value} />
      ))}
    </Select>
  );
};
