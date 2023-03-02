import { Alert, HStack, Text, Toast } from "native-base";
import { FC } from "react";
import { CustomAlertProps } from "./types";

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
        <Text>{message}</Text>
      </HStack>
    </Alert>
  );
};

export const showToast = (status: string, message: string) => {
  Toast.show({
    render: () => <CustomAlert status={status} message={message} />,
  });
};
