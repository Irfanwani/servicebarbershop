import { DrawerScreenProps } from "@react-navigation/drawer";

export type DrawerProps = {
  appointments: undefined;
  profile: undefined;
  services: undefined;
  settings: undefined;
  addservices: undefined;
  ratings: undefined;
};

export type SettingsProps = DrawerScreenProps<DrawerProps, "settings">;

export type serviceType = {
  id: number;
  cost: number;
  service: string;
};

export type RheaderType = {
  numreviews: number;
  rating: number;
};
