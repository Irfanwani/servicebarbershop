import { Alert, HStack, Text, Toast } from "native-base";
import { FC } from "react";
import { CustomAlertProps } from "./types";

export const CustomAlert: FC<CustomAlertProps> = ({ status, message }) => {
  return (
    <Alert maxW="98%" variant="left-accent" status={status}>
      <HStack space="2" alignItems="center">
        <Alert.Icon size="md" />
        <Text>
          {message}
          {"\n"}
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
