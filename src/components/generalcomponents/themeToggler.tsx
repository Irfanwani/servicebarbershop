import { Icon, IconButton, useColorMode } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";

export const ThemeToggler: FC = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <IconButton
      variant="solid"
      rounded="full"
      colorScheme="rose"
      onPress={toggleColorMode}
      icon={
        <Icon as={Ionicons} name={colorMode == "dark" ? "md-sunny" : "moon"} />
      }
    />
  );
};
