import {
  ColorSchemeType,
  ColorType,
  SizeType,
} from "native-base/lib/typescript/components/types";
import { Dispatch, ReactElement, SetStateAction } from "react";
import { StyleProp, ViewStyle, PressableStateCallbackType } from "react-native";

export type ErrorProps = {
  error: string;
};

export type CustomAlertProps = {
  status: string;
  message: string;
};

export type LogoutProps = {
  onPress: () => Promise<void> | void;
  isLoading?: boolean;
  logoutall?: boolean;
};
export type RoundButtonProps = {
  icon: string;
  colorScheme: ColorSchemeType;
  size?: SizeType;
  buttonsize?: SizeType;
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>);
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
  onPress?: (val?: boolean) => void | Promise<void>;
  bg: ColorType;
  value?: boolean;
  isSwitch?: boolean;
  CustomComponent?: () => ReactElement;
};

export type DeleteProps = {
  id: number;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export type TransitionProps = {
  loading: boolean;
};
