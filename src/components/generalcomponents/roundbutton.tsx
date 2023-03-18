import { Button, Icon } from "native-base";
import { FC, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LogoutProps, RoundButtonProps } from "./types";
import { CustomAlertDialog } from "./alerts";

export const RoundButton: FC<LogoutProps & RoundButtonProps> = ({
  onPress,
  isLoading,
  icon,
  colorScheme,
  size = "md",
  buttonsize = 10,
  style
}) => (
  <Button
    style={style}
    isLoading={isLoading}
    onPress={onPress}
    colorScheme={colorScheme}
    rounded="full"
    size={buttonsize}
    startIcon={<Icon as={Ionicons} name={icon} size={size} />}
  />
);

export const LogoutButton: FC<LogoutProps> = ({
  onPress,
  isLoading,
  logoutall = false,
}) => {
  let [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const openDialog = () => {
    setIsOpen(true);
  };

  const confirm = () => {
    onPress();
    onClose();
  };

  return (
    <>
      <RoundButton
        onPress={openDialog}
        isLoading={isLoading}
        colorScheme="rose"
        icon="exit-outline"
      />

      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onPress={confirm}
        header="Are you sure?"
        message={`Are you sure to Logout${
          logoutall
            ? " from all devices (If you have logged in on multiple devices, it will log you out from all of them)"
            : ""
        }?`}
        cancelText="Cancel"
        confirmText="Logout"
        confirmColor="danger"
      />
    </>
  );
};
