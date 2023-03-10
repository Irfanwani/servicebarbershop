import { LatLng, Region } from "react-native-maps";

export type SheetProps = {
  isOpen: boolean;
  onClose: () => void;
  firstIconCallback: () => Promise<void> | void;
  secondIconCallback: () => void | Promise<void>;
  thirdIconCallback: () => void;
  icon1: string;
  icon2: string;
  icon3: string;
  loading?: boolean;
};

export type MapSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  location: Region;
  selectLocation: (coords: LatLng) => Promise<void>;
};

export type DropdownProps = {
  value: string;
  onValueChange: (item: string) => void;
  items: Array<BusinessItemType>;
  placeholder: string;
};

export type BusinessItemType = {
  label: string;
  value: string;
};
