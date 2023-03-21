import { Alert, AlertDialog, Button, HStack, Text, Toast } from "native-base";
import { FC, useRef } from "react";
import { Linking } from "react-native";
import {
  CustomAlertDialogProps,
  CustomAlertProps,
  LoginAlertProps,
} from "./types";

export const CustomAlert: FC<CustomAlertProps> = ({ status, message }) => {
  const closeAllToasts = () => {
    Toast.closeAll();
  };
  return (
    <Alert
      onTouchEnd={closeAllToasts}
      maxW="300"
      variant="left-accent"
      status={status}
    >
      <HStack px="2" space="2" alignItems="center">
        <Alert.Icon size="md" />
        <Text textAlign="center" color="black">
          {message}
        </Text>
      </HStack>
    </Alert>
  );
};

export const showToast = (status: string, message: string) => {
  Toast.show({
    render: () => <CustomAlert status={status} message={message} />,
  });
};

export const CustomAlertDialog: FC<CustomAlertDialogProps> = ({
  isOpen,
  onClose,
  onPress,
  header,
  message,
  cancelText,
  confirmText,
  confirmColor,
}) => {
  const cancelRef = useRef(null);
  return (
    <AlertDialog
      closeOnOverlayClick
      leastDestructiveRef={cancelRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{header}</AlertDialog.Header>
        <AlertDialog.Body>{message}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="outline" colorScheme="coolGray" onPress={onClose}>
              {cancelText}
            </Button>
            <Button colorScheme={confirmColor} onPress={onPress}>
              {confirmText}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export const LoginAlert: FC<LoginAlertProps> = ({ isOpen, setIsOpen }) => {
  const onClose = () => {
    setIsOpen(false);
  };

  const onPress = async () => {
    try {
      await Linking.openURL(
        "https://play.google.com/store/apps/details?id=com.barbershop"
      );
    } catch (err) {
      showToast(
        "error",
        "There was some error opening the Link. Please install the app manually from your App store"
      );
    }
    onClose();
  };
  return (
    <CustomAlertDialog
      isOpen={isOpen}
      onClose={onClose}
      onPress={onPress}
      header="Alert!"
      message="Seems you are trying to login using a client account. Please install the client app of Barbershop to continue or Register with a new account if you want to continue to Services App."
      cancelText="cancel"
      confirmText="Get Client App"
      confirmColor="success"
    />
  );
};
