import { Icon, IconButton, useColorMode } from "native-base";
import { Ionicons } from "@expo/vector-icons";

export const themeToggler = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <IconButton
      variant="solid"
      rounded="full"
      colorScheme="rose"
      icon={
        <Icon
          as={Ionicons}
          name={colorMode == "dark" ? "md-sunny" : "moon"}
          onPress={toggleColorMode}
        />
      }
    />
  );
};
