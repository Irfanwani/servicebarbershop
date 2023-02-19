import { Actionsheet, HStack, Icon, IconButton } from "native-base";
import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SheetProps } from "./types";

export const Sheet: FC<SheetProps> = ({
  isOpen,
  onClose,
  firstIconCallback,
  secondIconCallback,
  thirdIconCallback,
  icon1,
  icon2,
  icon3,
}) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <HStack space={20} p={3}>
          <IconButton
            variant="solid"
            icon={<Icon as={Ionicons} name={icon1} size="2xl" />}
            colorScheme="teal"
            rounded="full"
            onPress={firstIconCallback}
          />
          <IconButton
            variant="solid"
            icon={<Icon as={Ionicons} name={icon2} size="2xl" />}
            colorScheme="rose"
            rounded="full"
            onPress={secondIconCallback}
          />
          <IconButton
            variant="solid"
            icon={<Icon as={Ionicons} name={icon3} size="2xl" />}
            colorScheme="red"
            rounded="full"
            onPress={thirdIconCallback}
          />
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
