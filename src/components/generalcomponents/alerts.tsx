import { Alert, HStack, Text } from "native-base";
import { FC } from "react";
import { CustomAlertProps } from "./types";

export const CustomAlert: FC<CustomAlertProps> = ({ status, message }) => {
  return (
    <Alert variant='left-accent' status={status}>
      <HStack space="2" alignItems="center">
        <Alert.Icon />
        <Text>{message}</Text>
      </HStack>
    </Alert>
  );
};
