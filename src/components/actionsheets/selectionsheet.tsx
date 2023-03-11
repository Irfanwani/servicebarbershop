import { Actionsheet, HStack } from "native-base";
import { FC } from "react";
import { SheetProps } from "./types";
import { RoundButton } from "../generalcomponents/roundbutton";

export const Sheet: FC<SheetProps> = ({
  isOpen,
  onClose,
  firstIconCallback,
  secondIconCallback,
  thirdIconCallback,
  icon1,
  icon2,
  icon3,
  loading,
}) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <HStack space={20} p={3}>
          <RoundButton
            icon={icon1}
            onPress={firstIconCallback}
            colorScheme="teal"
            isLoading={loading}
            size="2xl"
            buttonsize={16}
          />
          <RoundButton
            icon={icon2}
            onPress={secondIconCallback}
            colorScheme="rose"
            size="2xl"
            buttonsize={16}
          />
          <RoundButton
            icon={icon3}
            onPress={thirdIconCallback}
            colorScheme="blueGray"
            size="2xl"
            buttonsize={16}
          />
        </HStack>
      </Actionsheet.Content>
    </Actionsheet>
  );
};
