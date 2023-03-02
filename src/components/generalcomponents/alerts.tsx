import { Alert, AlertDialog, Button, HStack, Text, Toast } from "native-base";
import { FC, useRef } from "react";
import { CustomAlertDialogProps, CustomAlertProps } from "./types";

export const CustomAlert: FC<CustomAlertProps> = ({ status, message }) => {
  const closeAllToasts = () => {
    Toast.closeAll();
  };
  return (
    <Alert
      onTouchEnd={closeAllToasts}
      maxW="99%"
      variant="left-accent"
      status={status}
    >
      <HStack space="2" alignItems="center">
        <Alert.Icon size="md" />
        <Text color="black">{message}</Text>
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
