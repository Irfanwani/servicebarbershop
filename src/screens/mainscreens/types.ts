import { DrawerScreenProps } from "@react-navigation/drawer";

export type DrawerProps = {
  appointments: undefined;
  profile: undefined;
  settings: undefined;
};

export type SettingsProps = DrawerScreenProps<DrawerProps, "settings">;
