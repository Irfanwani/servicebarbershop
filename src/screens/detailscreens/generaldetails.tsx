import {
  Avatar,
  Icon,
  IconButton,
  ScrollView,
  View,
  useDisclose,
  Actionsheet,
  HStack,
  Box,
  Text,
} from "native-base";
import { FC } from "react";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const GeneralDetails: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclose();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always"
      contentContainerStyle={styles.scroll}
    >
      <View alignSelf="center" paddingY="30">
        <Avatar size="2xl">
          <Icon as={Ionicons} name="person" size="2xl" />
        </Avatar>
        <IconButton
          variant="solid"
          icon={<Icon as={Ionicons} name="camera" size="2xl" />}
          style={styles.iconbutton}
          colorScheme="teal"
          onPress={onOpen}
        />
      </View>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <HStack space={20} p={3}>
            <IconButton
              variant="solid"
              icon={<Icon as={Ionicons} name="camera" size="2xl" />}
              colorScheme="teal"
              rounded="full"
            />
            <IconButton
              variant="solid"
              icon={<Icon as={Ionicons} name="image-sharp" size="2xl" />}
              colorScheme="rose"
              rounded="full"
            />
            <IconButton
              variant="solid"
              icon={<Icon as={Ionicons} name="reload" size="2xl" />}
              colorScheme="red"
              rounded="full"
            />
          </HStack>
        </Actionsheet.Content>
      </Actionsheet>
    </ScrollView>
  );
};
export default GeneralDetails;
