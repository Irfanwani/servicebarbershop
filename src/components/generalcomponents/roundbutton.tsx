import { Button, Icon } from "native-base";
import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LogoutProps } from "./types";

export const RoundButton: FC<LogoutProps> = ({ onPress, isLoading }) => (
  <Button
    isLoading={isLoading}
    onPress={onPress}
    colorScheme="rose"
    rounded="full"
    width="10"
    h="10"
    startIcon={<Icon as={Ionicons} name="exit-outline" size="md" />}
  />
);

// have an alertDialog to show for conirmation