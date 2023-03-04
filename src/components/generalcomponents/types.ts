import {
  ColorSchemeType,
  ColorType,
} from "native-base/lib/typescript/components/types";

export type ErrorProps = {
  error: string;
};

export type CustomAlertProps = {
  status: string;
  message: string;
};

export type LogoutProps = {
  onPress: () => Promise<void> | void;
  isLoading: boolean;
};
export type RoundButtonProps = {
  icon: string;
  colorScheme: string;
};

export type CustomAlertDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onPress: () => void;
  header: string;
  message: string;
  cancelText: string;
  confirmText: string;
  confirmColor: ColorSchemeType;
};

export type SettingItemType = {
  icon: string;
  title: string;
  onPress: (val: boolean) => void | Promise<void>;
  bg: ColorType;
  value: boolean;
};
