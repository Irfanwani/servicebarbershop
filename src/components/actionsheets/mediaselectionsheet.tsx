import { Actionsheet, HStack, Icon, IconButton } from "native-base";
import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MediaSheetProps } from "./types";

export const MediaSheet: FC<MediaSheetProps> = ({
  isOpen,
  onClose,
  getCameraImage,
  getImage,
  removeImage,
}) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <HStack space={20} p={3}>
          <IconButton
            variant="solid"
            icon={<Icon as={Ionicons} name="camera" size="2xl" />}
            colorScheme="teal"
            rounded="full"
            onPress={getCameraImage}
          />
          <IconButton
            variant="solid"
            icon={<Icon as={Ionicons} name="image-sharp" size="2xl" />}
            colorScheme="rose"
            rounded="full"
            onPress={getImage}
          />
          <IconButton
            variant="solid"
            icon={<Icon as={Ionicons} name="reload" size="2xl" />}
            colorScheme="red"
            rounded="full"
            onPress={removeImage}
          />
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
