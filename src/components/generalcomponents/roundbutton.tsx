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
}) => (
  <Button
    isLoading={isLoading}
    onPress={onPress}
    colorScheme={colorScheme}
    rounded="full"
    width="10"
    h="10"
    startIcon={<Icon as={Ionicons} name={icon} size="md" />}
  />
);

// have an alertDialog to show for conirmation

export const LogoutButton: FC<LogoutProps> = ({ onPress, isLoading }) => {
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
        isLoading={false}
        colorScheme="rose"
        icon="exit-outline"
      />

      <CustomAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        onPress={confirm}
        header="Are you sure?"
        message="Are you sure to Logout?"
        cancelText="Cancel"
        confirmText="Logout"
        confirmColor="danger"
      />
    </>
  );
};
